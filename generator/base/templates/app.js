/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
<%_ if (configuration.features.status_page) { _%>
const expressStatusMonitor = require('express-status-monitor');
<%_ } _%>
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const apiController = require('./controllers/api');
<%_ if (configuration.features.contact_form) { _%>
const contactController = require('./controllers/contact');
<%_ } _%>
<%_ blueprint.schemas.forEach((schema) => { _%>
const <%= schema.camel_case %>Controller = require('./controllers/<%= schema.identifier %>')
<%_ }) _%>

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
<%_ if (configuration.features.status_page) { _%>
app.use(expressStatusMonitor());
<%_ } _%>
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user
    && req.path !== '/login'
    && req.path !== '/signup'
    && !req.path.match(/^\/auth/)
    && !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user
    && (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
<%_ if (configuration.features.contact_form) { _%>
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
<%_ } _%>
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

// // // // //
// Codotype blueprint routes

// Any requests to the app must pass through this 'use' function
// used to manipulate POST to support PUT and DELETE requests on CRUD generated with Codotpe
const methodOverride = require('method-override');
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

<%_ blueprint.schemas.forEach((schema) => { _%>
<%_ if (schema.identifier === 'user') { _%>
// <%= schema.label %> Routes + Pages
app.get('/<%= schema.identifier_plural %>/', <%= schema.camel_case %>Controller.list);
app.get('/<%= schema.identifier_plural %>/:id', <%= schema.camel_case %>Controller.show);

<%_ } else { _%>
// <%= schema.label %> Routes + Pages
app.get('/<%= schema.identifier_plural %>/', <%= schema.camel_case %>Controller.list);
app.get('/<%= schema.identifier_plural %>/new', <%= schema.camel_case %>Controller.new);
app.post('/<%= schema.identifier_plural %>/', <%= schema.camel_case %>Controller.create);
app.get('/<%= schema.identifier_plural %>/:id', <%= schema.camel_case %>Controller.show);
app.get('/<%= schema.identifier_plural %>/:id/edit', <%= schema.camel_case %>Controller.edit);
app.put('/<%= schema.identifier_plural %>/:id', <%= schema.camel_case %>Controller.update);
app.delete('/<%= schema.identifier_plural %>/:id', <%= schema.camel_case %>Controller.delete);

<%_ } _%>
<%_ }) _%>
// // // // //

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
<%_ if (configuration.api_examples.last_fm) { _%>
app.get('/api/lastfm', apiController.getLastfm);
<%_ } _%>
<%_ if (configuration.api_examples.new_york_times) { _%>
app.get('/api/nyt', apiController.getNewYorkTimes);
<%_ } _%>
<%_ if (configuration.api_examples.aviary) { _%>
app.get('/api/aviary', apiController.getAviary);
<%_ } _%>
<%_ if (configuration.api_examples.steam) { _%>
app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
<%_ } _%>
<%_ if (configuration.api_examples.stripe) { _%>
app.get('/api/stripe', apiController.getStripe);
app.post('/api/stripe', apiController.postStripe);
<%_ } _%>
<%_ if (configuration.api_examples.web_scraping) { _%>
app.get('/api/scraping', apiController.getScraping);
<%_ } _%>
<%_ if (configuration.api_examples.twilio) { _%>
app.get('/api/twilio', apiController.getTwilio);
app.post('/api/twilio', apiController.postTwilio);
<%_ } _%>
<%_ if (configuration.api_examples.clockwork) { _%>
app.get('/api/clockwork', apiController.getClockwork);
app.post('/api/clockwork', apiController.postClockwork);
<%_ } _%>
<%_ if (configuration.api_examples.foursquare) { _%>
app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
<%_ } _%>
<%_ if (configuration.api_examples.tumblr) { _%>
app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
<%_ } _%>
<%_ if (configuration.api_examples.facebook) { _%>
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
<%_ } _%>
<%_ if (configuration.api_examples.github) { _%>
app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
<%_ } _%>
<%_ if (configuration.api_examples.twitter) { _%>
app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
<%_ } _%>
<%_ if (configuration.api_examples.linkedin) { _%>
app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
<%_ } _%>
<%_ if (configuration.api_examples.instagram) { _%>
app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
<%_ } _%>
<%_ if (configuration.api_examples.paypal) { _%>
app.get('/api/paypal', apiController.getPayPal);
app.get('/api/paypal/success', apiController.getPayPalSuccess);
app.get('/api/paypal/cancel', apiController.getPayPalCancel);
<%_ } _%>
<%_ if (configuration.api_examples.lob) { _%>
app.get('/api/lob', apiController.getLob);
<%_ } _%>
<%_ if (configuration.features.file_upload) { _%>
app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
<%_ } _%>
<%_ if (configuration.api_examples.pinterest) { _%>
app.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
app.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);
<%_ } _%>
<%_ if (configuration.api_examples.google_maps) { _%>
app.get('/api/google-maps', apiController.getGoogleMaps);
<%_ } _%>
<%_ if (configuration.api_examples.chartjs) { _%>
app.get('/api/chart', apiController.getChart);
<%_ } _%>

/**
 * OAuth authentication routes. (Sign in)
 */

<%_ if (configuration.authorization.instagram) { _%>
app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>
<%_ if (configuration.authorization.snapchat) { _%>
app.get('/auth/snapchat', passport.authenticate('snapchat'));
app.get('/auth/snapchat/callback', passport.authenticate('snapchat', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>
<%_ if (configuration.authorization.facebook) { _%>
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>
<%_ if (configuration.authorization.github) { _%>
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>
<%_ if (configuration.authorization.google) { _%>
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>
<%_ if (configuration.authorization.twitter) { _%>
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>
<%_ if (configuration.authorization.linkedin) { _%>
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
<%_ } _%>

/**
 * OAuth authorization routes. (API examples)
 */
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/foursquare');
});
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/tumblr');
});
app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/api' }), (req, res) => {
  res.redirect(req.session.returnTo);
});
app.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
app.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/api/pinterest');
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;

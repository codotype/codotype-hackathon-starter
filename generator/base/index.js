module.exports = {
  name: 'HackathonStarterBase',
  compileInPlace: [
    'models/User.js',
    'config/passport.js',
    'views/layout.pug',
    'views/home.pug',
    'views/api/index.pug',
    'views/partials/header.pug',
    'views/account/login.pug',
    'controllers/api.js',
    'app.js'
  ],
  async write () {
    await this.copyDir({ src: '', dest: '' })
  }
}

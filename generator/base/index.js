module.exports = {
  name: 'HackathonStarterBase',
  compileInPlace: [
    'models/User.js',
    'config/passport.js',
    'views/layout.pug',
    'views/home.pug',
    'views/api/index.pug',
    'views/partials/header.pug',
    'views/partials/footer.pug',
    'views/account/login.pug',
    'controllers/api.js',
    '.env.example',
    'README.md',
    'package.json',
    'test/app.js',
    'app.js'
  ],
  async write ({ blueprint }) {
    await this.copyDir({ src: '', dest: '' })

    // FEATURE - should abstract into `this.findSchema('user')` method
    const userSchema = blueprint.schemas.find(s => s.identifier === 'user')

    await this.renderComponent({
      src: 'views/account/signup.pug',
      dest: 'views/account/signup.pug',
      data: { userSchema }
    })

    await this.renderComponent({
      src: 'views/account/profile.pug',
      dest: 'views/account/profile.pug',
      data: { userSchema }
    })
  }
}

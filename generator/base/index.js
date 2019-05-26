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
    'app.js'
  ],
  async write ({ blueprint }) {
    await this.copyDir({ src: '', dest: '' })
    await this.renderComponent({
      src: 'views/account/signup.pug',
      dest: 'views/account/signup.pug',
      data: { userSchema: blueprint.schemas.find(s => s.identifier === 'user') }
    })
  }
}

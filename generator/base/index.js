const Generator = require('@codotype/generator')

// // // //

module.exports = class ReactJsBase extends Generator {

  compileInPlace () {
    return [
      'models/User.js',
      'config/passport.js',
      'views/layout.pug',
      'views/home.pug',
      'views/partials/header.pug',
      'views/account/login.pug',
      'app.js'
    ]
  }

  async write () {
    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )
  }

}

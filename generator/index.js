module.exports = {
  name: 'HackathonStarter',
  async write () {
    await this.composeWith('./base') // Base must come first!
    await this.composeWith('./api_examples')
    await this.composeWith('./contact_form')
    await this.composeWith('./models')
    await this.composeWith('./views')
    await this.composeWith('./controllers')
  }
}

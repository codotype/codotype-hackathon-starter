module.exports = {
  name: 'HackathonStarter',
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./api_examples')
    await this.composeWith('./contact_form')
    await this.composeWith('./resource_module')
  }
}

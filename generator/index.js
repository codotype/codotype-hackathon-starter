const Generator = require('@codotype/generator')

module.exports = class extends Generator {
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./resource_module')
  }
};

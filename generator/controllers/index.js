
module.exports = {
  name: 'Controllers',
  async forEachSchema({ blueprint, schema }) {
    await this.renderComponent({
      src: schema.identifier === 'user' ? 'user.resource.controller.js' : 'resource.controller.js',
      dest: `controllers/${schema.identifier}.js`,
      data: { schema }
    });
  }
};

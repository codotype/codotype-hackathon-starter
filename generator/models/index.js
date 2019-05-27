
module.exports = {
  name: 'Models',
  async forEachSchema({ schema }) {
    await this.renderComponent({
      src: schema.identifier === 'user' ? 'user.resource.model.js' : 'resource.model.js',
      dest: `models/${schema.class_name}.js`,
      data: { schema }
    });
  }
};

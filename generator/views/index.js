
module.exports = {
  name: 'Views',
  async forEachSchema({ blueprint, schema }) {

    // .pug view templates
    // Ensures the presence of the directory
    await this.ensureDir('views/' + schema.identifier)

    // views/resource/confirmDestroy.pug
    await this.renderComponent({
      src: 'confirmDestroy.pug',
      dest: `views/${schema.identifier}/confirmDestroy.pug`,
      data: { schema }
    });

    // views/resource/list.pug
    await this.renderComponent({
      src: 'list.pug',
      dest: `views/${schema.identifier}/list.pug`,
      data: { schema }
    });

    // views/resource/show.pug
    await this.renderComponent({
      src: 'show.pug',
      dest: `views/${schema.identifier}/show.pug`,
      data: { schema }
    });

    // Only create new & edit pages for non-user models
    if (schema.identifier !== 'user') {
      // views/resource/new.pug
      await this.renderComponent({
        src: 'new.pug',
        dest: `views/${schema.identifier}/new.pug`,
        data: { schema }
      });

      // views/resource/edit.pug
      await this.renderComponent({
        src: 'edit.pug',
        dest: `views/${schema.identifier}/edit.pug`,
        data: { schema }
      });
    }

  }

};

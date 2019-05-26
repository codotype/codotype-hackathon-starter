
module.exports = {
  name: 'ResourceModules',
  async forEachSchema({ blueprint, schema }) {

    // Ensures the presence of the directory
    await this.ensureDir('views/' + schema.identifier)

    // Model
    await this.renderComponent({
      src: schema.identifier === 'user' ? 'user.resource.model.js' : 'resource.model.js',
      dest: 'models/' + schema.class_name + '.js',
      data: { schema }
    });

    // Controller
    await this.renderComponent({
      src: schema.identifier === 'user' ? 'user.resource.controller.js' : 'resource.controller.js',
      dest: 'controllers/' + schema.identifier + '.js',
      data: { schema }
    });


    // // // //
    // .pug view templates

    // views/resource/list.pug
    await this.renderComponent({
      src: 'views/list.pug',
      dest: 'views/' + schema.identifier + '/list.pug',
      data: { schema }
    });

    // views/resource/show.pug
    await this.renderComponent({
      src: 'views/show.pug',
      dest: 'views/' + schema.identifier + '/show.pug',
      data: { schema }
    });

    // Only create new & edit pages for non-user models
    if (schema.identifier !== 'user') {
      // views/resource/new.pug
      await this.renderComponent({
        src: 'views/new.pug',
        dest: 'views/' + schema.identifier + '/new.pug',
        data: { schema }
      });

      // views/resource/edit.pug
      await this.renderComponent({
        src: 'views/edit.pug',
        dest: 'views/' + schema.identifier + '/edit.pug',
        data: { schema }
      });
    }

  }

};


module.exports = {
  name: 'ResourceModules',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Pulls `generate_api_doc` from configuration.options
    // Used to conditionally generate APIDoc headers
    const { generate_api_doc } = configuration.documentation

    // Defines the schema-specific destination
    // let resourceDest = 'api/' + schema.identifier

    // Ensures the presence of the directory
    await this.ensureDir('views/' + schema.identifier)
    // await this.ensureDir(resourceDest)

    // server/api/resource/resource.model.js
    if (schema.identifier === 'user') {
      await this.renderComponent({
        src: 'user.resource.model.js',
        dest: 'models/' + schema.class_name + '.js',
        data: { schema }
      });
    } else {
      await this.renderComponent({
        src: 'resource.model.js',
        dest: 'models/' + schema.class_name + '.js',
        data: { schema }
      });
      // server/api/resource/resource.controller.js
      await this.renderComponent({
        src: 'resource.controller.js',
        dest: 'controllers/' + schema.identifier + '.js',
        data: { schema, generate_api_doc }
      });
    }


    // // // //
    // .pug view templates

    // views/resource/list.pug
    await this.renderComponent({
      src: 'views/list.pug',
      dest: 'views/' + schema.identifier + '/list.pug',
      data: { schema }
    });

    // views/resource/new.pug
    await this.renderComponent({
      src: 'views/new.pug',
      dest: 'views/' + schema.identifier + '/new.pug',
      data: { schema }
    });

    // views/resource/show.pug
    await this.renderComponent({
      src: 'views/show.pug',
      dest: 'views/' + schema.identifier + '/show.pug',
      data: { schema }
    });

    // views/resource/edit.pug
    await this.renderComponent({
      src: 'views/edit.pug',
      dest: 'views/' + schema.identifier + '/edit.pug',
      data: { schema }
    });

  }

};

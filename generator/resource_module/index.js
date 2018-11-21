
module.exports = {
  name: 'ResourceModules',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Pulls `generate_api_doc` from configuration.options
    // Used to conditionally generate APIDoc headers
    const { generate_api_doc } = configuration.options

    // Defines the schema-specific destination
    // let resourceDest = 'api/' + schema.identifier

    // Ensures the presence of the directory
    await this.ensureDir('views/' + schema.identifier)
    // await this.ensureDir(resourceDest)

    // server/api/resource/resource.model.js
    if (schema.identifier === 'user') {
      await this.copyTemplate(
        this.templatePath('user.resource.model.js'),
        this.destinationPath('models/' + schema.class_name + '.js'),
        { schema }
      );
    } else {
      await this.copyTemplate(
        this.templatePath('resource.model.js'),
        this.destinationPath('models/' + schema.class_name + '.js'),
        { schema }
      );
    }

    // server/api/resource/resource.controller.js
    await this.copyTemplate(
      this.templatePath('resource.controller.js'),
      this.destinationPath('controllers/' + schema.identifier + '.controller.js'),
      { schema, generate_api_doc }
    );

    // // // //
    // .pug view templates

    // views/resource/list.pug
    await this.copyTemplate(
      this.templatePath('views/list.pug'),
      this.destinationPath('views/' + schema.identifier + '/list.pug'),
      { schema }
    );

    // views/resource/new.pug
    await this.copyTemplate(
      this.templatePath('views/new.pug'),
      this.destinationPath('views/' + schema.identifier + '/new.pug'),
      { schema }
    );

    // views/resource/show.pug
    await this.copyTemplate(
      this.templatePath('views/show.pug'),
      this.destinationPath('views/' + schema.identifier + '/show.pug'),
      { schema }
    );

    // views/resource/edit.pug
    await this.copyTemplate(
      this.templatePath('views/edit.pug'),
      this.destinationPath('views/' + schema.identifier + '/edit.pug'),
      { schema }
    );

  }

};

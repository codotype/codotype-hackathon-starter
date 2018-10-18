const Generator = require('@codotype/generator')

// // // //

module.exports = class ReactJsResource extends Generator {
  async write ({ blueprint }) {
    blueprint.schemas.forEach(async (schema) => {
      const dest = 'src/' + schema.identifier + '/';
      await this.ensureDir(dest);

      // Edit page
      await this.copyTemplate(
        this.templatePath('edit-component.js'),
        this.destinationPath(dest + schema.class_name + 'Edit.js'),
        { schema }
      )

      // Form component
      await this.copyTemplate(
        this.templatePath('form-component.js'),
        this.destinationPath(dest + schema.class_name + 'Form.js'),
        { schema }
      )

      // list Page
      await this.copyTemplate(
        this.templatePath('list-component.js'),
        this.destinationPath(dest + schema.class_name + 'List.js'),
        { schema }
      )

      // list-item component
      await this.copyTemplate(
        this.templatePath('list-item-component.js'),
        this.destinationPath(dest + schema.class_name + 'ListItem.js'),
        { schema }
      )

      // new Page
      await this.copyTemplate(
        this.templatePath('new-component.js'),
        this.destinationPath(dest + schema.class_name + 'New.js'),
        { schema }
      )

      // show Page
      await this.copyTemplate(
        this.templatePath('show-component.js'),
        this.destinationPath(dest + schema.class_name + 'Show.js'),
        { schema }
      )

      // Detail Widget
      await this.copyTemplate(
        this.templatePath('detail-widget.js'),
        this.destinationPath(dest + schema.class_name + 'ShowWidget.js'),
        { schema }
      )

      // List Widget
      await this.copyTemplate(
        this.templatePath('list-widget.js'),
        this.destinationPath(dest + schema.class_name + 'ListWidget.js'),
        { schema }
      )

      // Router
      await this.copyTemplate(
        this.templatePath('routes.js'),
        this.destinationPath(dest + 'routes.js'),
        { schema }
      )
    })
  }
}

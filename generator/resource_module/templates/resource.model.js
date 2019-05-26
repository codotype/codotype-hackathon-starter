const mongoose = require('mongoose')

// // // //

const <%= schema.identifier %>_attributes = {
  <%- helpers.indent(include('./partials/resource-attributes.js'), 2) -%>
}

<%- include('./partials/resource-collection-options.js') %>

const <%= schema.camel_case %>Schema = new mongoose.Schema(<%= schema.identifier %>_attributes, collectionOptions);

// // // //

<%- include('./partials/resource-relation-methods.js') %>

// // // //

// <%_ /* MONGOOSE TOJSON SETS */ _%>
// <%_ if (schema.relations.map(r => r.type).includes('BELONGS_TO')) { _%>
// <%= schema.class_name %>.set('toJSON', { getters: true, virtuals: true });
// <%_ } _%>

module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.camel_case %>Schema)

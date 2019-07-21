const mongoose = require('mongoose')

// // // //

const <%= schema.identifier %>_attributes = {
  <%- helpers.indent(include('./partials/resource-attributes.js'), 2) -%>

}

<%_ /* */ _%>
<%_ /* */ _%>
<%- include('./partials/resource-collection-options.js') %>

const <%= schema.camel_case %>Schema = new mongoose.Schema(<%= schema.identifier %>_attributes, collectionOptions);
<%_ /* */ _%>
<%_ /* */ _%>
<%- include('./partials/resource-relation-methods.js') -%>
<%_ /* */ _%>
<%_ /* */ _%>
<%_ /* */ _%>
module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.camel_case %>Schema)

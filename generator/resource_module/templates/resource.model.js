const mongoose = require('mongoose')

// // // //

const <%= schema.class_name %> = new mongoose.Schema({
  <%_ schema.attributes.forEach((attr) => { _%>
  <%_ if (attr.datatype === 'BOOL') { _%>
  <%= attr.identifier %>: {
    type: Boolean
  },
  <%_ } else if (attr.datatype === 'NUMBER') { _%>
  <%= attr.identifier %>: {
    type: Number,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } else if (attr.datatype === 'DATETIME') { _%>
  <%= attr.identifier %>: {
    type: Date,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } else if (attr.datatype === 'JSON') { _%>
  <%= attr.identifier %>: {
    type: mongoose.Schema.Types.Mixed,
    required: <%= attr.required %>,
    default: {}
  },
  <%_ } else if (attr.datatype === 'STRING_ARRAY'){ _%>
  <%= attr.identifier %>: {
    type: [String],
    required: <%= attr.required %>,
    unique: <%= attr.unique %>,
    default: []
  },
  <%_ } else { _%>
  <%= attr.identifier %>: {
    type: String,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } _%>
  <%_ }) _%>
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
  <%= rel.alias.identifier + '_id' %>: {
    type: mongoose.Schema.Types.ObjectId,
    ref: '<%= rel.schema.class_name %>'
  },
  <%_ } else if (rel.type === 'HAS_MANY') { _%>
  <%= rel.alias.identifier + '_ids' %>: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: '<%= rel.schema.class_name %>'
  }],
  <%_ } _%>
  <%_ }) _%>
  },
  // Collection options
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn'
  },
  versionKey: false
});

// // // //

<%_ /* MONGOOSE VIRTUALS */ _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
// Specifying a virtual with a `ref` property is how you enable virtual population
<%= schema.class_name %>.virtual('<%= rel.alias.identifier %>', {
  ref: '<%= rel.schema.class_name %>',
  localField: '<%= rel.alias.identifier + "_id" %>',
  foreignField: '_id',
  justOne: true // Only return one <%= rel.schema.class_name %>
});

<%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>

// Specifying a virtual with a `ref` property is how you enable virtual population
<%= schema.class_name %>.virtual('<%= rel.alias.identifier_plural %>', {
  ref: '<%= rel.schema.class_name %>',
  localField: '_id',
  foreignField: '<%= schema.identifier + "_id" %>' // TODO - this won't work with alias, needs reverse relation
  // justOne: true // Only return one <%= rel.schema.class_name %>
});
<%_ } _%>
<%_ }) _%>

<%_ /* MONGOOSE METHODS */ _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
// Same as above just as a method
<%= schema.class_name %>.methods.get<%= rel.alias.class_name %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').findById(this.<%= rel.alias.identifier + '_id' %>);
}

<%_ /* TODO - HAS_MANY doesn't work like this */ _%>
<%_ } else if (rel.type === 'HAS_MANY') { _%>
<%= schema.class_name %>.methods.get<%= rel.alias.class_name_plural %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').find({ _id: this.<%= rel.alias.identifier + '_ids' %> });
}
<%_ } _%>
<%_ }) _%>

<%_ /* MONGOOSE TOJSON SETS */ _%>
<%_ if (schema.relations.map(r => r.type).includes('BELONGS_TO')) { _%>
<%= schema.class_name %>.set('toJSON', { getters: true, virtuals: true });
<%_ } _%>

// // // //

module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.class_name %>)

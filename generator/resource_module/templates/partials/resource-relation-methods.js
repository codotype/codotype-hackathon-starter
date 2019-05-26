<%_ /* MONGOOSE VIRTUALS */ _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
// Specifying a virtual with a `ref` property is how you enable virtual population
<%= schema.camel_case %>Schema.virtual('<%= rel.alias.identifier %>', {
  ref: '<%= rel.schema.class_name %>',
  localField: '<%= rel.alias.identifier + "_id" %>',
  foreignField: '_id',
  justOne: true // Only return one <%= rel.schema.class_name %>
});

<%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>

// Specifying a virtual with a `ref` property is how you enable virtual population
<%= schema.camel_case %>Schema.virtual('<%= rel.alias.identifier_plural %>', {
  ref: '<%= rel.schema.class_name %>',
  localField: '_id',
  foreignField: '<%= schema.identifier + "_id" %>' // TODO - this won't work with alias, needs reverse relation
  // justOne: true // Only return one <%= rel.schema.class_name %>
});
<%_ } _%>
<%_ }) _%>

<%_ /* MONGOOSE METHODS */ _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
// Same as above just as a method
<%= schema.camel_case %>Schema.methods.get<%= rel.alias.class_name %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').findById(this.<%= rel.alias.identifier + '_id' %>);
}

<%_ /* TODO - HAS_MANY doesn't work like this */ _%>
<%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
<%= schema.camel_case %>Schema.methods.get<%= rel.alias.class_name_plural %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').find({ _id: this.<%= rel.alias.identifier + '_ids' %> });
}
<%_ } _%>
<%_ }) _%>

<%_ /* MONGOOSE TOJSON SETS */ _%>
<%_ if (schema.relations.map(r => r.type).includes(RELATION_TYPE_BELONGS_TO)) { _%>
<%= schema.camel_case %>Schema.set('toJSON', { getters: true, virtuals: true });
<%_ } _%>
<%_ schema.attributes.forEach((attr) => { _%>
<%_ if (attr.datatype === DATATYPE_BOOLEAN) { _%>
<%= attr.identifier %>: {
  type: Boolean
},
<%_ } else if ([DATATYPE_INTEGER, DATATYPE_FLOAT].includes(attr.datatype)) { _%>
<%= attr.identifier %>: {
  type: Number,
  required: <%= attr.required %>,
  unique: <%= attr.unique %>
},
<%_ } else if ([DATATYPE_DATE, DATATYPE_TIME, DATATYPE_DATETIME].includes(attr.datatype)) { _%>
<%= attr.identifier %>: {
  type: Date,
  required: <%= attr.required %>,
  unique: <%= attr.unique %>
},
<%_ } else if (attr.datatype === DATATYPE_JSON) { _%>
<%= attr.identifier %>: {
  type: mongoose.Schema.Types.Mixed,
  required: <%= attr.required %>,
  default: {}
},
<%_ } else if (attr.datatype === DATATYPE_STRING_ARRAY){ _%>
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
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
<%= rel.alias.identifier + '_id' %>: {
  type: mongoose.Schema.Types.ObjectId,
  ref: '<%= rel.schema.class_name %>'
},
<%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
<%= rel.alias.identifier + '_ids' %>: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: '<%= rel.schema.class_name %>'
}],
<%_ } _%>
<%_ }) _%>
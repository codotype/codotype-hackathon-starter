const boom = require('boom')
const <%= schema.class_name %>Model = require('../models/<%= schema.class_name %>')
<%_ let relationImports = [] _%>
<%_ schema.relations.forEach((relation) => { _%>
<%_ if (relation.schema.class_name !== schema.class_name && !relationImports.includes(relation.schema.class_name)) { _%>
<%_ relationImports.push(relation.schema.class_name) _%>
const <%= relation.schema.class_name %>Model = require('../models/<%= relation.schema.class_name %>')
<%_ } _%>
<%_ }) _%>
<%_ schema.reverse_relations.forEach((relation) => { _%>
<%_ if (relation.schema.class_name !== schema.class_name && !relationImports.includes(relation.schema.class_name)) { _%>
<%_ relationImports.push(relation.schema.class_name) _%>
const <%= relation.schema.class_name %>Model = require('../models/<%= relation.schema.class_name %>')
<%_ } _%>
<%_ }) _%>

// // // //

<%- helpers.indent(include('./partials/list-action.js'), 0) %>

// GET /<%= schema.identifier_plural %>/new New
module.exports.new = async (req, res, next) => {
    <%_ let queriedSchemasNew = [] _%>
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (!queriedSchemasNew.includes(rel.schema.camel_case_plural)) { _%>
    const <%= rel.schema.camel_case_plural %> = await <%= rel.schema.class_name %>Model.find({})
    <%_ queriedSchemasNew.push(rel.schema.camel_case_plural) _%>
    <%_ } _%>
    <%_ }) _%>

    res.render('<%= schema.identifier %>/new', {
      <%_ let returnedSchemasNew = [] _%>
      <%_ schema.relations.forEach((rel) => { _%>
      <%_ if (!returnedSchemasNew.includes(rel.schema.camel_case_plural)) { _%>
      <%= rel.schema.camel_case_plural %>: <%= rel.schema.camel_case_plural %>,
      <%_ returnedSchemasNew.push(rel.schema.camel_case_plural) _%>
      <%_ } _%>
      <%_ }) _%>
      title: 'New <%= schema.label %>',
    });
};

// POST /<%= schema.identifier_plural %>/:id Create
module.exports.create = (req, res, next) => {
    <%_ if (schema.identifier === 'user') { _%>
    return User.create(req.body)
    <%_ } else { _%>
    return new <%= schema.class_name %>Model(req.body).save()
    <%_ } _%>
    .then((response) => {
        res.redirect('/<%= schema.identifier_plural %>');
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /<%= schema.identifier_plural %>/:id Show
module.exports.show = (req, res, next) => {
    return <%= schema.class_name %>Model.findById(req.params.id)
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    // .populate({ path: '<%= rel.alias.identifier_plural %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((response) => {
        res.render('<%= schema.identifier %>/show', {
          title: '<%= schema.label %>',
          model: response
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /<%= schema.identifier_plural %>/:id/edit Edit
module.exports.edit = async (req, res, next) => {
    const model = await <%= schema.class_name %>Model.findById(req.params.id)

    <%_ let queriedSchemasEdit = [] _%>
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (!queriedSchemasEdit.includes(rel.schema.camel_case_plural)) { _%>
    const <%= rel.schema.camel_case_plural %> = await <%= rel.schema.class_name %>Model.find({})
    <%_ queriedSchemasEdit.push(rel.schema.camel_case_plural) _%>
    <%_ } _%>
    <%_ }) _%>

    res.render('<%= schema.identifier %>/edit', {
      <%_ let returnedSchemasEdit = [] _%>
      <%_ schema.relations.forEach((rel) => { _%>
      <%_ if (!returnedSchemasEdit.includes(rel.schema.camel_case_plural)) { _%>
      <%= rel.schema.camel_case_plural %>: <%= rel.schema.camel_case_plural %>,
      <%_ returnedSchemasEdit.push(rel.schema.camel_case_plural) _%>
      <%_ } _%>
      <%_ }) _%>
      model: model,
      title: 'Edit <%= schema.label %>',
    });
};

// PUT /<%= schema.identifier_plural %>/:id Update
module.exports.update = (req, res, next) => {
    return <%= schema.class_name %>Model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res.redirect('/<%= schema.identifier_plural %>/' + response._id)
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// DELETE /<%= schema.identifier_plural %>/:id Destroy
module.exports.delete = (req, res, next) => {
    return <%= schema.class_name %>Model.remove({ _id: req.params.id })
    .then((response) => {
        return res.redirect('/<%= schema.identifier_plural %>')
    })
    .catch( err => next(boom.badImplementation(err)) );
};

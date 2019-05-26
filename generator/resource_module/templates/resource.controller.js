const boom = require('boom')
const <%= schema.class_name %> = require('../models/<%= schema.class_name %>')
<%_ let relationImports = [] _%>
<%_ schema.relations.forEach((relation) => { _%>
<%_ if (relation.schema.class_name !== schema.class_name && !relationImports.includes(relation.schema.class_name)) { _%>
<%_ relationImports.push(relation.schema.class_name) _%>
const <%= relation.schema.class_name %> = require('../models/<%= relation.schema.class_name %>')
<%_ } _%>
<%_ }) _%>

// // // //

<%_ if (schema.identifier === 'user') { _%>
// GET /<%= schema.identifier_plural %> Profile
exports.profile = (req, res) => {
    return <%= schema.class_name %>.findOne({ username: req.user.username }, '-password -__v').exec()
    .then( (user) => { res.json(user) })
}
<%_ } _%>

<%- helpers.indent(include('./partials/list-action.js'), 0) %>

// GET /<%= schema.identifier_plural %>/new New
module.exports.new = (req, res, next) => {
    res.render('<%= schema.identifier %>/new', {
      title: 'New <%= schema.label %>'
    });
};

// POST /<%= schema.identifier_plural %>/:id Create
module.exports.create = (req, res, next) => {
    <%_ if (schema.identifier === 'user') { _%>
    return User.create(req.body)
    <%_ } else { _%>
    return new <%= schema.class_name %>(req.body).save()
    <%_ } _%>
    .then((response) => {
        res.redirect('/<%= schema.identifier_plural %>');
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /<%= schema.identifier_plural %>/:id Show
module.exports.show = (req, res, next) => {
    return <%= schema.class_name %>.findById(req.params.id)
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    // .populate({ path: '<%= rel.alias.identifier_plural %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((response) => {
        res.render('<%= schema.identifier %>/show', {
          title: '<%= schema.label %>'
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};

<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
// GET /<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier %> show<%= rel.alias.class_name %>
module.exports.show<%= rel.alias.class_name %> = (req, res, next) => {
    return <%= schema.class_name %>.findById(req.params.id)
    .then((<%= schema.identifier %>) => {

        return <%= rel.schema.class_name %>.findById(<%= schema.identifier %>.<%= rel.alias.identifier + '_id' %>)
        <%_ let relatedSchema = blueprint.schemas.find(s => s.id === rel.related_schema_id) _%>
        <%_ relatedSchema.relations.forEach((rel) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
        .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
        <%_ } _%>
        <%_ }) _%>
        .then((<%= rel.schema.identifier %>) => {
            return res
            .status(200)
            .send(<%= rel.schema.identifier %>)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};

<% } else if (rel.type === RELATION_TYPE_HAS_MANY) { %>
// GET /<%= schema.identifier_plural %>/:id/<%= rel.schema.identifier_plural %> show<%= rel.schema.class_name_plural %>
module.exports.show<%= rel.alias.class_name_plural %> = (req, res, next) => {

    return <%= schema.class_name %>.findById(req.params.id)
    .then((response) => {
        return <%= rel.schema.class_name %>
        .find({ _id: response.<%= rel.alias.identifier %>_ids })
        <%_ let relatedSchema = blueprint.schemas.find(s => rel.related_schema_id) _%>
        <%_ relatedSchema.relations.forEach((rel) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
        .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
        <%_ } _%>
        <%_ }) _%>
        .then((<%= rel.schema.identifier_plural %>) => {
            return res
            .status(200)
            .send(<%= rel.schema.identifier_plural %>)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );
    })
    .catch( err => next(boom.badImplementation(err)) );

};

<%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
// GET /<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier_plural %> show<%= rel.alias.class_name_plural %>
module.exports.show<%= rel.alias.class_name_plural %> = (req, res, next) => {
    return <%= rel.schema.class_name %>
    .find({ <%= rel.reverse_alias.identifier %>_id: req.params.id })
    <%_ let relatedSchema = blueprint.schemas.find(s => s._id === rel.related_schema_id) _%>
    <%_ relatedSchema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((<%= rel.schema.identifier_plural %>) => {
        return res
        .status(200)
        .send(<%= rel.schema.identifier_plural %>)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
<%_ } _%>
<%_ }) _%>

// GET /<%= schema.identifier_plural %>/:id/edit Edit
module.exports.edit = (req, res, next) => {
    return <%= schema.class_name %>.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        res.render('<%= schema.identifier %>/edit', {
          title: 'Edit <%= schema.label %>'
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// PUT /<%= schema.identifier_plural %>/:id Update
module.exports.update = (req, res, next) => {
    return <%= schema.class_name %>.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// DELETE /<%= schema.identifier_plural %>/:id Destroy
module.exports.delete = (req, res, next) => {
    return <%= schema.class_name %>.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

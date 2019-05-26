// GET /<%= schema.identifier_plural %>/:id Index
module.exports.list = (req, res, next) => {
    return <%= schema.class_name %>
    .find({})
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((response) => {
        res.render('<%= schema.identifier %>/list', {
          title: '<%= schema.label_plural %>',
          collection: response
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /<%= schema.identifier_plural %>/:id Index
module.exports.list = (req, res, next) => {
    return <%= schema.class_name %>Model
    .find({})
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .lean()
    .exec()
    .then((response) => {
        console.log(response)
        res.render('<%= schema.identifier %>/list', {
          title: '<%= schema.label_plural %>',
          collection: response
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};

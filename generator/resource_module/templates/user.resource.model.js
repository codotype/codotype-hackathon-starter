const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

// // // //

// Password encryption helper function
function encryptPassword (password) {
    return crypto.createHmac('sha1', process.env.PASSWORD_ENCRYPTION_SECRET)
    .update(password)
    .digest('base64')
}

const collection_options = {
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedOn'
  },
  versionKey: false
}

const userAttributes = {
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
      // TODO - email validation
  },
  password: {
      type: String,
      required: true
  },
  password_reset_token: {
      type: String
  },
  admin: {
      type: Boolean,
      default: false
  },
  <%_ schema.attributes.forEach((attr) => { _%>
  <%_ if (attr.datatype.identifier === 'email') { return } _%>
  <%_ if (attr.datatype.identifier === 'username') { return } _%>
  <%_ if (attr.datatype === 'BOOL') { _%>
  <%_ return _%>
  <%_ } else if (attr.datatype === 'BOOL') { _%>
  <%= attr.identifier %>: {
    type: Boolean
  },
  <%_ } else if (attr.datatype === 'NUMBER') { _%>
  <%= attr.identifier %>: {
    type: Number,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } else if (attr.datatype === 'STRING_ARRAY') { _%>
  <%= attr.identifier %>: [{
    type: String,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  }],
  <%_ } else { _%>
  <%= attr.identifier %>: {
    type: String,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } _%>
  <%_ }) _%>

  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'BELONGS_TO') { _%>
  <%= rel.alias.identifier %>: {
    type: Schema.Types.ObjectId,
    ref: '<%= rel.schema.class_name %>'
  },
  <%_ } else if (rel.type === 'HAS_MANY') { _%>
  <%= rel.alias.identifier %>_ids: [{
    type: Schema.Types.ObjectId,
    ref: '<%= rel.schema.class_name %>'
  }],
  <%_ } _%>
  <%_ }) _%>
}

// // // //

const <%= schema.class_name %> = new Schema(userAttributes, collection_options);

// // // //

// Create new User document
// TODO - add email
User.statics.create = function ({ name, email, username, password }) {

    // Instantiates new User model
    const user = new this({
        name,
        email,
        username,
        password: encryptPassword(password)
    })

    // Return User.save() Promise
    return user.save()
}

// findOneByUsername
// Find one User by username
User.statics.findOneByUsername = function (username) {
    // Executes MongoDb query
    return this.findOne({ username }).exec()
}

// verify
// Verifies the password parameter of POST /auth/login requests
User.methods.verify = function (password) {
    // Verifies saved password against a request's password
    return this.password === encryptPassword(password)
}

// assignAdmin
// Assigns admin priviledges to a user
User.methods.assignAdmin = function () {
    // Assigns true to `admin` attribute
    this.admin = true

    // Returns `save` Promise
    return this.save()
}

<%_ schema.relations.forEach((rel) => { _%>
<%_ if (rel.type === 'BELONGS_TO') { _%>

<%= schema.class_name %>.methods.get<%= rel.alias.class_name %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').findById(this.<%= rel.alias.identifier + '_id' %>);
}

<%_ } else if (rel.type === 'HAS_MANY') { _%>

<%= schema.class_name %>.methods.get<%= rel.alias.class_name_plural %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').find({ <%= schema.identifier %>_id: this._id });
}

<%_ } else if (rel.type === 'HAS_ONE') { _%>

<%= schema.class_name %>.methods.get<%= rel.alias.class_name %> = function () {
  return mongoose.model('<%= rel.schema.class_name %>').findById(this.<%= rel.identifier + '_id' %> });
}

<%_ } _%>
<%_ }) _%>

// TODO - absract schema.class_name
module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.class_name %>)

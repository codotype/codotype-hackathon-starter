const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  <%- helpers.indent(include('./partials/resource-attributes.js'), 2) -%>
password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  <%_ if (configuration.authorization.facebook) { _%>
  snapchat: String,
  <%_ } _%>
  <%_ if (configuration.authorization.facebook) { _%>
  facebook: String,
  <%_ } _%>
  <%_ if (configuration.authorization.twitter) { _%>
  twitter: String,
  <%_ } _%>
  <%_ if (configuration.authorization.google) { _%>
  google: String,
  <%_ } _%>
  <%_ if (configuration.authorization.github) { _%>
  github: String,
  <%_ } _%>
  <%_ if (configuration.authorization.instagram) { _%>
  instagram: String,
  <%_ } _%>
  <%_ if (configuration.authorization.linkedin) { _%>
  linkedin: String,
  <%_ } _%>
  <%_ if (configuration.authorization.steam) { _%>
  steam: String,
  <%_ } _%>
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// // // //

<%- include('./partials/resource-relation-methods.js') %>

// // // //

const User = mongoose.model('User', userSchema);

module.exports = User;

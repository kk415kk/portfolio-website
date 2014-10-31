/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      unique: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj._csrf;
      return obj;
    }
  },
  beforeCreate: function(values, next) {
    var bcrypt = require('bcrypt');
    // Encrypt password
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(values.password, salt, function(err, encrypted) {
        if (err) return next(err);
        values.password = encrypted;
        values.confirmation = encrypted;
        return next();
      });
    });
  }
};


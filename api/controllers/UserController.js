/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    User.find(function(err, users) {
      if (users.length > 0) {
        sails.log('nooo');
        res.json({ success: false });
      } else {
        User.create(req.params.all(), function userCreated(err, user) {
          sails.log(err);
          sails.log(user);
          if (err || !user) {
            res.json({ success: false });
          } else {
            AuthService.startSession(req, user);
            res.json({ success: true });
          }
        });
      }
    });
  },
  login: function(req, res) {
    if (req.session.authenticated && req.session.user) {
      res.redirect('/user/manage');
    } else {
      res.view({ title: 'Login' });
    }
  },
  logout: function(req, res) {
    if (req.session && req.session.user) {
      AuthService.endSession(req, req.session.user);
    }
    res.redirect('/');
  },
  manage: function(req, res) {
    res.view({ title: 'Manage' });
  },
  validate: function(req, res) {
    var bcrypt = require('bcrypt');
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }, function(err, user) {
      if (user) {
        bcrypt.compare(password, user.password, function(err, match) {
          if (err || !match) {
            res.json({ success: false });
          } else {
            AuthService.startSession(req, user);
            res.json({ success: true });
          }
        });
      } else {
        res.json({ success: false });
      }
    }); 
  }
};


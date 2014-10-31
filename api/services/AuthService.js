module.exports = {
  startSession: function(req, user) {
    var expiresAt = new Date(new Date().getTime() + 3600000);
    req.session.cookie.expires = expiresAt;
    req.session.authenticated = true;
    req.session.user = user;
  },
  endSession: function(req, user) {
    req.session.authenticated = false;
    req.session.user = null; 
  }
}
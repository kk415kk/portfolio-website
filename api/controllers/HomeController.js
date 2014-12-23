/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
    res.view({ title: 'Home' });
  },

  contact: function(req, res) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport(sails.config.transporter);
    var mailOptions = sails.config.mailOptions;

    var params = req.params.all();
    var firstName = params['firstName'],
        lastName = params['lastName'],
        type = params['type'],
        emailAddress = params['emailAddress'],
        emailMessage = params['emailMessage']

    var HTMLtext = ''
    HTMLtext += '<b>From: </b>' + firstName + ' ' + lastName;
    HTMLtext += '<br><b>Type: </b>' + type;
    HTMLtext += '<br><b>Email: </b>' + emailAddress;
    HTMLtext += '<br><b>Message: </b><br>';
    HTMLtext += emailMessage;

    mailOptions['subject'] = 'Message from kevkao.com'
    mailOptions['text'] = HTMLtext
    mailOptions['html'] = HTMLtext

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        sails.log(error)
        return res.json({ success: false });
      } else {
        sails.log('Message sent: ' +  info.response);
        return res.json({ success: true });
      }
    });
  }
};


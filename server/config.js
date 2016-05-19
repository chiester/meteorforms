Meteor.startup(function() {
  if (Meteor.settings && Meteor.settings.reCAPTCHA_private_key) {
    reCAPTCHA.config({
      privatekey: Meteor.settings.reCAPTCHA_private_key
    });
  } else {
    throw new Meteor.Error(500, "Unable to load reCPATCHA key.");
  }
});

//db security
// Any client may insert without restriction (these are protected from bots and spammers with ReCPATCHA)
CitizenForms.permit(['insert']).apply();

Meteor.publish("CitizenForms", function() {
  return CitizenForms.find();
});


Meteor.methods({
  insertForm: function(doc) {
    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, doc.gRecaptchaResponse);
    if (verifyCaptchaResponse.data.success === false) {
      return verifyCaptchaResponse.data;
    }
    check(doc, CitizenForms.simpleSchema());

    CitizenForms.insert(doc, function(error, result) {
      if (error) {
        return "Error adding new application data. Please try again.";
      }

      SSR.compileTemplate('notify', Assets.getText('emailTemplates/notify.html'));
      process.env.MAIL_URL = Meteor.settings.mailgun.MAIL_URL;

      Template.notify.helpers({
        myform: function() {
          return CitizenForms.findOne(result);
        }
      });

      var html = SSR.render("notify");

      Email.send({
        'from': Meteor.settings.from,
        'to': doc.notifyEmail,
        'subject': "Form submission from " + doc.contact.firstName + ' ' + doc.contact.lastName,
        'html': html
      });

      //remove the email address
      CitizenForms.update({
        '_id': result
      }, {
        $set: {
          notifyEmail: ''
        }
      });


    });
  },

  clearDB: function() {
    CitizenForms.remove({});
    return 'success';
  }
});

//enable CORS for serving files to bl.ocks.org, etc.
// Listen to incoming HTTP requests, can only be used on the server
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

Meteor.startup(function() {
  if (Meteor.settings && Meteor.settings.reCAPTCHA_private_key) {
    reCAPTCHA.config({
      privatekey: Meteor.settings.reCAPTCHA_private_key
    });
  } else {
    throw new Meteor.Error(500, "Unable to load reCPATCHA key.");
  }
});


Meteor.methods({
  insertForm: function(doc) {
    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, doc.gRecaptchaResponse);
    if (verifyCaptchaResponse.data.success === false) {
      return verifyCaptchaResponse.data;
    }
    //check(doc, CitizenForms.simpleSchema());
    CitizenForms.insert(doc, function(error, result) {
      if (error) {
        return "Error adding new application data. Please try again.";
      }
    });
  }
});

Meteor.startup(function() {
  reCAPTCHA.config({
    privatekey: '6LcEthETAAAAACtVosl03DMgK-d4rOnJpYEBDy82'
  });
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

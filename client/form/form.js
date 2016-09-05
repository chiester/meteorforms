Meteor.startup(function() {
  reCAPTCHA.config({
    theme: 'light', // 'light' default or 'dark'
    sitekey: '6LcBJxgTAAAAAH1hXSHtnigbCzH6ToXIzUAwZjpM'
  });
});

Meteor.subscribe("CitizenForms");

Template.formProposal.events({
  'change [name=notifyMe]': function(event, template) {
    Session.set('notifyFlag', event.target.value);
  }
});

Template.header.helpers({
  isNotHome: function() {
    return Router.current().route.getName() !== 'home' ? true : false;
  }
});

Template.formProposal.helpers({
  notifyMe: function() {
    console.log(Session.get('notifyFlag'))
    return Session.get('notifyFlag') === 'yes' ? true : false;
  }
});


// initialize switchery toggle buttons (mobile-friendly)
Template.formProposal.rendered = function() {
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html);
  });
  Session.setDefault('notifyFlag', "no");
  Session.setDefault('visited', false);
  if (!Session.get('visited')) {
    Modal.show('preForm');
    Session.set('visited', true);
  }
};

//manages what happens after our form is successfully submitted
AutoForm.hooks({
  insertCitizenForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      var that = this;
      insertDoc.gRecaptchaResponse = $('#g-recaptcha-response').val();

      Meteor.call('insertForm', insertDoc, function(error, result) {
        // reset the captcha
        grecaptcha.reset();

        if (error) {
          console.log("ERROR");
          console.log(error);
          var errorResult = {};
          errorResult.errorMessage = "Apologies! There was an error. Please try again.";
          Modal.show('generalError', function() {
            return errorResult;
          });
          return false;
        }

        if (result && result.success === false) {
          //CAPTCHA failed
          Modal.show('rcaError');
        } else {
          //CAPTCHA success and form submission succeeded
          that.resetForm();
          Modal.show('confirm');
        }
      });
      return false;
    },
    endSubmit: function(formId, template) {
      template.$('[data-schema-key],button').removeAttr("disabled");
    },
    beginSubmit: function(formId, template) {}
  }
});

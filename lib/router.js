Router.configure({
  trackPageView: true,
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  layoutTemplate: 'formLayout',
  controller: 'formController',
  onAfterAction: function() {
    if (Meteor.isClient) {
      Session.set('title', 'Form Demo');
      document.title = Session.get('title');
    }
  },
  yieldTemplates: {
    'header': {
      to: 'header'
    },
    'footer': {
      to: 'footer'
    }
  }
});

formController = RouteController.extend({
  layoutTemplate: 'formLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  yieldTemplates: {
    'header': {
      to: 'header'
    },
    'footer': {
      to: 'footer'
    }
  }
});

Router.route('formProposal', {
  path: '/',
  controller: 'formController',
  onAfterAction: function() {
    document.title = Session.get('title') + ' | Sample Form';
  }
});

Router.route('results', {
  path: '/results',
  controller: 'formController',
  onAfterAction: function() {
    document.title = Session.get('title') + ' | Sample Form Result List';
  }
});

Router.route('resultsRead', {
  path: 'results/:id',
  controller: 'formController',
  data: function() {
    return CitizenForms.findOne(this.params.id);
  },
  onAfterAction: function() {
    var submitter = CitizenForms.findOne(this.params.id);
    document.title = Session.get('title') + ' | Form from ' + submitter.contact.firstName + ' ' + submitter.contact.lastName;
  }
});

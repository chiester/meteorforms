Router.configure({
  trackPageView: true,
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  layoutTemplate: 'formLayout',
  controller: 'formController',
  onAfterAction: function() {
    if (Meteor.isClient) {
      Session.set('title', 'Citizen Form');
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
    document.title = Session.get('title') + ' | Sample Form Results';
  }
});

Router.route('formRead', {
  path: 'results/:id',
  controller: 'formController',
  data: function() {
    return CitizenForms.findOne(this.params.id);
  },
  onAfterAction: function() {
    document.title = Session.get('title') + ' | Sample Form Results';
  }
});

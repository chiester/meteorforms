Router.configure({
  trackPageView: true,
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  layoutTemplate: 'formLayout',
  controller: 'formController',
  onAfterAction: function() {
    if (Meteor.isClient) {
      Session.set('title', 'Chris Hiester');
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
  data: function() {
    var isHome = false;
    return isHome;
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


Router.route('home', {
  path: '/',
  controller: 'formController',
  onAfterAction: function() {
    document.title = Session.get('title');
  },
  data: function() {
    var isHome = true;
    return isHome;
  }
});

Router.route('formProposal', {
  path: '/formDemo',
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

Router.route('resultsAdmin', {
  path: '/admin/:admin',
  data: function() {
    // because access to meteor's mongo via command line has been flaky
    // I have this secret backdoor so I can delete records from the db
    return this.params.admin === Meteor.settings.adminKey ? true : false;
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

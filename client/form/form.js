Meteor.startup(function() {
  reCAPTCHA.config({
    theme: 'light', // 'light' default or 'dark'
    publickey: '6LcBJxgTAAAAAH1hXSHtnigbCzH6ToXIzUAwZjpM'
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
    return Session.get('notifyFlag') === 'yes' ? true : false;
  }
});

Template.home.onRendered(function() {

  var margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    width = 100 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;
  var y = d3.scale.ordinal().domain(d3.range(1)).rangePoints([0, height]);
  var svg = d3.select("#dot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  function pulse() {
    var svg = d3.select("#dotty")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var rctr = 0;

    (function repeat() {
      if (rctr < 10) {
        svg.selectAll("circle")
          .data(y.domain())
          .enter()
          .append("circle")
          .attr("id", "circle1")
          .attr("stroke-width", 0)
          .attr('stroke', 'black')
          .attr("r", 0)
          .attr("cx", width / 2)
          .attr("cy", y);

        svg.select("circle")
          .transition()
          .duration(2000)
          .attr('stroke-width', 0)
          .attr("r", 25)
          .ease('sine')
          .transition()
          .duration(0)
          .attr('stroke-width', 1)
          .attr("r", 1)
          .ease('bounce')
          .each("end", repeat);
        rctr++;
      }
    })();

  }

  pulse();



  function bounce() {

    var ctr = 0;
    (function bouncy() {
      if (ctr < 3) {
        svg.selectAll("circle")
          .data(y.domain())
          .enter()
          .append("circle")
          .attr("id", "circle2")
          .attr("stroke-width", 1)
          .attr('stroke', 'black')
          .attr("r", 2)
          .attr("cx", width / 2)
          .attr("cy", y);

        svg.select("#circle2")
          .transition()
          .duration(1500)
          .attr('cy', (20 + (ctr * 4)))
          .ease('quad')
          .transition()
          .duration(1500)
          .attr('cy', 50)
          .ease('bounce')
          .each("end", bouncy);
        ctr++;
      }
    })();

  }

  bounce();
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

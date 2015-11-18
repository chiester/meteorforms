Template.formProposal.rendered = function() {
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html);
  });
};


Template.formProposal.events({
  'click .js-switch': function(event, template) {
    var lt, mt;

    // poor man's toggle
    if (event.target.name === 'employer.numberOfEmployees.lessThanTen' && event.target.checked) {
      //console.log($("input[name='employer.numberOfEmployees.moreThanTen']"));
      mt = $("input[name='employer.numberOfEmployees.moreThanTen']")[0];
      if (mt.checked) {
        $('.switchery').click();
      }
    } else if (event.target.name === 'employer.numberOfEmployees.moreThanTen' && event.target.checked) {
      lt = $("input[name='employer.numberOfEmployees.lessThanTen']")[0];
      if (lt.checked) {
        $('.switchery').click();
      }
    }
  }
});

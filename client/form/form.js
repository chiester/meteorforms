Template.formProposal.rendered = function() {
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html);
  });
};


Template.formProposal.events({
  'click .js-switch': function(event, template) {

    console.log(event);

    //kind of ugly
    if (event.target.name === 'employer.numberOfEmployees.lessThanTen') {
      console.log($("input[name='employer.numberOfEmployees.moreThanTen']").prop("checked"));
      $("input[name='employer.numberOfEmployees.moreThanTen']")[0].prop("checked", false);
    } else if (event.target.name === 'employer.numberOfEmployees.moreThanTen') {
      $("input[name='employer.numberOfEmployees.lessThanTen']")[0].prop("checked", false);
    }

  }
})

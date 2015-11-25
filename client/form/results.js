// configuration for our table of results
dataTableData = function() {
  return CitizenForms.find({}).fetch();
};

Template.results.helpers({
  results: function() {
    return dataTableData;
  },
  optionsObject: function() {
    return optionsObject; // see below
  }
});

var optionsObject = {
  columns: [{
    data: "contact.lastName",
    title: "Name",
    render: function(val, type, doc) {
      if (doc.contact.firstName && doc.contact.lastName) {
        return doc.contact.firstName + " " + doc.contact.lastName;
      } else {
        return '';
      }
    }
  }, {
    data: "employer.employerName",
    title: "Employer Name"
  }, {
    data: "createdAt",
    title: "Created Date",
    order: function(val, type, doc) {
      if (val instanceof Date) {
        return +moment(val);
      } else {
        return null;
      }
    },
    render: function(val, type, doc) {
      if (val instanceof Date) {
        return moment(val).format("LLL");
      } else {
        return "Never updated";
      }
    }
  }]
};

//event that enables users to click on a row of data from the table
// and view or save or print the form data for a particular record
Template.results.events({
  'click tbody > tr': function(event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    Router.go('resultsRead', {
      id: rowData._id
    });
  }
});

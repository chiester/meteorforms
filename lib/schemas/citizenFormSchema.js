CitizenForms = new Mongo.Collection('citizenforms');

CitizenForms.attachBehaviour('timestampable');

var phoneRegex = /^\d{3}[- ]\d{3}[- ]\d{4}$/;

var webRegex = /^(http:\/\/www\.|https:\/\/www\.|ftp:\/\/www.|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

var zipcodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;

// US States object used in address schemas
stateProvinces = [{
  label: "Alabama",
  value: "AL"
}, {
  label: "Alaska",
  value: "AK"
}, {
  label: "American Samoa",
  value: "AS"
}, {
  label: "Arizona",
  value: "AZ"
}, {
  label: "Arkansas",
  value: "AR"
}, {
  label: "California",
  value: "CA"
}, {
  label: "Colorado",
  value: "CO"
}, {
  label: "Connecticut",
  value: "CT"
}, {
  label: "Delaware",
  value: "DE"
}, {
  label: "District Of Columbia",
  value: "DC"
}, {
  label: "Federated States Of Micronesia",
  value: "FM"
}, {
  label: "Florida",
  value: "FL"
}, {
  label: "Georgia",
  value: "GA"
}, {
  label: "Guam",
  value: "GU"
}, {
  label: "Hawaii",
  value: "HI"
}, {
  label: "Idaho",
  value: "ID"
}, {
  label: "Illinois",
  value: "IL"
}, {
  label: "Indiana",
  value: "IN"
}, {
  label: "Iowa",
  value: "IA"
}, {
  label: "Kansas",
  value: "KS"
}, {
  label: "Kentucky",
  value: "KY"
}, {
  label: "Louisiana",
  value: "LA"
}, {
  label: "Maine",
  value: "ME"
}, {
  label: "Marshall Islands",
  value: "MH"
}, {
  label: "Maryland",
  value: "MD"
}, {
  label: "Massachusetts",
  value: "MA"
}, {
  label: "Michigan",
  value: "MI"
}, {
  label: "Minnesota",
  value: "MN"
}, {
  label: "Mississippi",
  value: "MS"
}, {
  label: "Missouri",
  value: "MO"
}, {
  label: "Montana",
  value: "MT"
}, {
  label: "Nebraska",
  value: "NE"
}, {
  label: "Nevada",
  value: "NV"
}, {
  label: "New Hampshire",
  value: "NH"
}, {
  label: "New Jersey",
  value: "NJ"
}, {
  label: "New Mexico",
  value: "NM"
}, {
  label: "New York",
  value: "NY"
}, {
  label: "North Carolina",
  value: "NC"
}, {
  label: "North Dakota",
  value: "ND"
}, {
  label: "Northern Mariana Islands",
  value: "MP"
}, {
  label: "Ohio",
  value: "OH"
}, {
  label: "Oklahoma",
  value: "OK"
}, {
  label: "Oregon",
  value: "OR"
}, {
  label: "Palau",
  value: "PW"
}, {
  label: "Pennsylvania",
  value: "PA"
}, {
  label: "Puerto Rico",
  value: "PR"
}, {
  label: "Rhode Island",
  value: "RI"
}, {
  label: "South Carolina",
  value: "SC"
}, {
  label: "South Dakota",
  value: "SD"
}, {
  label: "Tennessee",
  value: "TN"
}, {
  label: "Texas",
  value: "TX"
}, {
  label: "Utah",
  value: "UT"
}, {
  label: "Vermont",
  value: "VT"
}, {
  label: "Virgin Islands",
  value: "VI"
}, {
  label: "Virginia",
  value: "VA"
}, {
  label: "Washington",
  value: "WA"
}, {
  label: "West Virginia",
  value: "WV"
}, {
  label: "Wisconsin",
  value: "WI"
}, {
  label: "Wyoming",
  value: "WY"
}];

// for 'allowedValues' we just need the values of the US States object
stateProvinceValues = _.pluck(stateProvinces, 'value');

helpChoiceSchema = new SimpleSchema({
  helpMeResolve: {
    label: "Help me resolve my complaint with my employer.",
    type: Boolean,
    defaultValue: true,
    autoform: {
      class: 'js-switch'
    }
  },
  investigate: {
    label: "Investigate an employer that I believe is violating the law (third party complaint).",
    type: Boolean,
    defaultValue: false,
    autoform: {
      class: 'js-switch'
    }
  }
});

addressSchema = new SimpleSchema({
  address1: {
    type: String,
    max: 100,
    label: "Address Line 1"
  },
  address2: {
    type: String,
    max: 100,
    optional: true,
    label: "Address Line 2 (optional)"
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    label: "State",
    allowedValues: stateProvinceValues,
    autoform: {
      type: "select",
      options: stateProvinces,
      afFieldInput: {
        firstOption: "(Select a State)"
      }
    }
  },
  zip: {
    type: String,
    regEx: zipcodeRegex,
    label: "ZIP Code"
  }
});

contactSchema = new SimpleSchema({
      firstName: {
        type: String,
        label: "First Name",
        regEx: /^[a-zA-Z-]{2,25}$/,
        min: 2,
        max: 25
      },
      lastName: {
        type: String,
        label: "Last Name",
        regEx: /^[a-zA-Z- ]{2,25}$/,
        min: 2,
        max: 25
      },
  address: {
    label: "Address",
    type: addressSchema
  },
  phone: {
    type: String,
    min: 7,
    max: 25,
    regEx: phoneRegex,
    label: "Primary Phone Number",
    autoform: {
      type: 'masked-input',
      mask: '(000)000-0000',
      maskOptions: {
        placeholder: '(___)___-____'
      }
    }
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    max: 50,
    label: "Email"
  }
});

numEmployeesSchema = new SimpleSchema({
  lessThanTen: {
    label: "Fewer Than 10",
    type: "select-radio",
    autoform: {
      class: 'numEmployees',
      template: 'cfButtonGroup'
    }
  },
  moreThanTen: {
    label: "10 or More",
    type: "select-radio",
    autoform: {
      class: 'numEmployees',
      template: 'cfButtonGroup'
    }
  }
});

employerSchema = new SimpleSchema({
  employerName: {
    type: String,
    min: 2,
    max: 50
  },
  title: {
    label: "Your Job Title/Function",
    type: String,
    min: 2,
    max: 50
  },
  employerAddress: {
    label: "Employer Address",
    type: addressSchema
  },
  numberOfEmployees: {
    type: String,
    allowedValues: ['fewerThanTen', 'tenOrMore'],
    autoform: {
      template: 'buttonGroup',
      afFieldInput: {
        type: 'select-radio'
      },
      options: [{
        label: "Fewer Than 10",
        value: "fewerThanTen"
      }, {
        label: "10 or More",
        value: "tenOrMore"
      }]
    }
  }
});

CitizenForms.attachSchema(new SimpleSchema({
  helpChoice: {
    label: "How can we help you?",
    type: helpChoiceSchema,
    optional: false
  },
  contact: {
    label: "Your Contact Information",
    type: contactSchema
  },
  employer: {
    label: "Employment Information",
    type: employerSchema
  }
}));

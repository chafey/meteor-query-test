Template.patientSearch.events({
  'click #patientSearchButton': function(e) {
    
    var query = {
      name: PatientSearchForm.getName('#name'),
      mrn: PatientSearchForm.getValue('#mrn'),
      dateTimeOfBirth: PatientSearchForm.getDate('#dob')
    }

    patientsSubscription.stop();
    patientsSubscription = Meteor.subscribe("patients", query);
  }
});

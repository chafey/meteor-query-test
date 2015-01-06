Session.setDefault('patientSubscriptionQuery', {
  name: PatientSearchForm.getNameSlug('#nameInput'),
  mrn: PatientSearchForm.getValue('#mrnInput'),
  dateTimeOfBirth: PatientSearchForm.getDate('#dobInput')
})


Meteor.startup(function(){
  Deps.autorun(function() {
    Meteor.subscribe("patients", Session.get('patientSubscriptionQuery'));
  });
});

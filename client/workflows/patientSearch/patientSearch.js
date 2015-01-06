Session.setDefault('nameFilter', '');
Session.setDefault('mrnFilter', '');
Session.setDefault('dobFilter', '');

Template.patientSearch.events({
  'click #patientSearchButton': function(e) {

    var query = {
      name: PatientSearchForm.getNameSlug('#nameInput'),
      mrn: PatientSearchForm.getValue('#mrnInput'),
      dateTimeOfBirth: PatientSearchForm.getDate('#dobInput')
    }

    // this is actually kind of a nice approach.
    patientsSubscription.stop();
    patientsSubscription = Meteor.subscribe("patients", query);
  },
  'keyup #nameInput':function(){
    Session.set('nameFilter', PatientSearchForm.getName('#nameInput'));
  },
  'keyup #mrnInput':function(){
    Session.set('mrnFilter', PatientSearchForm.getValue('#mrnInput'));
  },
  'keyup #dobInput':function(){
    Session.set('dobFilter', PatientSearchForm.getValue('#dobInput'));
  }
});

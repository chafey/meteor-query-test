Session.setDefault('nameFilter', '');
Session.setDefault('mrnFilter', '');
Session.setDefault('dobFilter', '');

Session.setDefault('minDateFilter', '');
Session.setDefault('maxDateFilter', '');
Session.setDefault('modalityFilter', '');

Template.patientSearch.events({
  'click #patientSearchButton': function(e) {
    Session.set('patientSubscriptionQuery', {
      minDate: Session.get('minDateFilter'),
      maxDate: Session.get('maxDateFilter'),
      modality: Session.get('modalityFilter')
    });
  },
  'keyup #nameInput':function(){
    Session.set('nameFilter', PatientSearchForm.getName('#nameInput'));
  },
  'keyup #mrnInput':function(){
    Session.set('mrnFilter', PatientSearchForm.getValue('#mrnInput'));
  },
  'keyup #dobInput':function(){
    Session.set('dobFilter', PatientSearchForm.parseDate('#dobInput'));
  },
  'change #dobInput':function(){
    Session.set('dobFilter', PatientSearchForm.parseDate('#dobInput'));
  },

  'keyup #minDateInput':function(){
    Session.set('minDateFilter', PatientSearchForm.parseDate('#minDateInput'));
  },
  'keyup #maxDateInput':function(){
    Session.set('maxDateFilter', PatientSearchForm.parseDate('#maxDateInput'));
  },
  'keyup #modalityInput':function(){
    Session.set('modalityFilter', PatientSearchForm.getValue('#modalityInput'));
  }

});



Template.patientSearch.helpers({
  getModality: function(){
    return Session.get('modalityFilter');
  },
  getName: function(){
    return Session.get('nameFilter');
  },
  getMrn: function(){
    return Session.get('mrnFilter');
  },
  getDob: function(){
    return Session.get('dobFilter');
  }
});

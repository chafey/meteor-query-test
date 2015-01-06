Session.get('nameFilter')
Session.get('mrnFilter')
Session.get('dobFilter')

Template.patientList.helpers({
  patients: function() {
    // if(Session.get('dobFilter')){
    //   var birthdate = new Date(Session.get('dobFilter'));
    //   return Patients.find({
    //     dateTimeOfBirth: {
    //       $lte: new Date(birthdate.getTime() + (1000 * 60 * 60 * 24)),
    //       $gte: new Date(birthdate.getTime() - (1000 * 60 * 60 * 24))
    //     }
    //   });
    // }else{

      var query = {};

      if(Session.get('dobFilter')){
        var birthdate = new Date(Session.get('dobFilter'));
        console.log('birthdate', birthdate);

        // return Patients.find({
        //   dateTimeOfBirth: {
        //     $lte: new Date(birthdate.getTime() + (1000 * 60 * 60 * 24)),
        //     $gte: new Date(birthdate.getTime() - (1000 * 60 * 60 * 24))
        //   }
        // });


        query = {
          $and: [{
            name: {
              $regex: Session.get('nameFilter'),
              $options: 'i'
            }
          }, {
            mrn: {
              $regex: Session.get('mrnFilter'),
              $options: 'i'
            }
          }, {
            dateTimeOfBirth: {
              $lte: new Date(birthdate.getTime() + (1000 * 60 * 60 * 24)),
              $gte: new Date(birthdate.getTime() - (1000 * 60 * 60 * 24))
            }
          }]
        }
        return Patients.find(query);

      }else{
        query = {
          $and: [{
            name: {
              $regex: Session.get('nameFilter'),
              $options: 'i'
            }
          }, {
            mrn: {
              $regex: Session.get('mrnFilter'),
              $options: 'i'
            }
          }]
        }
        return Patients.find(query);
      }




    // }
  },
  dateTimeOfBirthUtc: function() {
    return this.dateTimeOfBirth.toUTCString()
  },
  friendlyName: function() {
    var nameFields = this.name.split('^');
    var name = "";
    if (nameFields.length > 0) {
      name = nameFields[0];
    }
    if (nameFields.length > 1) {
      name += ', ' + nameFields[1];
    }
    return name;
  }
});

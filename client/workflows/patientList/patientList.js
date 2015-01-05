Template.patientList.helpers({
    patients: function () {
        return Patients.find();
    },
    dateTimeOfBirthUtc: function() {
        return this.dateTimeOfBirth.toUTCString()
    },
    friendlyName : function() {
        var nameFields = this.name.split('^');
        var name = "";
        if(nameFields.length > 0) {
            name = nameFields[0];
        }
        if(nameFields.length > 1) {
            name += ', ' + nameFields[1];
        }
        return name;
    }
});

Template.patientList.helpers({
    patients: function () {
        return Patients.find();
    },
    dateOfBirth : function() {
        // dateOfBirth is stored as a Date() object without a timezone.  Since Date() requires a timezone, we use
        // GMT/UTC and thus must ask for it to be displayed in Europe/London timezone to prevent the browser
        // from displaying it using the local time zone
        var dateOfBirth = moment(this.dateOfBirth).tz('Europe/London');
        return dateOfBirth.format('YYYY/MM/DD');
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

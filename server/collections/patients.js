Meteor.startup(function() {
    // we index the name in lowercase so we can do a case insensitive search
    Patients._ensureIndex({
        "nameLower" : 1
    });
    // we index the mrn in lowercase so we can do a case insensitive search
    Patients._ensureIndex({
        "mrnLower" : 1
    });
    Patients._ensureIndex({
        "dateOfBirth" : 1
    });
});

function escapeRegExp(str) {
    return str.replace(/[.^$*+?()[{\\|\]-]/g, '\\$&');
}

Meteor.publish('patients', function(query, limit) {
    query = query || {};
    limit = limit || 10;

    // TODO: validate fields in query

    var queryDoc = {};

    if(query.name) {
        // convert to lowercase since our search is case insensitive
        queryDoc.nameLower = new RegExp('^' + escapeRegExp(query.name.toLowerCase()));
    }
    if(query.mrn) {
        // convert to lowercase since our search is case insensitive
        queryDoc.mrnLower = new RegExp('^' + query.mrn.toLowerCase());
    }
    if(query.dateOfBirth) {
        // Birth dates are stored as Date() objects without the time or timezone.  Since Date() objects require
        // a timezone, we set it to UTC and thus expect incoming dateOfBirth queries to be specified with this in mind
        var dateOfBirth = new Date(query.dateOfBirth);
        if(!isNaN(dateOfBirth.getTime())) {
            var start = dateOfBirth;
            var end = new Date(dateOfBirth.getTime() + 1000 * 60 * 60 * 24);
            queryDoc.dateOfBirth = {$gte : start, $lt: end}
        }
    }

    var pc = Patients.find(queryDoc, {limit : limit});
    return pc;
});

addPatient = function(patient) {
    // TODO: Validate fields in patient
    patient.nameLower = patient.name.toLowerCase();
    patient.mrnLower = patient.mrn.toLowerCase();
    patient.created = new Date();
    return Patients.insert(patient);
}

Meteor.methods({
    clearDatabase: function() {
        Patients.remove({});
    },
    seedDatabase: function(numPatients) {

        numPatients = numPatients || 100;

        var faker = Meteor.npmRequire('Faker');

        for(var i=0; i < numPatients; i++) {
            // We only store the birth date and not the time or the timezone.  Since Date() requires a timezone,
            // we set it to GMT/UTC and force the time to midnight.
            var birthDate = new Date(faker.Date.between("January 1, 1970 GMT" , "December 31, 1980 GMT"));
            birthDate.setUTCHours(0,0,0,0);
            addPatient({
                name : faker.Name.lastName() + "^" + faker.Name.firstName(),
                mrn : 'A' + 10000+i,
                gender : (Math.random() <= 0.5) ? "M" : "F",
                dateOfBirth: birthDate
            });
        }
    }
});

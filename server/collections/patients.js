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
        "dateTimeOfBirth" : 1
    });

    // we can call server side functions from the server
    Meteor.call('seedDatabase');
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
    if(query.dateTimeOfBirth) {
        // we remove the time component so this is a date search only.  Note that the time zone in the db
        // may be different than the the timezone of the date specified in the search!
        var dateOfBirth = new Date(new Date(query.dateTimeOfBirth).setHours(0,0,0,0));
        if(!isNaN(dateOfBirth.getTime())) {
            var start = dateOfBirth;
            var end = new Date(dateOfBirth.getTime() + 1000 * 60 * 60 * 24);
            queryDoc.dateTimeOfBirth = {$gte : start, $lt: end}
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
            addPatient({
                name : faker.Name.lastName() + "^" + faker.Name.firstName(),
                mrn : 'A' + 10000+i,
                gender : (Math.random() <= 0.5) ? "M" : "F",
                // note that we need to specify the timezone for a birth date time to make it correct.  This can
                // create an issue when querying from other timezones
                dateTimeOfBirth: new Date(faker.Date.between("January 1, 1970 GMT-05:00" , "December 31, 1980 GMT-05:00"))
            });
        }
    }
});

// returns a string for the specified dom element by id or undefined if element does not
// exist or value is empty string
function getValue(id)
{
    var val = $(id).val();
    if(!val || 0 === val.length) {
        return undefined;
    }
    return val;
}


// returns a Date object for the specified dom element by id or undefined if element does not
// exist or value is empty string.  The Date object is in UTC format
function getUTCDate(id)
{
    var val = getValue(id);
    if(val === undefined) {
        return undefined;
    } else {
        return new Date(val + " GMT");
    }
}
// returns a Date object for the specified dom element by id or undefined if element does not
// exist or value is empty string.  The Date object is in the local time zone
function getDate(id)
{
    var val = getValue(id);
    if(val === undefined) {
        return undefined;
    } else {
        return new Date(val);
    }
}

// returns the name in LAST^FIRST format or undefined if nothing entered
function getName(id)
{
    var val = getValue(id);
    if(val === undefined) {
        return val;
    }
    // strip spaces
    val = val.replace(/\s+/g, '');

    // parse comma to find last name, first name
    var nameFields = val.split(',');
    var name = "";
    if(nameFields.length > 0) {
        name = nameFields[0];
    }
    if(nameFields.length > 1) {
        name += '^' + nameFields[1];
    }
    return name;
}

Template.patientSearch.events({
    'click #patientSearchButton': function(e) {
        e.preventDefault();

        var query = {
            name: getName('#name'),
            mrn: getValue('#mrn'),
            dateTimeOfBirth: getDate('#dob')
        }

        patientsSubscription.stop();
        patientsSubscription = Meteor.subscribe("patients", query);
    }
});

PatientSearchForm = {
  // returns a string for the specified dom element by id or undefined if element does not
  // exist or value is empty string
  getValue: function(elementId) {
    var value = $(elementId).val();
    if (!value || 0 === value.length) {
      return '';
    }
    return value;
  },

  // returns a Date object for the specified dom element by id or undefined if element does not
  // exist or value is empty string.  The Date object is in UTC format
  getUTCDate: function(id) {
    var val = this.getValue(id);
    if (val === '') {
      return '';
    } else {
      return new Date(val + " GMT");
    }
  },

  // returns a Date object for the specified dom element by id or undefined if element does not
  // exist or value is empty string.  The Date object is in the local time zone
  getDate: function(id) {
    var val = this.getValue(id);
    if (val === '') {
      return '';
    } else {
      return new Date(val);
    }
  },

  // returns a Date object for the specified dom element by id or undefined if element does not
  // exist or value is empty string.  The Date object is in the local time zone
  parseDate: function(elementId) {
    return $(elementId).val();
  },

  // returns the name in LAST^FIRST format or undefined if nothing entered
  getNameSlug: function(elementId) {
    var val = this.getValue(elementId);
    if (val === '') {
      return val;
    }
    // strip spaces
    val = val.replace(/\s+/g, '');

    // parse comma to find last name, first name
    var nameFields = val.split(',');
    var name = '';
    if (nameFields.length > 0) {
      name = nameFields[0];
    }
    if (nameFields.length > 1) {
      name += '^' + nameFields[1];
    }
    return name;
  },

  getName: function(elementId) {
    var value = $(elementId).val();
    if (!value || 0 === value.length) {
      return '';
    }
    return value;
    if (val === '') {
      return val;
    }
    return name;
  }
}

Template.seedDatabase.events({
    'click #seed': function () {
        Meteor.call('seedDatabase');
    },
    'click #clear': function () {
        Meteor.call('clearDatabase');
    }

});

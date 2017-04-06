import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
	if(Meteor.users.find().count() === 1){
		Roles.addUsersToRoles(Meteor.users.findOne()._id, ['super-admin'],'staff');
	}
});
	

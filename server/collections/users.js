Users = Meteor.users;

Users.allow({
	update: function (userId, doc, fields, modifier) {
		return Users.userCanUpdate(userId, doc);
	}
});
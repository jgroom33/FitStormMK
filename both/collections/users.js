this.Users = Ground.Collection(Meteor.users);


this.Users.userCanUpdate = function(userId, doc) {
	return userId && doc._id == userId;
};
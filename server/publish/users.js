Meteor.publish("users_list", function() {
	return Users.find({}, {});
});

Meteor.publish("user_details", function(userId) {
	return Users.find({ _id : userId }, {});
});
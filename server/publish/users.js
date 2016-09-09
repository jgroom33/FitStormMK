Meteor.publish("users_list", function(userId) {
	return Users.find({ _id : { $ne: userId } }, {});
});

Meteor.publish("user_details", function(userId) {
	return Users.find({ _id : userId }, {});
});
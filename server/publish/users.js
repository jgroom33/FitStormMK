Meteor.publish("coach_list", function(userId) {
	return Users.find({ _id : { $ne: userId } }, {});
});
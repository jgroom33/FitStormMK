SetExercises.allow({
	insert: function (userId, doc) {
		return SetExercises.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SetExercises.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SetExercises.userCanRemove(userId, doc);
	}
});

SetExercises.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SetExercises.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SetExercises.before.remove(function(userId, doc) {
	
});

SetExercises.after.insert(function(userId, doc) {
	var setDuration = 0;
	_.map(doc.exercises, function(exercise) { setDuration += exercise.duration; });
	setDuration = parseInt(doc.cycle) * setDuration;
	Sets.update({ _id: doc.setId}, {$inc: { "setDuration": setDuration }});
});

SetExercises.after.update(function(userId, doc, fieldNames, modifier, options) {
	var setExercises = SetExercises.find({ setId: doc.setId }).fetch();
	var totalSetDuration = 0;

	_.each(setExercises, function(setExercise) 
	{
		subSetDuration = 0;
		subSetDuration += _.reduce(setExercise.exercises, function(sum, item) { return sum + item.duration; }, 0);
		totalSetDuration = (setExercise.cycle * subSetDuration) + totalSetDuration;
	});

	Sets.update({ _id: doc.setId}, {$set: { "setDuration": totalSetDuration }});
});

SetExercises.after.remove(function(userId, doc) {
	var setDuration = 0;

	_.map(doc.exercises, function(exercise) { setDuration += exercise.duration; });
	setDuration = parseInt(doc.cycle) * setDuration;
	Sets.update({ _id: doc.setId}, {$inc: { "setDuration": (-1*setDuration) }});
});

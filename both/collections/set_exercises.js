// this.SetExercises = new Mongo.Collection("set_exercises");

// var set_exercises = new Mongo.Collection("set_exercises");
this.SetExercises = new Ground.Collection('set_exercises');

this.SetExercises.userCanInsert = function(userId, doc) {
	return true;
};

this.SetExercises.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

this.SetExercises.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

// saves free sets

this.saveFreeSets = function() 
{
	var songUrl = Meteor.absoluteUrl() + "songs/free-song-1.mp3",
		newSetExercise = {},
		songUrl2 = Meteor.absoluteUrl() + "songs/free-song-2.mp3",
		userId   = "free_user"; // ((typeof userId == undefined) ? "free_user" : userId);

	// free set 1
	set_one_id = Sets.insert({setName: 'Free cardio', type: 'Interval', difficulty: 'easy', focus: 'cardio', songUrl: songUrl, isDefault: true});
	set_one_exercises = [
		{exercises: ["Silent"], cycle: 1},
		{exercises: ["Push ups", "Mountain climbers"], cycle: 3},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Iron cross", "Leg raises"], cycle: 3},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Squats", "Burpees"], cycle: 3},
		{exercises: ["Rest"], cycle: 1}
	];
	set_one_exercises.forEach(function(exercisesObj) {
		newSetExercise = {ownerId: userId, setId: set_one_id, cycle: exercisesObj.cycle, exercises: []};
		for(var i = 0 ; i < exercisesObj.exercises.length; i ++) {
			e = Exercises.findOne({name: exercisesObj.exercises[i]});
			newSetExercise.exercises.push({exercise: e.name, duration: 10, exerciseId: e._id});
		}
		var id = SetExercises.insert(newSetExercise);
	});

	// free set 2
	set_two_id = Sets.insert({setName: 'Free cardio 2', type: 'Interval', difficulty: 'easy', focus:'cardio', songUrl: songUrl2, isDefault: true});
	set_two_exercises = [
		{ exercises: ["Silent"], cycle: 1 },
		{ exercises: ["Push ups", "Mountain climbers", "Burpees", "Rest", "A frame push ups", "Lunges", "Star jumps","Rest","Sit ups", "Leg raises", "Iron cross","Rest"], cycle: 3 },
	];
	set_two_exercises.forEach(function(exercisesObj) {
		newSetExercise = {ownerId: userId, setId: set_two_id, cycle: exercisesObj.cycle, exercises: []};
		for(var i = 0 ; i < exercisesObj.exercises.length; i ++){
			e = Exercises.findOne({name: exercisesObj.exercises[i]});
			if (exercisesObj.exercises[i] == "Rest" || exercisesObj.exercises[i] == "Silent") {
				newSetExercise.exercises.push({exercise: e.name, duration: 10, exerciseId: e._id});
			} 
			else {
				newSetExercise.exercises.push({exercise: e.name, duration: 20, exerciseId: e._id});
			}
		}
		SetExercises.insert(newSetExercise);
	});

	// free set 3
	set_3_id = Sets.insert({setName: 'Free core', type: 'Interval', difficulty: 'easy', focus: 'core', songUrl: songUrl, isDefault: true});
	set_3_exercises = set_one_exercises;
	set_3_exercises.forEach(function(exercisesObj) {
		newSetExercise = {ownerId: userId, setId: set_3_id, cycle: exercisesObj.cycle, exercises: []};
		for(var i = 0 ; i < exercisesObj.exercises.length; i ++){
			e = Exercises.findOne({name: exercisesObj.exercises[i]});
			newSetExercise.exercises.push({exercise: e.name, duration: 10, exerciseId: e._id});
		}
		SetExercises.insert(newSetExercise);
	});

	// free set 4
	set_4_id = Sets.insert({setName: 'Free Strength', type: 'Interval', difficulty: 'easy', focus: 'strength', songUrl: songUrl, isDefault: true});
	set_4_exercises = set_one_exercises;
	set_4_exercises.forEach(function(exercisesObj) {
		newSetExercise = {ownerId: userId, setId: set_4_id, cycle: exercisesObj.cycle, exercises: []};
		for(var i = 0 ; i < exercisesObj.exercises.length; i ++){
			e = Exercises.findOne({name: exercisesObj.exercises[i]});
			newSetExercise.exercises.push({exercise: e.name, duration: 10, exerciseId: e._id});
		}
		SetExercises.insert(newSetExercise);
	});
}
var pageSession = new ReactiveDict();

Template.Register.rendered = function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false);

	
	Meteor.defer(function() {
		$("input[autofocus]").focus();
	});

};

Template.Register.created = function() {
	pageSession.set("errorMessage", "");
};

Template.Register.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var register_name = t.find('#register_name').value.trim();
		var register_email = t.find('#register_email').value.trim();
		var register_password = t.find('#register_password').value;

		// check name
		if(register_name == "")
		{
			pageSession.set("errorMessage", "Please enter your name.");
			t.find('#register_name').focus();
			return false;
		}

		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}

		// check password
		var min_password_len = 6;
		if(!isValidPassword(register_password, min_password_len))
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;
		}

		submit_button.button("loading");
		Accounts.createUser({email: register_email, password : register_password, profile: { name: register_name }}, function(err) {
			submit_button.button("reset");
			if(err) {
				if(err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			}
			else
			{
				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
				saveFreeSets();
			}
		});
		return false;
	},

	"click .go-home": function(e, t) {
		Router.go("/");
	}
	
});

Template.Register.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}
	
});

saveFreeSets = function() {
	var songUrl = Meteor.absoluteUrl() + "songs/free-song-1.mp3",
		newSetExercise = {};
	var songUrl2 = Meteor.absoluteUrl() + "songs/free-song-2.mp3";

	// free set 1
	set_one_id = Sets.insert({setName: 'Free set 1', type: 'Interval', difficulty: 'easy', songUrl: songUrl, isDefault: true});
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
		newSetExercise = {ownerId: Meteor.userId(), setId: set_one_id, cycle: exercisesObj.cycle, exercises: []};
		for(var i = 0 ; i < exercisesObj.exercises.length; i ++) {
			e = Exercises.findOne({name: exercisesObj.exercises[i]});
			newSetExercise.exercises.push({exercise: e.name, duration: 10, exerciseId: e._id});
		}
		SetExercises.insert(newSetExercise);
	});

	// free set 2
	set_two_id = Sets.insert({setName: 'Free set 2', type: 'Interval', difficulty: 'easy', songUrl: songUrl2, isDefault: true});
	set_two_exercises = [
		{exercises: ["Silent"], cycle: 1},
		{exercises: ["Push ups", "Mountain climbers", "Burpees"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["A frame push ups", "Lunges", "Star jumps"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Sit ups", "Leg raises", "Iron cross"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Push ups", "Mountain climbers", "Burpees"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["A frame push ups", "Lunges", "Star jumps"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Sit ups", "Leg raises", "Iron cross"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Push ups", "Mountain climbers", "Burpees"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["A frame push ups", "Lunges", "Star jumps"], cycle: 1},
		{exercises: ["Rest"], cycle: 1},
		{exercises: ["Sit ups", "Leg raises", "Iron cross"], cycle: 1},
		{exercises: ["Rest"], cycle: 1}
	];
	set_two_exercises.forEach(function(exercisesObj) {
		newSetExercise = {ownerId: Meteor.userId(), setId: set_two_id, cycle: exercisesObj.cycle, exercises: []};
		console.log(exercisesObj.exercises.length);
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

	// free set 2
	set_3_id = Sets.insert({setName: 'Free set 3', type: 'Interval', difficulty: 'easy', songUrl: songUrl, isDefault: true});
	set_3_exercises = set_one_exercises;
	set_3_exercises.forEach(function(exercisesObj) {
		newSetExercise = {ownerId: Meteor.userId(), setId: set_3_id, cycle: exercisesObj.cycle, exercises: []};
		for(var i = 0 ; i < exercisesObj.exercises.length; i ++){
			e = Exercises.findOne({name: exercisesObj.exercises[i]});
			newSetExercise.exercises.push({exercise: e.name, duration: 10, exerciseId: e._id});
		}
		SetExercises.insert(newSetExercise);
	});
}

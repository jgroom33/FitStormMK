var pageSession = new ReactiveDict(),
	params = [],
	exercises = [],
	audio_ids = [];
	
Template.AddExercises.rendered = function() {
	params = this.data.params;
	set_exercises =  [];
	pageSession.set('setType', 'AMRAP');

	if(params.hasOwnProperty('setId')) {
		set_exercises = this.data.set_exercises.fetch();
		set = Sets.findOne(params.setId);
		pageSession.set('setType', set.type);
	}

	exercises = Exercises.find().fetch();
	pageSession.set('set_exercises', set_exercises);
	pageSession.set('exerciseAction', null);
	pageSession.set('hasExercises', set_exercises.length);
	pageSession.set('isRecording', false);
	pageSession.set('record_id', null);
};

Template.AddExercises.helpers({
	"exerciseAction" : function() {
		return pageSession.get('exerciseAction');
	},
	"hasExercises" : function() {
		return pageSession.get('hasExercises') && !pageSession.get('exerciseAction');
	},
	"getExercises" : function() {
		return pageSession.get('set_exercises');
	},
	"exercises": function(){
		return exercises;
	},
	"isAdding" : function() {
		return isAdding(pageSession.get('exerciseAction'));
	},
	"getDurationValue" : function(){
		action = pageSession.get('exerciseAction');
		setType = pageSession.get('setType');
		duration = getDurationByType(setType);

		if(action && !isAdding(action)) {
			duration = getValue(pageSession.get('selectedSetExercises'), 'duration');
		}		
		return duration;
	},
	"getLabel" : function(){
		var setType = pageSession.get('setType');
		if(setType.indexOf('AMRAP') > -1) {
			return 'Rep/Quantity';
		}
		return 'Duration';
	},
	"isRecording": function(){
		return pageSession.get('isRecording');
	},
	"isReadOnly": function() {
		setType = pageSession.get('setType');
		return (setType && (setType.indexOf('EMOM') > -1 || setType.indexOf('Tabata') > -1));
	},
	"selectedSetExercises" : function(){
		return pageSession.get('selectedSetExercises');
	},
	"getCycle" : function() {
		action = pageSession.get('exerciseAction');
		selectedSetExercises = pageSession.get('selectedSetExercises');
		if(action && isAdding(action)) {
			return 1;
		}
		return selectedSetExercises.cycle;
	}
});

Template.AddExercises.events({
	"click .save-set-exercise" : function(e) 
	{
		e.preventDefault();
		var set_exercises 	 = pageSession.get('set_exercises'),
			action       	 = pageSession.get('exerciseAction'),
			selectedSetExercises = pageSession.get('selectedSetExercises'),
			$setExercisesWrapper = $('.new-exercise-wrapper'),
			cycle = $("input[name='cycle']").val() || 1,
			newSetExercise     = {setId: params.setId, cycle: cycle, exercises: []}; 

		$setExercisesWrapper.each(function(index, exercise) 
		{
			var _this  	     = $(exercise),
				duration   	 = parseFloat(_this.find('#exercise-duration').val()),
				exerciseId 	 = _this.find('.select-exercise').find("option:selected").data('id'),
				exerciseName = _this.find('.select-exercise').val();

			newSetExercise.exercises.push({exercise: exerciseName, duration: duration, exerciseId: exerciseId})
		});

		if(action.indexOf('Add') > -1) 
		{
			newId = SetExercises.insert(newSetExercise);
			newSetExercise._id = newId;

			set_exercises.push(newSetExercise);
		}
		else {
			index = _.pluck(set_exercises, '_id').indexOf(selectedSetExercises._id);
			SetExercises.update(
				{_id: selectedSetExercises._id},
				{$set: 
				{
			        'cycle': cycle,
			        'exercises': newSetExercise.exercises
			    }
			});
			set_exercises[index] = newSetExercise;
		}
		pageSession.set('exerciseAction', null);
		pageSession.set('hasExercises', set_exercises.length);
		pageSession.set('set_exercises', set_exercises);
	},
	"click .add-exercise" : function(e) {
		e.preventDefault();
		pageSession.set('exerciseAction', 'Add');
	},
	"click .cancel-exercise": function(e) {
		e.preventDefault();
		pageSession.set('exerciseAction', null);
	},
	"click .edit-set-exercises": function(e, t) {
		e.preventDefault();
		var $targetId = this._id;
		setExercise = $.grep(pageSession.get('set_exercises'), function(exrcse){ return exrcse._id == $targetId; });
		pageSession.set('selectedSetExercises', setExercise[0] || {});
		pageSession.set('exerciseAction', 'Edit');
	},
	"click .delete-exercise": function(e)
	{
		e.preventDefault();
		var self = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						var $targetId    = $(e.target).parent().data('id'),
							set_exercises  = pageSession.get('set_exercises');

						set_exercises = _.reject(set_exercises, function(obj){ return obj._id == $targetId; });
						SetExercises.remove($targetId);
						pageSession.set('exerciseAction', null);
						pageSession.set('set_exercises', set_exercises);
						pageSession.set('hasExercises', set_exercises.length);
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #record-cue-start": function(e) {
		e.preventDefault();
		pageSession.set('isRecording', true);
		if(Records.ready()) {
			Records.startRecording({},function(err, id) {
				pageSession.set('record_id', id);
			});
		}
	},
	"click #record-cue-stop": function(e) {
		e.preventDefault();
		pageSession.set('isRecording', false);
		Records.stopRecording();
	},
	"click #add-new-exercise" : function(e, t) {
		$newExerciseField = $('.new-exercise-wrapper.orig').clone();
		$newExerciseField.removeClass('orig');
		$newExerciseField.appendTo('#exercise-group-wrapper');
	},
	"click .delete-set-exercises" : function(e) {
		var setExerciseId = this._id;
		var set_exercises = _.reject(pageSession.get('set_exercises'), function(setExercise) {
			return setExercise._id == setExerciseId;
		});
		SetExercises.remove(this._id);
		pageSession.set('set_exercises', set_exercises);
	}
});

getValue = function(obj, index){
	return obj[0][index];
}
getExercises = function() {
	return pageSession.get('set_exercises');
}

setSetType = function(setType) {
	pageSession.set('setType', setType);
}

getDurationByType = function(setType){
	switch(setType) {
	    case 'EMOM':
	    	return 60;
	        break;
	    case 'Tabata':
	    	return 20;
	        break;
	    default:
	        return 30;
	}	
}

isAdding = function(str) {
	return (str.indexOf('Add') > -1);
}

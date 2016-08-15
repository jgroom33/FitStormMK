var pageSession = new ReactiveDict(),
	record_ids = [],
	song_ids;

Template.InsertExercise.rendered = function(){
	pageSession.set('isRecording', false);
	pageSession.set("exercisesInsertInsertFormInfoMessage", "");
	pageSession.set("exercisesInsertInsertFormErrorMessage", "");
	pageSession.set('isUploading', false);

	song_ids = [];
	
	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.InsertExercise.helpers({
	"isRecording": function() {
		return pageSession.get('isRecording');
	},
	"isUploading": function() {
		return pageSession.get('isUploading');
	}
});


Template.InsertExercise.events({
	"click #upload-cue": function(){
		$('#browse-cue').trigger('click');
	},
	"click #form-cancel-button": function() {
		Router.go("exercises");
	},
	"click #record-cue-start": function() {
		pageSession.set('isRecording', true);
		if(Records.ready()) {
			Records.startRecording({},function(err, id) {
				if(!err) {
					record_ids.push({id: id});
				}
			});
		}
	},
	"click #record-cue-stop": function() {
		pageSession.set('isRecording', false);
		Records.stopRecording();
	},
	"change #field-song-id": function(e, t) {
		e.preventDefault();
		var fileInput = $(e.currentTarget);
		var dataField = fileInput.attr("data-field");
		var hiddenInput = fileInput.closest("form").find("input[name='" + dataField + "s']");
		pageSession.set('isUploading', true);

		FS.Utility.eachFile(event, function(file) {
			Songs.insert(file, function (err, fileObj) {
				fileObj.once('uploaded', function () {
					pageSession.set('isUploading', false);
					song_ids.push(fileObj._id);
					hiddenInput.val(fileObj._id);
			    });
			});
		});
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("exercisesInsertInsertFormInfoMessage", "");
		pageSession.set("exercisesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var exercisesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(exercisesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("exercisesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("exercises");
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("setsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {

				// if(song_ids.length){
				// 	values.songIds = song_ids;
				// }
				
				newId = Exercises.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
				
				// update record
				_.each(record_ids, function(record) {
					Records
						.findOne(record.id)
						.update({
							$set: {
								'exerciseId': newId
							}
						});
				});

				// update uploads
				_.each(song_ids, function(id) {
					Songs.update({
						_id: id
					},{
						$set: {
							'exerciseId': newId
						}
					});
				});

			}
		);

		return false;
	},
});
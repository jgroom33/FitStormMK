var pageSession = new ReactiveDict();

Template.UserSettingsProfile.rendered = function() {
	
};

Template.UserSettingsProfile.events({
	
});

Template.UserSettingsProfile.helpers({
	
});

Template.UserSettingsProfileEditForm.rendered = function() {
	

	pageSession.set("userSettingsProfileEditFormInfoMessage", "");
	pageSession.set("userSettingsProfileEditFormErrorMessage", "");
	pageSession.set('isUploading', false);
	pageSession.set('isChangingPhoto', false);

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

Template.UserSettingsProfileEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userSettingsProfileEditFormInfoMessage", "");
		pageSession.set("userSettingsProfileEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var userSettingsProfileEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(userSettingsProfileEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("userSettingsProfileEditFormInfoMessage", message);
						$(window).scrollTop(0);
					}; break;
				}
			}

			$(".fileinput-remove:visible").trigger("click");
			Router.go("user_settings.profile", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("userSettingsProfileEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				
				Meteor.call("updateUserAccount", t.data.current_user_data._id, values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	},
	"change #profilePhoto": function(e, t) {
		e.preventDefault();
		var fileInput = $(e.currentTarget),
			user      = t.data.current_user_data,
			profile   = user.profile;

		pageSession.set('isUploading', true);
		pageSession.set('isChangingPhoto', true);

		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
				fileObj.once('uploaded', function (error, ff) {
					pageSession.set('isUploading', false);
					$('#profile-img-id').val(fileObj._id);
			    });
			});
		});
	},
	"click .fileinput-remove":function(){
		pageSession.set('isChangingPhoto', false);
	},
	"click #triggerPhotoUploader": function() {
		$('#profilePhoto').trigger('click');
	}
});

Template.UserSettingsProfileEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userSettingsProfileEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userSettingsProfileEditFormErrorMessage");
	},
	"isCoach": function(){
		return Users.isInRole(Meteor.userId(), 'coach');
	},
	"isChangingPhoto": function() {
		return pageSession.get('isChangingPhoto');
	},
	getProfilePictureSource: function() {
		var img = Images.findOne({ _id: this.current_user_data.profile.imageId });
		if(img && typeof img.url() !== undefined) {
			return img.url();
		}
		return 'http://placehold.it/150x100?text=photo';
	}
});
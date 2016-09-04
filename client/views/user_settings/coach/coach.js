var pageSession = new ReactiveDict();
const COACH_ROLE = 'coach';

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsBecomeCoach.rendered = function() {
	$("input[autofocus]").focus();
};

Template.UserSettingsBecomeCoach.created = function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
};

Template.UserSettingsBecomeCoach.events({
	'submit #go_pro' : function(e, t)
	{
		e.preventDefault();
		Meteor.call("updateUserAccount", t.data.current_user_data._id, {"roles": [COACH_ROLE]} );
	}
});

Template.UserSettingsBecomeCoach.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	isCoach: function() {
		return Users.isInRole(this.current_user_data._id, "coach");
	}
});

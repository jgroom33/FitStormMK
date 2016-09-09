var pageSession = new ReactiveDict();

Template.CoachList.rendered = function()
{

};

Template.CoachList.helpers({
	getProfilePictureSource: function() {
		return this.profile.photo || 'http://placehold.it/150x100?text=photo';
	}
});

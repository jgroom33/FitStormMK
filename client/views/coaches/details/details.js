var pageSession = new ReactiveDict();

Template.CoachDetails.rendered = function()
{

};

Template.CoachDetails.helpers({
	getProfilePictureSource: function(){
		return this.coach.profile.photo || 'http://placehold.it/150x100?text=photo';
	}
});

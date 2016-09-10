var pageSession = new ReactiveDict();

Template.CoachDetails.rendered = function()
{

};

Template.CoachDetails.helpers({
	getProfilePictureSource: function() {
		var img = Images.findOne({ _id: this.coach.profile.imageId });
		if(img && typeof img.url() !== undefined) {
			return img.url();
		}
		return 'http://placehold.it/150x100?text=photo';
	}
});

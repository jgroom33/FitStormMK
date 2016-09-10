var pageSession = new ReactiveDict();

Template.CoachList.rendered = function()
{

};

Template.CoachList.helpers({
	getProfilePictureSource: function() {
		var img = Images.findOne({ _id: this.profile.imageId });
		if(img && typeof img.url() !== undefined) {
			return img.url();
		}
		return 'http://placehold.it/150x100?text=photo';
	}
});

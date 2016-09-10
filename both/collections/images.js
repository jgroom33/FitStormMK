this.Images = new FS.Collection("images", {
	stores: [new FS.Store.GridFS("images", {})]
});


this.Images.userCanInsert = function(userId, doc) {
	return true;
};

this.Images.userCanUpdate = function(userId, doc) {
	return true;
};

this.Images.userCanRemove = function(userId, doc) {
	return true;
};

this.Images.userCanDownload = function(userId, doc) {
	return true;
};

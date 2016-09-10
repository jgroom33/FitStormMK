Images.allow({
	insert: function (userId, doc) {
		return Images.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Images.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Images.userCanRemove(userId, doc);
	},

	download: function (userId, doc) {
		return Images.userCanDownload(userId, doc);
	}
});
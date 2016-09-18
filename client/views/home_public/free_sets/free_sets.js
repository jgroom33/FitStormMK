Template.FreeSets.rendered = function() {

};

Template.FreeSets.events({
	"click .set-execution-btn" : function(e, t) {
		e.preventDefault();
		var _self = this;
		bootbox.dialog({
			message: "Are you ready to start?",
			title: "Confirmation",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Router.go("sets.live", {setId : _self._id});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	}
});
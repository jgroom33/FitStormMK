this.CoachListController = RouteController.extend({
	template: "CoachList",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe('coach_list', Meteor.userId())
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			coaches: Meteor.users.find({ _id : { $ne: Meteor.userId() }, roles: { $in: ["coach"] } }, {})
		};
				

		return data;
	},

	onAfterAction: function() {
		
	}
});
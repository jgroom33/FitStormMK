this.CoachDetailsController = RouteController.extend({
	template: "CoachDetails",
	

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
			Meteor.subscribe('users_list', Meteor.userId()),
			Meteor.subscribe('user_details', Meteor.userId())
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
			coach: Users.findOne({ _id : this.params.coachId }, {})
		};
					
		return data;
	},

	onAfterAction: function() {
		
	}
});
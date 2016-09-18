this.FreeSetsController = RouteController.extend({
	template: "FreeSets",
	

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
			Meteor.subscribe("exercises"),
			Meteor.subscribe("free_sets"),
			Meteor.subscribe("free_set_exercises", "free_user"),
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
			free_sets: Sets.find({ isDefault: true },{ transform: function(doc){ doc.set_exercises_joined = SetExercises.find({setId: doc._id}).fetch(); doc.songDetail = Songs.findOne(doc.songId); return doc; }},{sort:[["setName","desc"]]}),
			// free_sets: Sets.find({isDefault: true})
		};
				

		return data;
	},

	onAfterAction: function() {
		
	}
});
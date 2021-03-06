this.SetsDetailsController = RouteController.extend({
	template: "SetsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('sets.details.items', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("set_details", this.params.setId),
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
			set_details: Sets.findOne({ _id:this.params.setId },{ transform: function(doc){ doc.setName = doc.setName.toUpperCase();  doc.set_exercises_joined = SetExercises.find({setId: doc._id}).fetch(); doc.songDetail = Songs.findOne(doc.songId); return doc; }}), //,{sort:[["setName","desc"]]}
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
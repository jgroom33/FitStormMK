var pageSession = new ReactiveDict();

Template.HomePublic.rendered = function() {
	
};

Template.HomePublic.events({
	
});

Template.HomePublic.helpers({
	
});

Template.HomePublicHomeJumbotron.rendered = function() {
	
	if(!pageSession.get('hasLogoFlashed')) {
		pageSession.set('hasLogoFlashed', false);
	}
	
	$('#logo-vid').on("ended", function(e) { 
		pageSession.set('hasLogoFlashed', true);
	});
};

Template.HomePublicHomeJumbotron.created = function() {

};

Template.HomePublicHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("login", {});
	}
});

Template.HomePublicHomeJumbotron.helpers({
	hasLogoFlashed: function() {
		return true && pageSession.get('hasLogoFlashed');
	}
});

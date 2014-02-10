$(document).ready(function() {
	$("#topbar").load("topbar.html", function() {
		var topbarjs = appContext.getObject("topbarjs");
		topbarjs.init();
	});
	
	$("#header").load("header.html", function() {
		var headerjs = appContext.getObject("headerjs");
		headerjs.init();
	});
	
	$("#content").load("content.html", function() {
		var contentjs = appContext.getObject("contentjs");
		contentjs.init();
	});
	
	$("#footer").load("footer.html", function() {
		var footerjs = appContext.getObject("footerjs");
		footerjs.init();
	});
	
	$("#bottombar").load("bottombar.html", function() {
		var bottombarjs = appContext.getObject("bottombarjs");
		bottombarjs.init();
	});
	
	
	
	$('body').on("mainSignBtn", function(event) {
		$("#content").load("signup.html", function() {
			var signupjs = appContext.getObject("signupjs");
			signupjs.init();
		});
	});
});

function AppContext() {
	var objMap = {};
	
	this.addObject = function(name, obj) {
		objMap[name] = obj;
	};
	
	this.getObject = function(name) {
		return objMap[name];
	};
	
}
window.appContext = new AppContext();

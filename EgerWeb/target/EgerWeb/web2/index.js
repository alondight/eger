var loginInfo="";
$(document).ready(function() {
	
	$.getJSON("loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
			
			$("#topbar").load("topbar.html", function() {
				var topbarjs = appContext.getObject("topbarjs");
				topbarjs.init();
			});

			$("#header").load("header.html", function() {
				var headerjs = appContext.getObject("headerjs");
				headerjs.init();
			});

			$("#content").load("memberList.html", function() {
				var memberListjs = appContext.getObject("memberListjs");
				memberListjs.init();
			});

			$("#footer").load("footer.html", function() {
				var footerjs = appContext.getObject("footerjs");
				footerjs.init();
			});

			$("#bottombar").load("bottombar.html", function() {
				var bottombarjs = appContext.getObject("bottombarjs");
				bottombarjs.init();
			});

		};
	});
	
	$("#ChatBackbtn").click(function(){
		$("#chatTest").hide();
	});
	$('body').on("liveChatOn", function(event) {
		$('#chatTest').show();
	});


	$('body').on("event", function(event) {
		$("#content").load("event.html", function() {
			var eventjs = appContext.getObject("eventjs");
			eventjs.init();
		});
	});

	$('body').on("feed", function(event) {
		$("#content").load("feed.html", function() {
			var feedjs = appContext.getObject("feedjs");
			feedjs.init();
		});
	});


	$('body').on("store", function(event) {
		$("#content").load("store.html", function() {
			var storejs = appContext.getObject("storejs");
			storejs.init();
		});
	});
	
	$('body').on("egermain", function(event) {
		$("#content").load("content.html", function() {
			var contentjs = appContext.getObject("contentjs");
			contentjs.init();
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

















if (window.appContext.getObject("headerjs") == undefined) {
	console.log("header.js 로딩 완료");
	var headerjs = {
			init: function() {
				$("#blogo").click( function() {
					$(this).trigger("egermain");
				});
				$("#member").click( function() {
					location.href="index.html";
				});
				$("#event").click( function() {
					$(this).trigger("event");
				});
				$("#feed").click( function() {
					$(this).trigger("feed");
				});
				$("#store").click( function() {
					$(this).trigger("store");
				});
			}
	};
	window.appContext.addObject("headerjs", headerjs);
};
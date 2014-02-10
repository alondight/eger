if (window.appContext.getObject("headerjs") == undefined) {
	console.log("header.js 로딩 완료");
	var headerjs = {
			init: function() {
				$("#dlogo").click( function() {
					location.href="index.html";
				});
				$("#home").click( function() {
					location.href="index.html";
				});
			}
	};
	window.appContext.addObject("headerjs", headerjs);
};
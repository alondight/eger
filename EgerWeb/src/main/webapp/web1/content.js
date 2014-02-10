if (window.appContext.getObject("contentjs") == undefined) {
	console.log("content.js 로딩 완료");
	var contentjs = {
			init: function() {
			}
	};
	window.appContext.addObject("contentjs", contentjs);
};
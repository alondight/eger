if (window.appContext.getObject("bottombarjs") == undefined) {
	console.log("bottombar.js 로딩 완료");
	var bottombarjs = {
			init: function() {
			}
	};
	window.appContext.addObject("bottombarjs", bottombarjs);
};
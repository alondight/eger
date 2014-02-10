if (window.appContext.getObject("footerjs") == undefined) {
	console.log("footer.js 로딩 완료");
	var footerjs = {
			init: function() {
			}
	};
	window.appContext.addObject("footerjs", footerjs);
};
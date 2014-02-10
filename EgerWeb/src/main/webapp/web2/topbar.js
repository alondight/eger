if (window.appContext.getObject("topbarjs") == undefined) {
	console.log("topbar.js 로딩 완료");
	var topbarjs = {
			init: function() {
				$("#logout").click( function() {
					$.getJSON("logout.do", function(result) {
						console.log(result);
					if(result.status == "success") {
						console.log("success");
						location.href="../web1/index.html";
					}else{
						alert("서버가 정상적으로 작동하지 않습니다. 다시 시도해주십시오");
					}
					});
				});
			}
	};
	window.appContext.addObject("topbarjs", topbarjs);
};
if (window.appContext.getObject("topbarjs") == undefined) {
	console.log("topbar.js 로딩 완료");
	var topbarjs = {
			init: function() {
					$("#storeNo").val($.cookie("sno"));
					$("#saveId").attr("checked",($.cookie("saveId")));
				var login = $("#mainLoginBtn");
				login.click( function() {
					if($("#saveId").is(":checked")){
						$.cookie('sno', $("#storeNo").val(), {path:'/', expires:1});
						$.cookie('saveId', true, {path:'/', expires:1});
					} else {
						$.cookie('sno', null);
					}
					$.ajax("login.do", {
						type: "POST",
						data: {
							sno: parseInt($("#storeNo").val()),
							spassword: b64_md5($("#storePassword").val()),
							saveId: $("#saveId").is(":checked")
						},
						dataType: "json",
						success: function(result) {
							if(result.status == "fail") {
								alert("사업자번호 또는 비밀번호가 올바르지 않습니다.");
								$("#storeNo").val("");
								$("#storePassword").val("");
								$("#saveId").attr("checked", true);
							} else {
								location.href = "../web2/index.html";
							}
						}
					});
				});

				$("#mainSignBtn").click( function() {
					$(this).trigger("mainSignBtn");
				});

			}
	};
	window.appContext.addObject("topbarjs", topbarjs);
};




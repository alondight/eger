var loginInfo="";
$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	$.getJSON(window.serverAddress + "eger1/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
		}
	});
	$("#logout").touchend(function(event) {
		event.preventDefault();
		$.getJSON(window.serverAddress + "eger1/logout.do", function(result) {
			if(result.status == "success") {
				location.href = "../auth/login.html";
			}
		});
	});
	
	
	$("#headerSearch").touchend(function(event) {
		location.href = "../eger4/index.html";
	});
	$("#headerEger").touchend(function(event) {
		location.href = "../eger1/index.html";
	});
	$("#headerUser").touchend(function(event) {
		location.href = "../eger3/index.html";
	});
	
	
	
	$("#setPage").on("swiperight", function(event){
		location.href = "../eger2/index.html";
	});
	
	
	
	$("#footeraction2").touchend(function(event) {
		location.href = "../eger2/index.html";
	});
	$("#footeraction3").touchend(function(event) {
		location.href = "../eger3/index.html";
	});
	$("#setting").touchend(function(event) {
		location.href = "index.html";
	});
	
	$('#modalCloseBTN').touchend(function () {  
		location.href = "index.html";
	});
	
	
	$("#changPasswordBtn").click(function(){
		if( b64_md5($("#password").val()) == loginInfo.cpassword ){
			if(	$("#newPassword").val() == $("#newPassword2").val()){
				var password = b64_md5($("#newPassword").val());
				$.ajax(window.serverAddress+"auth/cPasswordChange.do", {
					type: "get",
					data: {
						password: password
					},
					dataType: "json",
					success: function(result) {
						if(result.status == "success") {
							loginInfo = result.data;
							Toast.shortshow("비밀번호가 변경되었습니다.");
							setTimeout(function(){
								location.href = "index.html";
							},3000);
							
						} else {
							$("#password").val("");
							$("#newPassword").val("");
							$("#newPassword2").val("");
							Toast.shortshow("오류가 발생되었습니다.");
						}
					}});

			}else{
				$("#password").val("");
				$("#newPassword").val("");
				$("#newPassword2").val("");
				
				Toast.shortshow("패스워드 확인이 올바르지 않습니다.");
			}
		}else{
			$("#password").val("");
			$("#newPassword").val("");
			$("#newPassword2").val("");
			Toast.shortshow("기존의 패스워드 확인이 올바르지 않습니다.");
		}
	});
	
});






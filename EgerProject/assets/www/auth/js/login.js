$(document).ready(function() {
	var loginInfo = "";
	var regID = "";
	var that = this;
	document.addEventListener("deviceready", onDeviceReady, false);
	$("#page").on("testingEvent",function(e,regid){
		regID = regid;
	});

	$("#sideNavigation").touchend(function(){
		Toast.shortshow("Please Login");
	});


	$("#sideNavigation2").touchend(function(){
		Toast.shortshow("Please Login");
	});
	$('#modalCloseBTN').touchend(function () {  
		location.href ="login.html";
	});  


	$.getJSON(window.serverAddress + "eger1/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
			location.href ="../eger1/index.html";
		} 
	});


	$("#SignupSuccess").touchend(function(event){
		if($("#signupPassword").val()===$("#signupPasswordCheck").val()){
			cemail =$("#signupEmail").val();
			cpassword=b64_md5($("#signupPassword").val());
			if(regID != ""){
				$.post(window.serverAddress + "auth/signup.do",
						{
					email: cemail,
					password: cpassword,
					regid :regID
						},
						function(result) {
							if(result.status == "success") {
								location.href = "../eger1/index.html";
							}else if(result.status == "fail"){
								Toast.shortshow("동일한 이메일이 이미 가입하셨습니다.!");
							}else {
								Toast.shortshow("실해중 오류 발생!");
								console.log(result.data);
							}
						},
				"json");
			}else{
				Toast.shortshow("기기정보를 받아오고 있습니다. 잠시후 다시시도해주세요");
			}
		}else {
			Toast.shortshow("Password 확인이 올바르지 않습니다.");
		}
	});



	$("#btnSignin").touchend( function(event) {
		if(regID != ""){
			$.ajax(window.serverAddress + "auth/login.do", {
				type: "POST",
				data: {
					email: $("#cEmail").val(),
					password: b64_md5($("#cPassword").val()),
					regid :regID
				},
				dataType: "json",
				success: function(result) {
					if(result.status == "fail") {
						Toast.shortshow("이메일과 암호를 다시 확인하세요.");
						$("#cEmail").val("");
						$("#cPassword").val("");
						$("#saveId").attr("checked", true);
					} else {
						location.href = "../eger1/index.html";
					}
				}
			});
			return false;
		}else{
			Toast.shortshow("기기정보를 받아오고 있습니다. 잠시후 다시시도해주세요");
		};
	});


	$('#changeSuccess').touchend(function () {
		if($("#email").val() != null){
			cemail =$("#email").val();
			var randomPassword = Math.floor(Math.random() * 10000 + 10000);

			$.post(window.serverAddress + "auth/clientPasswordChange.do",
					{
				email: cemail,
				md5Password: b64_md5(randomPassword+""),
				password: randomPassword,
					},
					function(result) {
						if(result.status == "success") {
							Toast.shortshow("메일이 전송되었습니다.");
						}else if(result.status == "fail"){
							Toast.shortshow("메일 전송중 오류가 발생되었습니다.");
						}else {
							Toast.shortshow("실해중 오류 발생!");
							console.log(result.data);
						};
					},
			"json");

		}else {
			Toast.shortshow("이메일이 입력되지 않았습니다.!");
		};
	});
});


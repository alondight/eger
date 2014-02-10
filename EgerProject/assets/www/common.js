//window.serverAddress = "http://192.168.41.27:9999/eger2/";
//window.serverAddress = "http://egerteam.cafe24.com/eger2/";
window.serverAddress = "http://192.168.0.21:9999/eger2/";


//device APIs are available

var that = this;
var pushNotification;
function onDeviceReady() {
		$.mobile.defaultPageTransition   = 'none'
		$.mobile.defaultDialogTransition = 'none'
		$.mobile.buttonMarkup.hoverDelay = 0
	
	
	
	document.addEventListener("backbutton", function(e){
		if($.mobile.activePage.is('#page')){
			e.preventDefault();
			navigator.app.exitApp();
		}else if($.mobile.activePage.is('#page1')){
			navigator.notification.confirm(
					"정말 서비스를 종료 하시겠습니까?", 
					function(i){
						if(i == 2){
							e.preventDefault();
							navigator.app.exitApp();
						}
					},
					'EGer',
					'취소,종료하기'       
			);

		}else if($.mobile.activePage.is('#page4')){
			console.log($("#storeViewContent").css("display"));
			if($("#storeViewContent").css("display") != "none"){
				location.href="../eger4/index.html";
			}else{
				navigator.app.backHistory()
			}
		}else {
			navigator.app.backHistory()
		}
	}, false);


	if($.mobile.activePage.is('#page')){
		try{
			pushNotification = window.plugins.pushNotification;
			if (device.platform == 'android' || device.platform == 'Android') {
				console.log("android device init()");
				pushNotification.register(successHandler, errorHandler, {
					"senderID" : "281299864959",
					"ecb" : "onNotificationGCM"
				}); // required!
			} else {
				console.log("iOS device init()")
				pushNotification.register(tokenHandler, errorHandler, {
					"badge" : "true",
					"sound" : "true",
					"alert" : "true",
					"ecb" : "onNotificationAPN"
				}); // required!
			}
		}catch (err){
			txt = "There was an error on this page.\n\n";
			txt += "Error description: " + err.message + "\n\n";
			alert(txt);
		}
	}
};

//result contains any error description text returned from the plugin call
function tokenHandler(result) {
	console.log("iOS pushing TokenHandler");
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
}
function successHandler(result) {
	console.log("Success");
}
function errorHandler(error) {
	console.log("error");
}


// iOS
function onNotificationAPN(event) {
	if (event.alert) {
		navigator.notification.alert(event.alert);
	}
	if (event.sound) {
		var snd = new Media(event.sound);
		snd.play();
	}
	if (event.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler,
				errorHandler, event.badge);
	}
}

// Android
function onNotificationGCM(e) {
	console.log("NotificationOn");

	switch (e.event){
	case 'registered':
		if (e.regid.length > 0){
			console.log("regID = " + e.regid);
			$("#page").trigger("testingEvent",[e.regid]);
		}break;

	case 'dialog':

		navigator.notification.vibrate(500);
		navigator.notification.beep(1);
		navigator.notification.confirm(
				e.dialog, 
				function(i){
					if(i == 2){
						sessionStorage.setItem("sno",e.data);
						location.href="../eger3/index.html";
					}
				},
				'상점:'+e.data2,
				'다음에 확인하기,지금 바로가기'       
		);
		break;

	case 'message':
		// if this flag is set, this notification happened while we were in the foreground.
		// you might want to play a sound to get the user's attention, throw up a dialog, etc.
		if (e.foreground){
			navigator.notification.vibrate(500);
			navigator.notification.beep(1);
			Toast.shortshow(e.message);
		}else{ // otherwise we were launched because the user touched a notification in the notification tray.
			if (e.coldstart) {
				console.log('2--COLDSTART NOTIFICATION--');

			} else {
				console.log('3--BACKGROUND NOTIFICATION--');
			}
		}break;

	case 'error':
		console.log("error");
		break;

	default:
		console.log("..... cannot");
	break;
	}
};


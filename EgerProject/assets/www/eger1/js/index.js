var loginInfo = "";
$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	$.getJSON(window.serverAddress + "eger1/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
			
			console.log(loginInfo.barcode+": eger1----------barcode");
			console.log(loginInfo.cdevice+": eger1----------cdevice");
			if (loginInfo.barcode != undefined) {
				$("#barcodeimg2").attr("src",serverAddress+"/file/barcode/"+loginInfo.barcode+".png");
				$("#barcodeno").text(loginInfo.barcode);
			} else {
				$("#barcodeimg2").attr("src", "images/test01.png");
			};
		} else {
			Toast.shortshow("로그인을 확인해주세요.");
			setTimeout(function(){
				location.href = "../auth/login.html";
			},2000);
		};
	
	});

	init();
	$('#modalClose').touchend(function (e) {
		location.href = "index.html";
	});       
	$('#mask').touchend(function () {  
		location.href = "index.html";
	});  
	$("#headerSearch").touchend(function(event) {
		location.href = "../eger4/index.html";
	});
	$("#headerEger").touchend(function(event) {
		location.href = "index.html";
	});
	$("#headerUser").touchend(function(event) {
		location.href = "../eger3/index.html";
	});


	function init() {
		var mouseEventTypes = {
				touchstart : "mousedown",
				touchmove : "mousemove",
				touchend : "mouseup"
		};

		for (originalType in mouseEventTypes) {
			document.addEventListener(originalType, function(originalEvent) {
				if(originalEvent.type == 'click')
					return;
				if (originalEvent.type != 'touchstart' && originalEvent.type !='touchend'){
					originalEvent.preventDefault();
				}
				event = document.createEvent("MouseEvents");
				touch = originalEvent.changedTouches[0];
				event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
						window, 0, touch.screenX, touch.screenY, touch.clientX,
						touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
						touch.metaKey, 0, null);
				originalEvent.target.dispatchEvent(event);
				event.preventDefault();         
			});
		}
	}







	$( "#swipeTopAction" ).draggable({
		revert: true ,
		axis: "y"
	});
	$( "#mainClickImgDiv" ).droppable({
		accept: "#swipeTopAction",
		greedy: true,
		activeClass: "dotlineClass",
		drop: handleDropEvent,
		over: handleHoverEvent
	});

	function handleDropEvent(event) {
		$("#swipeTopAction").css("display","none");
		var maskHeight = $(document).height();  
		var maskWidth = $(window).width();
		$('#mask').css({'width':maskWidth,'height':maskHeight});  
		$('#mask').fadeIn(1000);      
		$('#mask').fadeTo("slow",0.7);
		$("#dragModal").dialog();
	}
	function handleHoverEvent(event) {
		$('#mainClickImgDiv').append($("<img>").attr("src","images/hoverlogoCard.png"));
	}

	$(function() {
		setInterval(function(){
			var active = $('#mainClickImgDiv img.active');
			if ( active.length == 0 ) active = $('#mainClickImgDiv img:last');
			var next =  active.next().length ? active.next(): $('#mainClickImgDiv img:first');
			active.addClass('last-active');
			next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 1500, function() {
				active.removeClass('active last-active');
			});
		}, 2000 );
	});
	$(function() {
		setInterval(function(){
			var active = $('#slidearrowshow img.active');
			if ( active.length == 0 ) active = $('#slidearrowshow img:last');
			var next =  active.next().length ? active.next(): $('#slidearrowshow img:first');
			active.addClass('last-active');
			next.css({opacity: 0.0}).addClass('active').animate({opacity:1.0}, 400, function() {
				active.removeClass('active last-active');
			});
		},500 );
	});


	$(function myStoreList(){
		var x =0;
		var y =0;
		navigator.geolocation.getCurrentPosition(function(position){
			x = position.coords.latitude;
			y = position.coords.longitude;
			$.get(window.serverAddress + "eger1/myStoreList.do?x="+x+"&y="+y, function(result) {
				if(result.status == "success") {
					var list = result.data;
					$("#aroundStoreListDIV").children("div:gt(0)").remove();
					for(var i = 0; i < list.length ; i+=2){
						$("#aroundStoreListDIVTo").clone().attr("id","aroundStoreListDIVTo"+i).css("display","")
						.addClass("storeViewMode").appendTo($("#aroundStoreListDIV"));
						$("#aroundStoreListDIVTo"+i).find("#aroundStoreListLeft").addClass("findSno").attr("sno",list[i].sno);
						$("#aroundStoreListDIVTo"+i).find("#aroundStoreLeftIMG").css("background-image","url("+serverAddress+"/file/store/"+list[i].sppath+ ")").css("background-size","cover");
						$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftName").text(list[i].sname);
						$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftAddress").text(list[i].s_address.substr(10, 8));
						$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftIntro").text(list[i].scontent);
						$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftEtime").text(list[i].stime);

						if(list[i+1] != undefined ){
							$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").addClass("findSno").attr("sno",list[i+1].sno);
							$("#aroundStoreListDIVTo"+i).find("#aroundStoreRightIMG").css("background-image","url("+serverAddress+"/file/store/"+list[i+1].sppath+ ")").css("background-size","cover");
							$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightName").text(list[i+1].sname);
							$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightAddress").text(list[i+1].s_address.substr(10, 8));
							$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightIntro").text(list[i+1].scontent);
							$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightEtime").text(list[i+1].stime);
						}else{
							$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").remove();
						};
					};
				}else {
					Toast.shortshow("실행중 오류발생!");
				};
			});
		});
	});


	$("#storeListContent").on('click','.findSno', function() {
		var that = this;
		var thatsno = $(that).attr("sno");
		navigator.notification.confirm(
		        "정말 여기로 회원카드를 보내시겠습니까?", 
		         function(i){
		        	if(i == 2){
		        		$.get(window.serverAddress + "eger1/NaverApi.do?sno="+thatsno, function(result) {
							if(result.status == "success") {
								navigator.notification.vibrate(500);
								navigator.notification.beep(1);
								setTimeout(function(){
									location.href = "index.html";
								},500);
							}else {
								navigator.app.backHistory()
							};
						});
		        	}
		        },'Eger회원카드보내기',
		        '취소,보내기'       
		    );
});

	

});
function AppContext() {
	var objMap = {};

	this.addObject = function(name, obj) {
		objMap[name] = obj;
	};

	this.getObject = function(name) {
		return objMap[name];
	};
}
window.appContext = new AppContext();

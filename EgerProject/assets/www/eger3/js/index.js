$(document).ready(function() {
	var loginInfo ="";
	document.addEventListener("deviceready", onDeviceReady, false);
	$.getJSON(window.serverAddress + "eger1/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;

			var sno = sessionStorage.getItem("sno");
			if(sno != undefined){
				sessionStorage.removeItem("sno");
				storeview(sno);
			}
		} else {
			Toast.shortshow("로그인을 다시 해주세요.");
			setTimeout(function(){
				location.href = "../auth/login.html";
			},3000);
		}
	});

	$(myStoreList());
	$("#noCoupon").css("display","none");
	$("#mycouponDIVTo").css("display", "none");

	// 스크롤 맨위로
	$('#scrollFixed').touchend(function(){
		$('html, body').animate( {scrollTop:0} );
	});

	$("#headerSearch").touchend(function(event) {
		location.href = "../eger4/index.html";
	});
	$("#headerEger").touchend(function(event) {
		location.href = "../eger1/index.html";
	});
	$("#headerUser").touchend(function(event) {
		location.href = "index.html";
	});

	$("#footeraction2").touchend(function(event) {
		location.href = "../eger2/index.html";
	});
	$("#footeraction3").touchend(function(event) {
		location.href = "index.html";
	});
	$("#setting").touchend(function(event) {
		location.href = "../set/index.html";
	});


	$("#page3").on("swipeleft", function(event){
		location.href = "../eger2/index.html";
	});
	$("#page3").on("swiperight", function(event){
		location.href = "../eger1/index.html";
	});


	$("#gomymileage").touchend( function() {
		$("#mymileage").css("display", "block");
		$("#mystamp").css("display", "none");
		$("#mycouponDIVTo").css("display", "none");
		$("#myCouponBar").css("display", "none");
		$("#noCoupon").css("display","none");
	});
	$("#gomystamp").touchend( function() {
		$("#mystamp").css("display", "block");
		$("#mymileage").css("display", "none");
		$("#mycouponDIVTo").css("display", "none");
		$("#myCouponBar").css("display", "none");
		$("#noCoupon").css("display","none");
	});
	$("#gogomycoupone").touchend( function() {
		$("#myCouponBar").css("display", "block");
		$("#mycouponDIVTo").css("display", "block");
		$("#noCoupon").css("display","block");
		$("#mymileage").css("display", "none");
		$("#mystamp").css("display", "none");
	});


	$("#storeNameSearch").touchend( function() {
		$.post(window.serverAddress + "eger3/storesearch.do",
				{
			inputsname: $("#search-basic").val()
				},
				function(result) {
					if(result.status === "success") {
						var list = result.data;
						storelistAllView(list);
					} else {
						console.log("가게검색 실패");
					};
				},
		"json");
	});


	function myStoreList(){
		$.get(window.serverAddress + "eger3/myStoreList.do", function(result) {
			if(result.status == "success") {
				var list = result.data;
				storelistAllView(list);
			}else {
				$("#noStore").css("display","block");
				console.log("등록된 가게 없음");
				console.log(result.data);
			}
		});
	};


	function storelistAllView(list){
		$("#aroundStoreListDIV").children("div:gt(0)").remove();
		for(var i = 0; i < list.length; i+=2){
			$("#aroundStoreListDIVTo").clone().attr("id","aroundStoreListDIVTo"+i).css("display","")
			.addClass("storeViewMode").appendTo($("#aroundStoreListDIV"));
			$("#aroundStoreListDIVTo"+i).find("#aroundStoreListLeft").addClass("findSno").attr("sno",list[i].sno);
			$("#aroundStoreListDIVTo"+i).find("#aroundStoreLeftIMG").attr("src",serverAddress+"/file/store/"+list[i].sppath);
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftName").text(list[i].sname
					+" "+list[i].s_address.substr(10, 2)+"지점");
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftIntro").text(list[i].scontent);
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftEtime").text(list[i].stime);
			if( (list[i].mileage.card_mileAge_rate + list[i].mileage.cash_mileAge_rate) > 0){
				$("#aroundStoreListDIVTo"+i).find("#mileageIMG").attr("src","images/cash.png");
				$("#aroundStoreListDIVTo"+i).find("#mileageStack").text(list[i].stackmileage + "원");
			}else{
				$("#aroundStoreListDIVTo"+i).find("#mileageIMG").attr("src","images/nocash.png");
				$("#aroundStoreListDIVTo"+i).find("#mileageStack").text("X원").css("color","#BDBDBD");
			}
			if(list[i].stamp.length > 0){
				$("#aroundStoreListDIVTo"+i).find("#stampIMG").attr("src","images/stamp.png");
				$("#aroundStoreListDIVTo"+i).find("#stampStack").text(list[i].stackstamp + "개");
			}else{
				$("#aroundStoreListDIVTo"+i).find("#stampIMG").attr("src","images/nostamp.png");
				$("#aroundStoreListDIVTo"+i).find("#stampStack").text("X개").css("color","#BDBDBD");
			}
			if(list[i].couponCount > 0) {
				$("#aroundStoreListDIVTo"+i).find("#couponIMG").attr("src","images/coupon.png");
				$("#aroundStoreListDIVTo"+i).find("#couponStack").text(list[i].couponCount + "장");
			}else{
				$("#aroundStoreListDIVTo"+i).find("#couponIMG").attr("src","images/nocoupon.png");
				$("#aroundStoreListDIVTo"+i).find("#couponStack").text("X장").css("color","#BDBDBD");
			}
			if(list[i+1] != undefined ){
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").addClass("findSno").attr("sno",list[i+1].sno);
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreRightIMG").attr("src",serverAddress+"/file/store/"+list[i+1].sppath);
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightName").text(list[i+1].sname
						+" "+list[i+1].s_address.substr(10, 2)+"지점");
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightIntro").text(list[i+1].scontent);
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightEtime").text(list[i+1].stime);
				if( (list[i+1].mileage.card_mileAge_rate + list[i+1].mileage.cash_mileAge_rate) > 0){
					$("#aroundStoreListDIVTo"+i).find("#mileageIMGRight").attr("src","images/cash.png");
					$("#aroundStoreListDIVTo"+i).find("#mileageStackRight").text(list[i+1].stackmileage + "원");
				}else{
					$("#aroundStoreListDIVTo"+i).find("#mileageIMGRight").attr("src","images/nocash.png");
					$("#aroundStoreListDIVTo"+i).find("#mileageStackRight").text("X원").css("color","#BDBDBD");
				}
				if(list[i+1].stamp.length > 0){
					$("#aroundStoreListDIVTo"+i).find("#stampIMGRight").attr("src","images/stamp.png");
					$("#aroundStoreListDIVTo"+i).find("#stampStackRight").text(list[i+1].stackstamp + "개");
				}else{
					$("#aroundStoreListDIVTo"+i).find("#stampIMGRight").attr("src","images/nostamp.png");
					$("#aroundStoreListDIVTo"+i).find("#stampStackRight").text("X개").css("color","#BDBDBD");
				}
				if(list[i+1].couponCount > 0) {
					$("#aroundStoreListDIVTo"+i).find("#couponIMGRight").attr("src","images/coupon.png");
					$("#aroundStoreListDIVTo"+i).find("#couponStackRight").text(list[i+1].couponCount + "장");
				}else{
					$("#aroundStoreListDIVTo"+i).find("#couponIMGRight").attr("src","images/nocoupon.png");
					$("#aroundStoreListDIVTo"+i).find("#couponStackRight").text("X장").css("color","#BDBDBD");
				}
			}else{
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").remove();
			}
		};
	};


	$("#storeListContent").on('click', '.findSno', function() {
		storeview($(this).attr("sno"));
	});		

	function storeview(sno){
		$("#viewScreenmode").css("display", "");
		$("#storeListContent").css("display", "none");
		$("#storeNameSearchBTN").css("display","none");
		$("#storeNameSearchDIV").css("display","none");
		$.getJSON(window.serverAddress + "eger3/myStoreview.do?sno="+sno, function(result) {
			if (result.status == "success") {
				list = result.data2;
				event= result.data3;
				stamp = result.data4;
				$("#viewScreenmode").find("#myStoreCoupon").text(event.length);
				$("#myStoreStamp").text(result.data.stackstamp);
				$("#myStoreMileage").text(result.data.stackmileage);
				if(list.length > 0) {
					$.each(list, function(i) {
						$("#ChangeMileage").clone().attr("id","ChangeMileage"+i)
						.css("display","").appendTo($("#ChangeMileageTo"));
						var mile = "적립";
						if(list[i].changemile < 0 ){
							mile = "사용";
							$("#ChangeMileage"+i).find("td:eq(0)").html(  
									"<img src='images/minus.png' style='width:20px;'>"
									+ -(list[i].changemile));
						}else{
							$("#ChangeMileage"+i).find("td:eq(0)").html(
									"<img src='images/plus.png' style='width:20px;'>"
									+ list[i].changemile);
						}
						$("#ChangeMileage"+i).find("th").text(mile);
						$("#ChangeMileage"+i).find("td:eq(1)").text(list[i].mile_reg_date);
					});
				} else {
					$("#noMileage").clone().attr("id","noMileage"+i).css("display","")
					.appendTo($("#noMileageTo"));
					$("#noMileage"+i).find("td").text("적립금이 없습니다.").attr("colspan","3");
				}

				var maxStamp = stamp[0].stamp_rate;
				for(var i in stamp){
					if(maxStamp < stamp[i].stamp_rate){
						maxStamp = stamp[i].stamp_rate;
					}
				}

				$("#stackStampTotal").val("Total :"+result.data.stackstamp);
				for(var a = 0; a < result.data.stackstamp; a++) {

					if(stamp[0].stamp_level == 3 ){
						if(stamp.length>0 && stamp[0].stamp_rate != 0 && stamp[0].stamp_rate-1 == a ){
							$("#stampImages").append($("<img>").attr("src","images/CouponeStamp.jpg")
									.addClass("stampToCoupone").attr("stamp_rate",stamp[0].stamp_rate)
									.attr("scno",result.data.scno));
						}else if(stamp.length>1 && stamp[1].stamp_rate != 0 && stamp[1].stamp_rate-1 == a ){
							$("#stampImages").append($("<img>").attr("src","images/CouponeStamp.jpg")
									.addClass("stampToCoupone").attr("stamp_rate",stamp[1].stamp_rate)
									.attr("scno",result.data.scno));
						}else if(stamp.length>2 && stamp[2].stamp_rate != 0 && stamp[2].stamp_rate-1 == a ){
							$("#stampImages").append($("<img>").attr("src","images/CouponeStamp.jpg")
									.addClass("stampToCoupone").attr("stamp_rate",stamp[2].stamp_rate)
									.attr("scno",result.data.scno));
						}else{
							$("#stampImages").append($("<img>").attr("src","images/madeStamp.png"));
						}
					}else{
						$("#stampImages").append($("<img>").attr("src","images/madeStamp.png"));
					}
				}

				if(stamp.length != 0) {
					for(var a = 0; a < maxStamp - result.data.stackstamp; a++) {
						$("#stampImages").append($("<img>").attr("src","images/madeStamp2.png"));
					}
				} else {
					$("#noStamp").text("발급받은 스탬프가 없습니다.");
				}
				for(var i = 0; i < result.data.length; i+=2){
					$("#viewScreenmode").find("#myStoreIMG").attr("src",serverAddress+"/file/store/"+result.data[i].sppath);
					$("#viewScreenmode").find("#myStoreName").text(result.data[i].sname);
					$("#viewScreenmode").find("#myStoreAddress").text(result.data[i].s_address.substr(10, 2)+"지점");
					if(event[i+1] != undefined){
						$("#viewScreenmode").find("#myStoreIMG").attr("src",serverAddress+"/file/store/"+result.data[i+1].sppath);
						$("#viewScreenmode").find("#myStoreName").text(result.data[i+1].sname);
						$("#viewScreenmode").find("#myStoreAddress").text(result.data[i+1].s_address.substr(10, 2)+"지점");
					}
				}

				if (event.length != 0) {
					for(var i = 0; i < event.length; i+=2){
						$("#mycouponLeft").clone().attr("id","mycouponLeft"+i).css("display","")
						.addClass("couponeViewMode").appendTo($("#mycouponDIVTo"));
						$("#mycouponLeft"+i).find("#couponNameLeft").text(event[i].econtent);
						$("#mycouponLeft"+i).find("#couponeExpiryDateLeft").text(event[i].etime);
						$("#viewScreenmode").find("#myStoreIMG").attr("src",serverAddress+"/file/store/"+event[i].sppath);
						$("#viewScreenmode").find("#myStoreName").text(event[i].sname);
						$("#viewScreenmode").find("#myStoreAddress").text(event[i].s_address.substr(10, 2)+"지점");
						if(event[i+1] != undefined){
							$("#mycouponRight").clone().attr("id","mycouponRight"+[i+1]).css("display","")
							.addClass("couponeViewMode").appendTo($("#mycouponDIVTo"));
							$("#mycouponRight"+[i+1]).find("#couponNameRight").text(event[i+1].econtent);
							$("#mycouponRight"+[i+1]).find("#couponeExpiryDateRight").text(event[i+1].etime);
							$("#viewScreenmode").find("#myStoreIMG").attr("src",serverAddress+"/file/store/"+event[i+1].sppath);
							$("#viewScreenmode").find("#myStoreName").text(event[i+1].sname);
							$("#viewScreenmode").find("#myStoreAddress").text(event[i+1].s_address.substr(10, 2)+"지점");
						}
					}
				} else {
					$("#noCoupon").text("발급받은 쿠폰이 없습니다.");
				}
			} else {
				Toast.shortshow("실행중 오류발생!");
				console.log(result.data);
			};
		});
	}



	$("#stampImages").on('click', '.stampToCoupone', function() {
		var stamp_rate = $(this).attr("stamp_rate");
		var scno = $(this).attr("scno");
		navigator.notification.confirm(
				"정말 스탬프를 쿠폰으로 등록하시겠습니까?", 
				function(i){
					if(i == 2){
						$.getJSON(window.serverAddress + "eger3/stampToEvent.do?scno="+scno+"&stamp_rate="+stamp_rate, function(result) {
							if(result.status == "success") {
								Toast.shortshow("등록되었습니다");
								setTimeout(function(){
									location.href="index.html";
								},1000);
							} else {
								Toast.shortshow("취소되었습니다.");
							}
						});
					}
				},
				'선택한스탬프:'+stamp_rate+"개",
				'취소하기,등록하기'       
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


var loginInfo="";
$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	$.getJSON(window.serverAddress + "eger1/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
		} else {
				Toast.shortshow("로그인을 확인해주세요");
			setTimeout(function(){
				location.href = "../auth/login.html";
			},3000);
		}
	});

	$(myCouponeList());

	
	
	$("#chatFixed").click(function(){
		location.href = "../chat/index.html";
	})
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
		location.href = "index.html";
	});
	$("#footeraction3").touchend(function(event) {
		location.href = "../eger3/index.html";
	});
	$("#setting").touchend(function(event) {
		location.href = "../set/index.html";
	});

	$("#allStoreListDiv").on("swipeleft", function(event){
		location.href = "../set/index.html";
	});
	$("#allStoreListDiv").on("swiperight", function(event){
		location.href = "../eger3/index.html";
	});

	$("#clearStarBTN1").touchend(function(){
		$("#star0").css("display","none");
		$("#star1").css("display","block");
		$("#star2").css("display","none");
		$("#star3").css("display","none");
		$("#star4").css("display","none");
		$("#star5").css("display","none");
		$("#starScoreClear").css("display","none");
		$("#starScoreDelete").css("display","block");
		$("#starScore").text("1.0");
	});
	$("#clearStarBTN2").touchend(function(){
		$("#star0").css("display","none");
		$("#star1").css("display","none");
		$("#star2").css("display","block");
		$("#star3").css("display","none");
		$("#star4").css("display","none");
		$("#star5").css("display","none");
		$("#starScoreClear").css("display","none");
		$("#starScoreDelete").css("display","block");
		$("#starScore").text("2.0");
	});
	$("#clearStarBTN3").touchend(function(){
		$("#star0").css("display","none");
		$("#star1").css("display","none");
		$("#star2").css("display","none");
		$("#star3").css("display","block");
		$("#star4").css("display","none");
		$("#star5").css("display","none");
		$("#starScoreClear").css("display","none");
		$("#starScoreDelete").css("display","block");
		$("#starScore").text("3.0");
	});
	$("#clearStarBTN4").touchend(function(){
		$("#star0").css("display","none");
		$("#star1").css("display","none");
		$("#star2").css("display","none");
		$("#star3").css("display","none");
		$("#star4").css("display","block");
		$("#star5").css("display","none");
		$("#starScoreClear").css("display","none");
		$("#starScoreDelete").css("display","block");
		$("#starScore").text("4.0");
	});
	$("#clearStarBTN5").touchend(function(){
		$("#star0").css("display","none");
		$("#star1").css("display","none");
		$("#star2").css("display","none");
		$("#star3").css("display","none");
		$("#star4").css("display","none");
		$("#star5").css("display","block");
		$("#starScoreClear").css("display","none");
		$("#starScoreDelete").css("display","block");
		$("#starScore").text("5.0");
	});
	$("#starScoreDelete").touchend(function(){
		$("#star0").css("display","block");
		$("#star1").css("display","none");
		$("#star2").css("display","none");
		$("#star3").css("display","none");
		$("#star4").css("display","none");
		$("#star5").css("display","none");
		$("#starScoreClear").css("display","block");
		$("#starScoreDelete").css("display","none");
		$("#starScore").text("0.0");
	});

	$("#gomycoupone").touchend(function() {
		$("#allStoreListDiv").css("display", "");
		$("#couponListContent").css("display", "");
		$("#couponUsedListContent").css("display", "none");
		$("#storeViewContent").css("display", "none");
	});

	$("#gomyusedcoupone").touchend(function() {
		$("#allStoreListDiv").css("display", "");
		$("#couponUsedListContent").css("display", "");
		$("#couponListContent").css("display", "none");
		$("#storeViewContent").css("display", "none");
	});


	function myCouponeList(){
		$.get(window.serverAddress + "eger2/mycouponelist.do", function(result) {
			if(result.status == "success") {
				
				var list = result.data;
				var list1=[];
				var list2=[];
				$.each(list, function(i){
					if(list[i].coupone_level==0){
						list1.push(list[i]);
					}else{
						list2.push(list[i]);
					}
				});
				
				$("#couponListContent").find("#CouponeSize").text(list1.length);
				$("#couponUsedListContent").find("#usedCouponeSize").text(list2.length);
				
				couponelistAllView(list1);
				couponelistUsedView(list2);
			}else {
				Toast.shortshow("실행중 오류발생!");
			};
		});
	};

	function couponelistAllView(list){
		$("#aroundStoreListDIV").children("div:gt(0)").remove();
		for(var i = 0; i < list.length; i+=2){
			$("#aroundStoreListDIVTo").clone().attr("id","aroundStoreListDIVTo"+i).css("display","")
			.addClass("storeViewMode").appendTo($("#aroundStoreListDIV"));
			$("#aroundStoreListDIVTo"+i).find("#storeCouponIMGLeft").attr("src",serverAddress+"/file/store/"+list[i].sppath);
//			$("#aroundStoreListDIVTo"+i).find("#storeCouponIMGLeft").attr("alt","사진이 없습니다");
			$("#aroundStoreListDIVTo"+i).find("#couponNameLeft").text(list[i].econtent);
			$("#aroundStoreListDIVTo"+i).find("#couponListStoreNameLeft").text(list[i].sname);
			$("#aroundStoreListDIVTo"+i).find("#couponListStoreAddressLeft").text(list[i].s_address.substr(10, 3)+"지점");
			if(list[i].e_coupone_level == 0){
				$("#aroundStoreListDIVTo"+i).find("#couponeExpiryDateLeft").text(list[i].e_reg_date+" ~ "+list[i].etime);
			}else{
				$("#aroundStoreListDIVTo"+i).find("#couponeExpiryDateLeft").text(list[i].etime);
			}
			$("#aroundStoreListDIVTo"+i).find("#btnCouponLeft").addClass("findSno").attr("sno",list[i].sno);

			if(list[i+1] != undefined){
				$("#aroundStoreListDIVTo"+i).find("#storeCouponIMGRight").attr("src",serverAddress+"/file/store/"+list[i+1].sppath);
//				$("#aroundStoreListDIVTo"+i).find("#storeCouponIMGRight").attr("alt","사진이 없습니다");
				$("#aroundStoreListDIVTo"+i).find("#couponNameRight").text(list[i+1].econtent);
				$("#aroundStoreListDIVTo"+i).find("#couponListStoreNameRight").text(list[i+1].sname);
				$("#aroundStoreListDIVTo"+i).find("#couponListStoreAddressRight").text(list[i+1].s_address.substr(10, 3)+"지점");
				if(list[i+1].e_coupone_level == 0){
					$("#aroundStoreListDIVTo"+i).find("#couponeExpiryDateRight").text(list[i+1].e_reg_date+" ~ "+list[i+1].etime);
				}else{
					$("#aroundStoreListDIVTo"+i).find("#couponeExpiryDateRight").text(list[i+1].etime);
				}
				$("#aroundStoreListDIVTo"+i).find("#btnCouponRight").addClass("findSno").attr("sno",list[i+1].sno);
			}else{
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").remove();
			}
		};
	};


	function couponelistUsedView(list){
		$("#UsedCouponeListDIV").find("tbody tr:gt(0)").remove();
		$.each(list, function(i){
			$("#UsedCouponeListDIVTo").clone().attr("id","UsedCouponeListDIVTo"+i).css("display","")
			.addClass("storeViewMode").appendTo($("#UsedCouponeListDIV"));
			$("#UsedCouponeListDIVTo"+i).find("td:eq(0)").text(list[i].econtent);
			$("#UsedCouponeListDIVTo"+i).find("td:eq(1)").text(list[i].sname + "(" + list[i].s_address.substr(10, 2) + ")");
			$("#UsedCouponeListDIVTo"+i).find("td:eq(2)").text(list[i].coupone_usedate);
		});
		$("#UsedCouponeListDIV").children("div:gt(0)").remove();
	};


	$("#allStoreListDiv").on('click','.findSno', function() {
		var that = this;
		var thatsno = $(that).attr("sno");
		$("#usedORnewCoupon").css("display","none");

		$(storeMemberCheck(thatsno));
		$(storeview(thatsno));
		$("#myStoreAddBTN").touchend( function(event) {
			$(storeadd(thatsno));
		});

		$("#feedAddBTN").touchend( function() {
			$(feedadd(thatsno));
		});
	});


	function storeMemberCheck(thatsno) {
		$.get(window.serverAddress + "eger4/storeMemberCheck.do?barcode="+ loginInfo.barcode + "&sno=" + thatsno, function(result) {
			if(result.status == "success") {
				$("#myStoreAddBTN").css("display","none");
				$("#myStoreAddBTN2").css("display","block");
			};
		});
	}

	function storeview(thatsno){
		$.get(window.serverAddress + "eger4/storeview.do?sno="+thatsno, function(result) {
			if(result.status == "success") {
				$("#allStoreListDiv").css("display", "none");
				$("#storeViewContent").css("display", "");
				var event = result.data.event;
				$("#storeViewIMG").attr("src",serverAddress+"/file/store/"+result.data.sppath);
				$("#storeViewName").text(result.data.sname +" "+result.data.s_address.substr(10, 2)+"지점");
				$("#storeViewMileageCash").text(result.data.mileage.cash_mileAge_rate);
				$("#storeViewMileageCard").text(result.data.mileage.card_mileAge_rate);
				var a = 0;
				var b = 0;
				if(event.length > 0){
					$("#storeCouponeTable").find("tr:gt(0)").remove();
					$("#storeStampTable").find("tr:gt(0)").remove();
					$.each(event, function(i){
						if(event[i].e_coupone_level == 0){
							if(a == 0){
								$("#storeCouponeTable").find("tr:eq(0)")
								.find("td").text(event[i].econdition+", " + event[i].econtent);
							} else {
								$("#storeCouponeTable")
								.append($("<tr>")
										.append($("<th>"))
										.append($("<td>")
												.append($("<span>").text(event[i].econdition+", "))
												.append($("<span>").text(event[i].econtent))));
							}
							a += 1;
						} else {
							if(b == 0){
								$("#storeStampTable").find("tr:eq(0)")
								.find("td").text(event[i].econdition+"개당 " + event[i].econtent);
							} else {
								$("#storeStampTable")
								.append($("<tr>")
										.append($("<th>"))
										.append($("<td>")
												.append($("<span>").text(event[i].econdition+"개당 "))
												.append($("<span>").text(event[i].econtent))));
							}
							b += 1;
						}
					});
				}
				if(a==0){
					$("#storeCouponeTable").find("tr:eq(0)").find("td").text("없음");
				}
				if(b==0){
					$("#storeStampTable").find("tr:eq(0)").find("td").text("없음");
				};
				$("#storeInfoTable").find("tr:eq(0)").find("td")
				.append($("<div>").css("width","100%")
						.append($("<span>").css("white-space","normal").text(result.data.scontent)));
				$("#storeInfoTable").find("tr:eq(1)").find("td").text(result.data.stime);
				$("#storeInfoTable").find("tr:eq(2)").find("td").text(result.data.stel);
				$("#storeInfoTable").find("tr:eq(3)").find("td").text(result.data.s_address);


				//naver api
//				var oSeoulCityPoint = new nhn.api.map.LatLng(resultx, resulty);
//				var defaultLevel = 11;
//				var oMap = new nhn.api.map.Map(document.getElementById('map'), {
//				point : oSeoulCityPoint,
//				zoom : defaultLevel,
//				enableWheelZoom : true,
//				enableDragPan : true,
//				enableDblClickZoom : false,
//				mapMode : 0,
//				activateTrafficMap : false,
//				activateBicycleMap : false,
//				minMaxLevel : [ 1, 14 ],
//				size : new nhn.api.map.Size(maskWidth,320)
//				});
//				var mapZoom = new nhn.api.map.ZoomControl();
//				mapZoom.setPosition({ left : 20, bottom : 20 });
//				oMap.addControl(mapZoom);
//				var oSize = new nhn.api.map.Size(28, 37);
//				var oOffset = new nhn.api.map.Size(14, 37);
//				var oIcon = new nhn.api.map.Icon(
//				'http://static.naver.com/maps2/icons/pin_spot2.png',
//				oSize, oOffset);
//				var oMarker1 = new nhn.api.map.Marker(oIcon, { title : result.data.sname });
//				oMarker1.setPoint(oSeoulCityPoint);
//				oMap.addOverlay(oMarker1);
//				var oLabel1 = new nhn.api.map.MarkerLabel();
//				oMap.addOverlay(oLabel1);
//				oLabel1.setVisible(true, oMarker1);

				//google api
				
				$("#map").children().remove();
				  var resultx = (result.data.xlocation);
				  var resulty = (result.data.ylocation);
					  var mapOptions = {
					    zoom: 14,
					    center: new google.maps.LatLng(resultx,resulty)
					  };
					  var map = new google.maps.Map(document.getElementById('map'),
					      mapOptions);

					  var marker = new google.maps.Marker({
					    position: map.getCenter(),
					    map: map,
					    title: 'Click to zoom'
					  });
					  google.maps.event.addListener(map, 'center_changed', function() {
					    window.setTimeout(function() {
					      map.panTo(marker.getPosition());
					    }, 3000);
					  });
					  google.maps.event.addListener(marker, 'click', function() {
					    map.setZoom(18);
					    map.setCenter(marker.getPosition());
					  });

				feedlist(result.data.sno);
			}else {
				Toast.shortshow("실행중 오류발생!");
			}
		});
	}


	function storeadd(thatsno){
		$.post(window.serverAddress + "eger4/storeadd.do",
				{
			sno: thatsno,
				},
				function(result) {
					if(result.status === "success") {
						Toast.shortshow("단골가게 등록이 완료되었습니다.");
						location.href = "index.html";
					} else {
						Toast.shortshow("이미 등록된 단골가게입니다.");
					};
				},
		"json");
	}


	function feedadd(thatsno){
		if($("#feedContent").val()!= ""){
			$.post(window.serverAddress + "eger4/feedadd.do",
					{
				sno: thatsno,
				fcontent: $("#feedContent").val(),
				fscore: $("#starScore").text()
					},
					function(result) {
						if(result.status == "success") {
							$("#feedContent").val("");
							$("#star0").css("display","");
							$("#star1").css("display","none");
							$("#star2").css("display","none");
							$("#star3").css("display","none");
							$("#star4").css("display","none");
							$("#star5").css("display","none");
							$("#starScoreClear").css("display","none");
							$("#starScoreDelete").css("display","none");
							$("#starScore").text("0.0");
							feedlist(thatsno);
						} else {
							Toast.shortshow("실행중 오류발생!");
						}
					},
			"json");
		}else{
			Toast.shortshow("내용을 입력해주세요.");
		};
	}


	$("#feedTableList").on('click','.feedTableListClass', function() {
		var that = this;
		$.getJSON(window.serverAddress + "eger4/feeddelete.do?fno="+$(that).attr("fno"), function(result) {
			if(result.status == "success") {
				Toast.shortshow("댓글이 삭제되었습니다.	");
				feedlist($(that).attr("sno"));
				
			} else {
				Toast.shortshow("실행중 오류발생!");
				console.log(result.data);
			}
		});
	});


	function feedlist(sno){
		$(feedscore(sno));
		$.get(window.serverAddress + "eger4/feedlist.do?sno="+sno, function(result) {
			if(result.status == "success") {
				var feedlist = result.data;
				$("#feedTableList").find(".feedTableListTo:gt(0)").remove();
				$.each(feedlist, function(i){
					$("#feedTableListTo").clone().attr("id","feedTableListTo"+i).css("display","").appendTo($("#feedTableList"));
					if(feedlist[i].barcode == null){
						$("#feedTableListTo"+i).find("#feedAddUser").attr("src","images/user_store.png");
					} else if(feedlist[i].barcode == loginInfo.barcode){
						$("#feedTableListTo"+i).find("#feedAddUser").attr("src","images/user_me.png");
					} else {
						$("#feedTableListTo"+i).find("#feedAddUser").attr("src","images/user_user.png");
					}

					$("#feedTableListTo"+i).find("#feedContent").text(feedlist[i].fcontent);

					if(feedlist[i].barcode == loginInfo.barcode){
						$("#feedTableListTo"+i).find("#feedRegdate").html(feedlist[i].freg_date);
						$("#feedTableListTo"+i).find("#feedDelete").attr("src","images/deletebutton.png")
						.attr("class","feedTableListClass").attr("sno",feedlist[i].sno)
						.attr("fno",feedlist[i].fno);
					}else{
						$("#feedTableListTo"+i).find("#feedRegdate").text(feedlist[i].freg_date);
					}

					var starScore = feedlist[i].fscore;
					if(starScore == 5){
						$("#feedTableListTo"+i).find("#userFeedStarScoreIMG").attr("src","images/star5.png");
					} else if(starScore >= 4){
						$("#feedTableListTo"+i).find("#userFeedStarScoreIMG").attr("src","images/star4.png");
					} else if(starScore >= 3){
						$("#feedTableListTo"+i).find("#userFeedStarScoreIMG").attr("src","images/star3.png");
					} else if(starScore >= 2){
						$("#feedTableListTo"+i).find("#userFeedStarScoreIMG").attr("src","images/star2.png");
					} else if(starScore >= 1){
						$("#feedTableListTo"+i).find("#userFeedStarScoreIMG").attr("src","images/star1.png");
					}
				});
			};
		});
	};


	function feedscore(sno) {
		$.get(window.serverAddress + "eger4/feedscore.do?sno="+sno, function(result) {
			if(result.status == "success") {
				var feedscore = result.data; // mapper에서 select id="feedscore", 상호의 평가점수를 리스트로 모두 가져옴.
				var count = 0; // 가져온 feedscore의 평점을 계산하기 위해 카운트 객체를 만듬.
				var sumScore = 0;
				for(var i in feedscore){
					count += 1; // for문 돌때마다 카운트 증가
					sumScore += feedscore[i].fscore; // 평점 합.
				}
				var number = (sumScore/count).toString().substring(0, 3); // 평점을 문자열로 바꾼뒤 3글자( (예)0.0 )로 출력
				// 평균점수를 상단에 표시
				if(number >= 4.6){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star5.png");
				} else if(number >= 4.1){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star45.png");
				} else if(number >= 3.6){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star4.png");
				} else if(number >= 3.1){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star35.png");
				} else if(number >= 2.6){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star3.png");
				} else if(number >= 2.1){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star25.png");
				} else if(number >= 1.6){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star2.png");
				} else if(number >= 1.1){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star15.png");
				} else if(number >= 1){
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star1.png");
				} else {
					$("#storeViewContent").find("#storeStarScoreIMG").attr("src","images/star0.png");
					$("#storeViewContent").find("#storeStarScore").text("0.0");
				}
				if(count > 0){
					$("#storeViewContent").find("#storeStarScore").text(number);
				}
			};
		});
	}

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

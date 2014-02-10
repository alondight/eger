var loginInfo="";
$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	$.getJSON(window.serverAddress + "eger1/loginInfo.do", function(result) {
		if(result.status == "success") {
			loginInfo = result.data;
		} else {
			Toast.shortshow("로그인을 다시 해주세요.");
			setTimeout(function(){
				location.href = "../auth/login.html";
			},3000);
		}
	});
	
	$(storelist());
	$("#headerSearch").touchend(function(event) {
		location.href = "index.html";
	});
	$("#headerEger").touchend(function(event) {
		location.href = "../eger1/index.html";
	});
	$("#headerUser").touchend(function(event) {
		location.href = "../eger3/index.html";
	});
	
	$('#scrollFixed').touchend(function(){
		$('html, body').animate( {scrollTop:0} );
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

	// 평가취소(문의하기로 변환)
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


	$("#storeNameSearch").touchend( function() {
		$.post(window.serverAddress + "eger4/storesearch.do",
				{
			inputsname: $("#search-basic").val()
				},
				function(result) {
					if(result.status === "success") {
						$("#storeViewContent").css("display", "none");
						$("#storeListContent").css("display", "");
						var list = result.data;
						storelistAllView(list);
					} else {
						console.log("가게검색 실패");
					};
				},
		"json");
	});

	
	$('#eger4SelectPosition').change(function(){
		if($("#select-choiceall-2 option:selected").val() != 0 &&
				$("#select-choiceall-1 option:selected").val() != 0){
			categoryAndZoneSelect(
					$("#select-choiceall-2 option:selected").val(),
					$("#select-choiceall-1 option:selected").val());
		};
		if($("#select-choiceall-2 option:selected").val() != 0 &&
				$("#select-choiceall-1 option:selected").val() == 0){
			categorySelect($("#select-choiceall-2 option:selected").val());
		}
		if($("#select-choiceall-1 option:selected").val() != 0 &&
				$("#select-choiceall-2 option:selected").val() == 0){
			zoneSelect($("#select-choiceall-1 option:selected").val());
		}
		if($("#select-choiceall-2 option:selected").val() == 0 && 
				$("#select-choiceall-1 option:selected").val() == 0){
			storelist();
		};
	});

	
	var categorySelect=( function(categorySelect) {
		$.post(window.serverAddress + "eger4/categoryselect.do",
				{
			cateno: categorySelect
				},
				function(result) {
					if(result.status == "success") {
						$("#storeViewContent").css("display", "none");
						$("#storeListContent").css("display", "");
						var list = result.data;
						storelistAllView(list); 
					} else {
						Toast.shortshow("실행중 오류발생!");
					}
				},
		"json");
	});

	
	var zoneSelect=( function(zoneSelect) {
		$.post(window.serverAddress + "eger4/zoneselect.do",
				{
			zoneName: zoneSelect
				},
				function(result) {
					if(result.status == "success") {
						$("#storeViewContent").css("display", "none");
						$("#storeListContent").css("display", "");
						var list = result.data;
						storelistAllView(list); 
					} else {
						Toast.shortshow("실행중 오류발생!");
					}
				},
		"json");
	});

	
	var categoryAndZoneSelect =( function(categorySelect,zoneSelect) {
		$.post(window.serverAddress + "eger4/categoryAndZoneSelect.do",
				{
			cateno: categorySelect,
			zoneName: zoneSelect
				},
				function(result) {
					if(result.status == "success") {
						$("#storeViewContent").css("display", "none");
						$("#storeListContent").css("display", "");
						var list = result.data;
						storelistAllView(list);
					} else {
						Toast.shortshow("실행중 오류발생!");
					}
				},
		"json");
	});
	
	
	$(function todayAddStoreList(){
		var x =0;
		var y =0;
		navigator.geolocation.getCurrentPosition(function(position){
			x = position.coords.latitude;
			y = position.coords.longitude;
			
			$.get(window.serverAddress + "eger4/todayAddStoreList.do?x="+x+"&y="+y, function(result) {
				if(result.status == "success") {
					var list = result.data;
					$.each(list, function(i) {
						$("#todayAddStore"+i).addClass("findSno").attr("sno",list[i].sno);
						$("#todayAddStoreIMG"+i).attr("src",serverAddress+"/file/store/"+list[i].sppath);
						$("#todayAddStoreSname"+i).text(list[i].sname);
						$("#todayAddStoreAddress"+i).text(list[i].s_address.substr(7,2)+"("+ list[i].s_address.substr(10,3)+")");
					});
				}else {
					Toast.shortshow("실행중 오류발생!");
				}
			});
		});
	});
	
	
	function storelist(){
		var x =0;
		var y =0;
		navigator.geolocation.getCurrentPosition(function(position){
			x = position.coords.latitude;
			y = position.coords.longitude;
			
			$.get(window.serverAddress + "eger4/storelist.do?x="+x+"&y="+y, function(result) {
				if(result.status == "success") {
					var list = result.data;
					storelistAllView(list);
				}else {
					Toast.shortshow("실행중 오류발생!");
				}
			});
		});
	};

	
	function storelistAllView(list){
		$("#aroundStoreListDIV").children("div:gt(0)").remove();
		
		for(var i = 0; i < list.length; i+=2){
			$("#aroundStoreListDIVTo").clone().attr("id","aroundStoreListDIVTo"+i).css("display","")
			.addClass("storeViewMode").appendTo($("#aroundStoreListDIV"));
			$("#aroundStoreListDIVTo"+i).find("#aroundStoreListLeft").addClass("findSno").attr("sno",list[i].sno);
			$("#aroundStoreListDIVTo"+i).find("#aroundStoreLeftIMG").attr("src",serverAddress+"/file/store/"+list[i].sppath);
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftName").text(list[i].sname);
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftAddress")
				.text(list[i].s_address.substr(10, 10) + list[i].s_detail_address);
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftEtime").text(list[i].stime);
			$("#aroundStoreListDIVTo"+i).find("#arroundStoreLeftIntro").text(list[i].scontent);
			
			if( (list[i].mileage.card_mileAge_rate + list[i].mileage.cash_mileAge_rate) > 0){
				$("#aroundStoreListDIVTo"+i).find("#mileageIMG").attr("src","images/cash.png");
			}else{
				$("#aroundStoreListDIVTo"+i).find("#mileageIMG").attr("src","images/nocash.png");
			}
			
			if(list[i].stamp.length > 0){
				$("#aroundStoreListDIVTo"+i).find("#stampIMG").attr("src","images/stamp.png");
				$("#aroundStoreListDIVTo"+i).find("#eventIMG").attr("src","images/coupon.png");
			} else {
				$("#aroundStoreListDIVTo"+i).find("#stampIMG").attr("src","images/nostamp.png");
				$("#aroundStoreListDIVTo"+i).find("#eventIMG").attr("src","images/nocoupon.png");
			}
			
			$("#aroundStoreListDIVTo"+i).find("#LeftfeedCount").text(list[i].feedcount);
			$("#aroundStoreListDIVTo"+i).find("#LeftmemberCount").text(list[i].membercount);
			
			var starScoreAvg = list[i].starScoreAvg;
				if(starScoreAvg >= 4.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star5.png");
				} else if(starScoreAvg >= 4.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star45.png");
				} else if(starScoreAvg >= 3.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star4.png");
				} else if(starScoreAvg >= 3.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star35.png");
				} else if(starScoreAvg >= 2.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star3.png");
				} else if(starScoreAvg >= 2.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star25.png");
				} else if(starScoreAvg >= 1.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star2.png");
				} else if(starScoreAvg >= 1.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star15.png");
				} else if(starScoreAvg >= 1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star1.png");
				} else {
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG").attr("src","images/star0.png");
				};
				

			if(list[i+1] != undefined ){
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").addClass("findSno").attr("sno",list[i+1].sno);
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreRightIMG").attr("src",serverAddress+"/file/store/"+list[i+1].sppath);
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightName").text(list[i+1].sname);
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightAddress")
					.text(list[i+1].s_address.substr(10, 10) + list[i+1].s_detail_address);
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightEtime").text(list[i+1].stime);
				$("#aroundStoreListDIVTo"+i).find("#arroundStoreRightIntro").text(list[i+1].scontent);
				
				if( (list[i+1].mileage.card_mileAge_rate + list[i+1].mileage.cash_mileAge_rate) > 0){
					$("#aroundStoreListDIVTo"+i).find("#mileageIMGRight").attr("src","images/cash.png");
				}else{
					$("#aroundStoreListDIVTo"+i).find("#mileageIMGRight").attr("src","images/nocash.png");
				}
				if(list[i+1].stamp.length > 0){
					$("#aroundStoreListDIVTo"+i).find("#stampIMGRight").attr("src","images/stamp.png");
					$("#aroundStoreListDIVTo"+i).find("#eventIMGRight").attr("src","images/coupon.png");
				}else{
					$("#aroundStoreListDIVTo"+i).find("#stampIMGRight").attr("src","images/nostamp.png");
					$("#aroundStoreListDIVTo"+i).find("#eventIMGRight").attr("src","images/nocoupon.png");
				}
				
				$("#aroundStoreListDIVTo"+i).find("#RightfeedCount").text(list[i+1].feedcount);
				$("#aroundStoreListDIVTo"+i).find("#RightmemberCount").text(list[i+1].membercount);
				
				var starScoreAvg = list[i+1].starScoreAvg;
				if(starScoreAvg >= 4.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star5.png");
				} else if(starScoreAvg >= 4.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star45.png");
				} else if(starScoreAvg >= 3.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star4.png");
				} else if(starScoreAvg >= 3.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star35.png");
				} else if(starScoreAvg >= 2.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star3.png");
				} else if(starScoreAvg >= 2.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star25.png");
				} else if(starScoreAvg >= 1.6){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star2.png");
				} else if(starScoreAvg >= 1.1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star15.png");
				} else if(starScoreAvg >= 1){
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star1.png");
				} else {
					$("#aroundStoreListDIVTo"+i).find("#aroundStoreStarScoreIMG_right").attr("src","images/star0.png");
				};
				
				
			} else {
				$("#aroundStoreListDIVTo"+i).find("#aroundStoreListRight").remove();
			}
			
		};
	};

	
	$("#storeListContent").on('click','.findSno', function() {
		var that = this;
		var thatsno = $(that).attr("sno");
		storeMemberCheck(thatsno);
		storeview(thatsno);
		$("#myStoreAddBTN").touchend( function(event) {
			storeadd(thatsno);
		});
		$("#feedAddBTN").touchend( function() {
			feedadd(thatsno);
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
	
	function storeview(thatsno) {
		$.get(window.serverAddress + "eger4/storeview.do?sno="+thatsno, function(result) {
			if(result.status == "success") {
				$("#storeListContent").css("display", "none");
				$("#storeViewContent").css("display", "");
				
				$("#chatFixed").click(function(){
					location.href = "../chat/index.html";
				})
				var event = result.data.event;
				$("#storeViewIMG").attr("src",serverAddress+"/file/store/"+result.data.sppath);
				$("#storeViewName").text(result.data.sname +" "+result.data.s_address.substr(10, 3)+"지점");
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
	function storeadd(thatsno) {
		$.post(window.serverAddress + "eger4/storeadd.do",
				{
			sno: thatsno
				},
				function(result) {
					if(result.status === "success") {
						Toast.shortshow("단골가게 등록이 완료되었습니다.");
						$("#myStoreAddBTN").css("display","none");
						$("#myStoreAddBTN2").css("display","");
						
					} else {
						Toast.shortshow("이미 등록된 단골가게입니다.");
					};
				},
		"json");
	}
	
	
	function feedadd(thatsno) {
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
				Toast.shortshow("댓글이 삭제되었습니다.");
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
				// 카운트가 0이면 평점 표시
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

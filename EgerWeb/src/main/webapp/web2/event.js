if (window.appContext.getObject("eventjs") == undefined) {
	console.log("event.js 로딩 완료");
	var eventjs = {
			init : function() {
				var that = this;

				that.checkMileage();
				that.loadStamp();
				that.loadCoupone();

//				마일리지등록 버튼
				$(".mileageadd").click( function() {
					var event = this;
					$.post("../event/mileageadd.do", 
							{
						cash_mileAge_rate: $('#cashmileage').val(),
						card_mileAge_rate: $('#cardmileage').val(),
						sno:loginInfo.sno
							},
							function(result) {
								if(result.status == "success") {
									alert("현금 " +$('#cashmileage').val() + "%, 카드 " + $('#cardmileage').val() + "%로 적립이벤트가 등록되었습니다." );
									$(event).trigger("event");
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								}
							},
					"json");
				});

				$("#mileagecheck").click(function(){
					if($("#mileagecheck").is(":checked")){
						$(".textbox").attr("disabled", false);
						$(".mileageadd").css("display", "");
						$(".lockmileageadd").css("display", "none");
					} else {
						$(".textbox").attr("disabled", true);
						$(".mileageadd").css("display", "none");
						$(".lockmileageadd").css("display", "");
					}
				});




				/*----------------------------------------------------------------------*/
				/* 혜택1 스탬프 체크시, 미체크시 텍스트박스 디스플레이 여부 */
				$("#checkstamp1").click(function() {
					if ($(this).is(":checked") == true) {
						$(".firststampNo").attr("disabled", false);
						$(".firststampContent").attr("disabled", false);
						$(".firststampdate").attr("disabled", false);

						$(".secondstampNo").attr("disabled", true).val("");
						$(".secondstampContent").attr("disabled", true).val("");
						$(".secondstampdate").attr("disabled", true).val("");

						$(".thirdstampNo").attr("disabled", true).val("");
						$(".thirdstampContent").attr("disabled", true).val("");
						$(".thirdstampdate").attr("disabled", true).val("");

						$(".dontChoose").css("display", "none");
						$(".Level1Choose").css("display", "");
						$(".Level2Choose").css("display", "none");
						$(".Level3Choose").css("display", "none");

					}
				});
				/*----------------------------------------------------------------------*/
				/* 혜택2 스탬프 체크시, 미체크시 텍스트박스 디스플레이 여부 */
				$("#checkstamp2").click(function() {
					if ($(this).is(":checked") == true) {
						$(".firststampNo").attr("disabled", true).val("");
						$(".firststampContent").attr("disabled", true).val("");
						$(".firststampdate").attr("disabled", true).val("");

						$(".secondstampNo").attr("disabled", false);
						$(".secondstampContent").attr("disabled", false);
						$(".secondstampdate").attr("disabled", false);

						$(".thirdstampNo").attr("disabled", true).val("");
						$(".thirdstampContent").attr("disabled", true).val("");
						$(".thirdstampdate").attr("disabled", true).val("");

						$(".dontChoose").css("display", "none");
						$(".Level1Choose").css("display", "none");
						$(".Level2Choose").css("display", "");
						$(".Level3Choose").css("display", "none");
					}
				});
				/*----------------------------------------------------------------------*/
				/* 혜택3 스탬프 체크시, 미체크시 텍스트박스 디스플레이 여부 */
				$("#checkstamp3").click(function() {
					if ($(this).is(":checked") == true) {
						$(".firststampNo").attr("disabled", true).val("");
						$(".firststampContent").attr("disabled", true).val("");
						$(".firststampdate").attr("disabled", true).val("");

						$(".secondstampNo").attr("disabled", true).val("");
						$(".secondstampContent").attr("disabled", true).val("");
						$(".secondstampdate").attr("disabled", true).val("");

						$(".thirdstampNo").attr("disabled", false);
						$(".thirdstampContent").attr("disabled", false);
						$(".thirdstampdate").attr("disabled", false);

						$(".dontChoose").css("display", "none");
						$(".Level1Choose").css("display", "none");
						$(".Level2Choose").css("display", "none");
						$(".Level3Choose").css("display", "");
					}
				});


				// 스탬프등록 버튼
				$(".Level1Choose").click( function() {
					var event = this;
					$.post("../event/Level1Choose.do", 
							{
						sno:loginInfo.sno,
						stamp_Rate: $('#firststampNo').val(),
						stamp_Content: $('#firststampContent').val(),
						stamp_start: $('#firststampdatestart').val(),
						stamp_end: $('#firststampdateend').val()
							},
							function(result) {
								if(result.status == "success") {
									$(event).trigger("event");
									alert( $('#firststampNo').val()+ "개당" + $('#firststampContent').val()
											+ "제공 이벤트가 등록되었습니다." + "(이벤트기간: " + $('#firststampdatestart').val() + " ~ " + $('#firststampdateend').val() + ")" );
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								}
							},
					"json");
				});

				$(".Level2Choose").click( function() {
					var event = this;
					$.post("../event/Level2Choose.do", 
							{
						sno:loginInfo.sno,
						stamp_Rate: $('#secondstampNo1').val(),
						stamp_Content: $('#secondstampContent1').val(),
						stamp_start: $('#secondstampdatestart1').val(),
						stamp_end: $('#secondstampdateend1').val(),
						stamp_Rate2: $('#secondstampNo2').val(),
						stamp_Content2: $('#secondstampContent2').val(),
						stamp_start2: $('#secondstampdatestart2').val(),
						stamp_end2: $('#secondstampdateend2').val(),
						stamp_Rate3: $('#secondstampNo3').val(),
						stamp_Content3: $('#secondstampContent3').val(),
						stamp_start3: $('#secondstampdatestart3').val(),
						stamp_end3: $('#secondstampdateend3').val()
							},
							function(result) {
								if(result.status == "success") {
									alert("순차 스탬프 이벤트가 등록되었습니다.");
									$(event).trigger("event");
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								}
							},
					"json");
				});
				$(".Level3Choose").click( function() {
					var event = this;
					$.post("../event/Level3Choose.do", 
							{
						sno:loginInfo.sno,
						stamp_Rate: $('#thirdstampNo1').val(),
						stamp_Content: $('#thirdstampContent1').val(),
						stamp_start: $('#thirdstampstartdate1').val(),
						stamp_end: $('#thirdstampenddate1').val(),
						stamp_Rate2: $('#thirdstampNo2').val(),
						stamp_Content2: $('#thirdstampContent2').val(),
						stamp_start2: $('#thirdstampstartdate2').val(),
						stamp_end2: $('#thirdstampenddate2').val(),
						stamp_Rate3: $('#thirdstampNo3').val(),
						stamp_Content3: $('#thirdstampContent3').val(),
						stamp_start3: $('#thirdstampstartdate3').val(),
						stamp_end3: $('#thirdstampenddate3').val()
							},
							function(result) {
								if(result.status == "success") {
									alert("선택 스탬프 이벤트가 등록되었습니다.");
									$(event).trigger("event");
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								}
							},
					"json");
				});		

				$(".dontChoose").css("display", "");
				$(".Level1Choose").css("display", "none");
				$(".Level2Choose").css("display", "none");
				$(".Level3Choose").css("display", "none");


				//			EVENT 등록버튼 클릭
				$(".couponeadd").click( function() {
					var event = this;
					$.post("../event/couponeadd.do", 
							{
						sno:loginInfo.sno,
						econtent: $('#couponeContent').val(),
						econdition: $('#couponeCondition').val(),
						etime: $('#couponeEndDate').val()
							},
							function(result) {
								if(result.status == "success") {
									alert("쿠폰 등록 이벤트가 등록되었습니다.");
									$(event).trigger("event");
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								};
							},
					"json");
				});



//				쿠폰 삭제버튼 클릭
				$("#coupones").on('click', '.deleteCoupone', function() {
					var event = this;
					$.getJSON("../event/delete.do?coupone_no="+$(this).attr("coupone_no"), function(result) {
						if(result.status == "success") {
							alert("쿠폰 이벤트가 삭제되었습니다.");
							$(event).trigger("event");
						} else {
							alert("실행중 오류발생!");
							console.log(result.data);
						};
					});
				});
			},
//			init()끝



//			마일리지 체크이벤트	
			checkMileage:function() {
				$.getJSON("../event/loadMileage.do?sno="+loginInfo.sno, function(result) {
					if(result.status == "success") {
						if(result.data.card_mileAge_rate != 0 || result.data.cash_mileAge_rate != 0){
							$(".textbox").attr("disabled", false);
							$("#mileagecheck").attr("checked", true);
							$("#cashmileage").val(result.data.cash_mileAge_rate);
							$("#cardmileage").val(result.data.card_mileAge_rate);
							$(".mileageadd").css("display", "block");
							$(".lockmileageadd").css("display", "none");

						}else{
							$(".textbox").attr("disabled", true);
							$(".mileageadd").css("display", "none");
							$(".lockmileageadd").css("display", "");
						}
					} else {
						alert("실행중 오류발생!");
						console.log(result.data);
					}
				});
			},




//			스탬프 체크이벤트	
			loadStamp:function() {
				$.getJSON("../event/loadStamp.do?sno="+loginInfo.sno, function(result) {
					if(result.status == "success") {
						if(result.data[0] != null ){
							switch(result.data[0].stamp_level)
							{
							case 1:
								$("#checkstamp1").attr("checked", true);
								$(".firststampNo").attr("disabled", false);
								$(".firststampContent").attr("disabled", false);
								$(".firststampdate").attr("disabled", false);
								$(".secondstampNo").attr("disabled", true);
								$(".secondstampContent").attr("disabled", true);
								$(".secondstampdate").attr("disabled", true);
								$(".thirdstampNo").attr("disabled", true);
								$(".thirdstampContent").attr("disabled", true);
								$(".thirdstampdate").attr("disabled", true);
								$(".dontChoose").css("display", "none");
								$(".Level1Choose").css("display", "");
								$(".Level2Choose").css("display", "none");
								$(".Level3Choose").css("display", "none");

								$("#firststampNo").val(result.data[0].stamp_rate);
								$("#firststampContent").val(result.data[0].stamp_content);
								$("#firststampdatestart").val(result.data[0].stamp_start);
								$("#firststampdateend").val(result.data[0].stamp_end);

								break;
							case 2:
								$("#checkstamp2").attr("checked", true);
								$(".firststampNo").attr("disabled", true);
								$(".firststampContent").attr("disabled", true);
								$(".firststampdate").attr("disabled", true);
								$(".secondstampNo").attr("disabled", false);
								$(".secondstampContent").attr("disabled", false);
								$(".secondstampdate").attr("disabled", false);
								$(".thirdstampNo").attr("disabled", true);
								$(".thirdstampContent").attr("disabled", true);
								$(".thirdstampdate").attr("disabled", true);
								$(".dontChoose").css("display", "none");
								$(".Level1Choose").css("display", "none");
								$(".Level2Choose").css("display", "");
								$(".Level3Choose").css("display", "none");

								$("#secondstampNo1").val(result.data[0].stamp_rate);
								$("#secondstampContent1").val(result.data[0].stamp_content);
								$("#secondstampdatestart1").val(result.data[0].stamp_start);
								$("#secondstampdateend1").val(result.data[0].stamp_end);

								$("#secondstampNo2").val(result.data[1].stamp_rate);
								$("#secondstampContent2").val(result.data[1].stamp_content);
								$("#secondstampdatestart2").val(result.data[1].stamp_start);
								$("#secondstampdateend2").val(result.data[1].stamp_end);

								$("#secondstampNo3").val(result.data[2].stamp_rate);
								$("#secondstampContent3").val(result.data[2].stamp_content);
								$("#secondstampdatestart3").val(result.data[2].stamp_start);
								$("#secondstampdateend3").val(result.data[2].stamp_end);
								break;
							case 3:
								$("#checkstamp3").attr("checked", true);
								$(".firststampNo").attr("disabled", true);
								$(".firststampContent").attr("disabled", true);
								$(".firststampdate").attr("disabled", true);
								$(".secondstampNo").attr("disabled", true);
								$(".secondstampContent").attr("disabled", true);
								$(".secondstampdate").attr("disabled", true);
								$(".thirdstampNo").attr("disabled", false);
								$(".thirdstampContent").attr("disabled", false);
								$(".thirdstampdate").attr("disabled", false);
								$(".dontChoose").css("display", "none");
								$(".Level1Choose").css("display", "none");
								$(".Level2Choose").css("display", "none");
								$(".Level3Choose").css("display", "");

								$("#thirdstampNo1").val(result.data[0].stamp_rate);
								$("#thirdstampContent1").val(result.data[0].stamp_content);
								$("#thirdstampdatestart1").val(result.data[0].stamp_start);
								$("#thirdstampdateend1").val(result.data[0].stamp_end);

								$("#thirdstampNo2").val(result.data[1].stamp_rate);
								$("#thirdstampContent2").val(result.data[1].stamp_content);
								$("#thirdstampdatestart2").val(result.data[1].stamp_start);
								$("#thirdstampdateend2").val(result.data[1].stamp_end);

								$("#thirdstampNo3").val(result.data[2].stamp_rate);
								$("#thirdstampContent3").val(result.data[2].stamp_content);
								$("#thirdstampdatestart3").val(result.data[2].stamp_start);
								$("#thirdstampdateend3").val(result.data[2].stamp_end);
								break;
							}


						}else{
							$(".firststampNo").attr("disabled", true);
							$(".firststampContent").attr("disabled", true);
							$(".firststampdate").attr("disabled", true);

							$(".secondstampNo").attr("disabled", true);
							$(".secondstampContent").attr("disabled", true);
							$(".secondstampdate").attr("disabled", true);

							$(".thirdstampNo").attr("disabled", true);
							$(".thirdstampContent").attr("disabled", true);
							$(".thirdstampdate").attr("disabled", true);
						}
					} else {
						alert("실행중 오류발생!");
						console.log(result.data);
					}
				});
			},



//			쿠폰 리스트 이벤트
			loadCoupone:function() {
				$.getJSON("../event/loadCoupone.do?sno="+loginInfo.sno, function(result) {
					if(result.status == "success") {
						$("#couponesbody tr").remove();
						for (var i in result.data){
							$("<tr>")
							.append($("<td>").text(result.data[i].econtent))
							.append($("<td>").text(result.data[i].econdition))
							.append($("<td>").text(" ~ " +(result.data[i].etime)))
							.append($("<td>").attr("id","basketsize").empty()
									.append($("<a>").attr("href","#").attr("coupone_no",result.data[i].coupone_no).addClass("deleteCoupone").attr("style","height: 24px;")
											.append($("<img>")
													.attr("src","images/basketback.png"))))
													.appendTo($("#couponesbody"));
						}
					} else {
						alert("실행중 오류발생!");
						console.log(result.data);
					}
				});
			}
	};
	window.appContext.addObject("eventjs", eventjs);
};


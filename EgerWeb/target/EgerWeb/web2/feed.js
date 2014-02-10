if (window.appContext.getObject("feedjs") == undefined) {
	console.log("feed.js 로딩 완료");
	var feedjs = {
			init: function() {
				var that = this;
				that.feedList();

				$(".feedAddBTN").click( function() {
					if($(".feedTextarea").val()!= ""){
						$.post("../feed/feedadd.do",
								{
							fcontent: $(".feedTextarea").val(),
							sno: loginInfo.sno
								},
								function(result) {
									if(result.status == "success") {
										$(".feedTextarea").val("");
										that.feedList();
									} else {
										alert("실행중 오류발생!");
									}
								},
						"json");
					}else{
						alert("글씨를...적어주세요");
					}
				});



				$("#feedsList").on('click', '.feedDelete', function() {
					$.getJSON("../feed/delete.do?fno="+$(this).attr("fno"), function(result) {
						if(result.status == "success") {
							console.log("success");
							that.feedList();
						} else {
							alert("실행중 오류발생!");
							console.log(result.data);
						};
					});
				});




			},
			feedList: function(){
				$.getJSON("../feed/feedList.do?sno="+loginInfo.sno, function(result) {
					if(result.status == "success") {
						var feedsSection = $("#feedsList");
						$("#feedsList UL").remove();
						var feeds = result.data;

						for(var i in feeds){
							var feedStarScore="";
							for (var star = 0; star<feeds[i].fscore ; star++) {
								feedStarScore += "<img src='images/feedFullStar.png'>";
								}	
							for (var star = 0; star< (5-feeds[i].fscore); star++) {
								feedStarScore += "<img src='images/feedNoneStar.png'>";
								}	
							if(feeds[i].barcode == null ){
								feeds[i].barcode = "주인장";
							($("<UL>")
							.attr("id","commentList")
							.attr("class","cmlist  type2")
								.append(
										$("<DL>")
										.attr("class","_countableComment")
										.append(
												$("<DT>")
												.attr("class","pc")
												.append(
														$("<IMG>")
														.attr("src","images/feedPeople.png")
														.attr("id","feedimgsize")
														)
												.append(
														$("<SPAN>")
														.attr("class","border")
														)
												)
										.append(
												$("<DT>")
												.attr("class","h")
												.append(
														$("<A>")
														.attr("id","nick1")
														.attr("class","nick pcol2")
														.attr("style","FONT-FAMILY: '3287760_10'")
														.attr("target","_top")
														.text(feeds[i].barcode)
														)
												.append(
														$("<SPAN>")
														.attr("class","date fil5 pcol2")
														.attr("id","datecolorsize")
														.text(result.data2[i])
														)
												.append(
														$("<SPAN>")
														.attr("class","fil7")
														.attr("id","starscore")
														.text("")
														)
												)
										.append(
												$("<DD>")
												.attr("id","comment1")
												.attr("class","comm pcol2")
												.attr("style","FONT-SIZE: 10pt; FONT-FAMILY: '3287760_10'")
												.text(feeds[i].fcontent)
												.append($("<a>")
														.attr("class","feedDeleteBtn"+i)
														.addClass("feedDelete")
														.attr("id","deletebutton")
														.attr("style","display:none")
														.attr("href","#")
														.attr("fno",feeds[i].fno)
														.text("delete")
														)
												)
										)
							).appendTo(feedsSection);
							
							}else{
							
								($("<UL>")
										.attr("id","commentList")
										.attr("class","cmlist  type2")
											.append(
													$("<DL>")
													.attr("class","_countableComment")
													.append(
															$("<DT>")
															.attr("class","pc")
															.append(
																	$("<IMG>")
																	.attr("src","images/feedPeople.png")
																	.attr("id","feedimgsize")
																	)
															.append(
																	$("<SPAN>")
																	.attr("class","border")
																	)
															)
													.append(
															$("<DT>")
															.attr("class","h")
															.append(
																	$("<A>")
																	.attr("id","nick1")
																	.attr("class","nick pcol2")
																	.attr("style","FONT-FAMILY: '3287760_10'")
																	.attr("target","_top")
																	.text(feeds[i].barcode)
																	)
															.append(
																	$("<SPAN>")
																	.attr("class","date fil5 pcol2")
																	.attr("id","datecolorsize")
																	.text(result.data2[i])
																	)
															.append(
																	$("<SPAN>")
																	.attr("id","starimglocation")
																	.html(feedStarScore)
																	)
															)
													.append(
															$("<DD>")
															.attr("id","comment1")
															.attr("class","comm pcol2")
															.attr("style","FONT-SIZE: 10pt; FONT-FAMILY: '3287760_10'")
															.text(feeds[i].fcontent)
															.append($("<a>")
																	.attr("class","feedDeleteBtn"+i)
																	.addClass("feedDelete")
																	.attr("id","deletebutton")
																	.attr("style","display:none")
																	.attr("href","#")
																	.attr("fno",feeds[i].fno)
																	.text("delete")
																	)
															)
													)
										).appendTo(feedsSection);
										
								
							}
							
							
							if( feeds[i].barcode == "주인장"){
								($(".feedDeleteBtn"+i)).css("display","block");
							}
						}
					} else {
						alert("실행중 오류발생!");
						console.log(result.data);
					}
				});
			}
	};
	window.appContext.addObject("feedjs", feedjs);
};
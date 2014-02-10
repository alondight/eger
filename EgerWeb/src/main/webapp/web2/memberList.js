if (window.appContext.getObject("memberListjs") == undefined) {
	console.log("memberList.js 로딩 완료");
	var memberListjs = {
			pagecount:10,
			pageNo:0,
			nowPageNo:0,
			init: function() {
				var that = this;
				that.memberList();

				$("#liveChat").click(function(){
					$(this).trigger("liveChatOn");
				});

				$("#receiveBarcode").click(function(){
					$("#receiveBarcode").attr("src","images/barcodesend_onBTN.png");
					$.post("deleteSession.do",
							{
						sno: loginInfo.sno,
							},
							function(result) {
								if(result.status == "success") {
									var receiveBarcode = setInterval(function(){
										$.post("receiveBarcode.do",
												{
											sno: loginInfo.sno,
												},
												function(result) {
													if(result.data != null) {
														clearInterval(receiveBarcode);
														$(".memberListFormclass").each(function(index){
															if( $("#memberListForm"+index+" a").text()== result.data){
																$("#receiveBarcode").attr("src","images/barcodesend_offBTN.png");
																$("#memberListForm"+index).trigger("click");
															}
														});
													}else{
														console.log("barcode == null");
													}
												},
										"json");
									},3000);
								} else {
									alert("실행중 오류발생!");
								}
							},
					"json");
				});


				$("#modalCountBtn").click(function(){
					that.modalCountBtn(false);
				});

				$("#modalStampCountBtn").click(function(){
					that.modalCountBtn(true);
				});

				$(document).on("click", "[data-displ]", function(t) {
					var thatt = this;
					t.preventDefault();
					$.post("../memberList/membercount.do", 
							{
						scno: $(thatt).attr("memberlistno")
							},
							function(result) {
								if(result.status == "success") {
									$("#myProject").display($(thatt).data());
									$("#modalBarcodeNo").text($(thatt).find("a").text());
									$("#modalStackStamp").text($(thatt).find("td:eq(0)").text());
									$("#modalStackMileage").text($(thatt).find("td:eq(1)").text());
									$("#modalPopTable").find("tr:gt(0)").remove();
									$("#modalPopTable").attr("scno",$(thatt).attr("memberlistno"));

									var aa = 0;
									for(var i in result.data){
										if(result.data[i].coupone_level == 0){
											$("#modalPapTableTR").clone().css("display","").addClass("linecountno"+aa).attr("coupone_no",result.data[i].coupone_no).appendTo($("#modalPopTable"));
											$(".linecountno"+aa).find("td:eq(0)").find("input").attr("id","checkboxid"+aa);
											$(".linecountno"+aa).find("td:eq(1)").text(result.data[i].econtent);
											$(".linecountno"+aa).find("td:eq(2)").text(result.data[i].econdition);
											$(".linecountno"+aa).find("td:eq(3)").text(result.data[i].etime);
											aa++;
										}else{

										}
									}
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								}
							},
					"json");
				});


				$("#memberListSearchForm").keyup(function(e) {
					if (e.keyCode == 13){
						that.memberSearchbar();
					}     
				});
				$("#memberListSearchForm2").click(function(){
					that.memberSearchbar();
				});
				$("#memberListSearchForm3").click(function(){
					that.allMember();
				});

				$("#memberListSearch").keyup(function(e){
					if(e.keyCode == 13){
						that.pagingView();
					}
				});

				$("#memberaaaaaaaaa").click(function(){
					that.pagingView();
				});


				$("#after").click(function(){
					if(that.nowPageNo < (that.pageNo-1)){
						$("#memberListTable"+that.nowPageNo+" tr").css("display","none");
						that.nowPageNo+=1;
						$("#memberListTable"+that.nowPageNo+" tr").css("display","");
					}
				});

				$("#before").click(function(){
					if(that.nowPageNo > 0){
						$("#memberListTable"+that.nowPageNo+" tr").css("display","none");
						that.nowPageNo -=1;
						$("#memberListTable"+that.nowPageNo+" tr").css("display","");
					}
				});





			},
			memberList : function(){
				var that = this;
				$.getJSON("../memberList/memberList.do?sno="+loginInfo.sno, function(result){
					if(result.status == "success") {
						that.nowPageNo=0;
						var countpage = that.pagecount;
						that.pageNo = Math.ceil(result.data.length / that.pagecount);
						var paging=0;

						for(var no=0; no < that.pageNo; no++){
							$("#memberListMainTable").append($("<tbody>").attr("id","memberListTable"+no));
							for(var i=paging; i<that.pagecount;i++){
								$("#memberListForm").clone().css("display","none").attr("onMouseOver","this.style.backgroundColor='#D5D5D5'").attr("onMouseOut","this.style.backgroundColor=''")
								.attr("memberListNo",result.data[i].scno)
								.attr("id","memberListForm"+i).addClass("memberList"+i).appendTo($("#memberListTable"+no));
								$(".memberList"+i).find("a").text(result.data[i].barcode);
								$(".memberList"+i).find("td:eq(0)").text(result.data[i].stackstamp);
								$(".memberList"+i).find("td:eq(1)").text(result.data[i].stackmileage);
								$(".memberList"+i).find("td:eq(2)").text(result.data2[i]);

								$("#memberListTable0 tr").css("display","");
								$("#memberListnone").css("display","none");
							}
							paging +=countpage;
							that.pagecount +=countpage;
						};
					}else {
						alert("실행중 오류발생!");
						console.log(result.data);
					};
				});
			},
			memberSearchbar : function(){
				$(".memberListFormclass").each(function(index){
					if( $("#memberListForm"+index+" a").text().search($("#memberListSearchForm").val()) !=  0){
						$("#memberListForm"+index).css("display","none");
					}else{
						$("#memberListForm"+index).css("display","");
					}
				});
			},
			allMember : function(){
				$(".memberListFormclass").each(function(index){
					$("#memberListForm"+index).css("display","");
				});
			},

			pagingView : function(){
				var that = this;
				$("#memberListMainTable").find("tbody:gt(0)").remove();
				that.pagecount=parseInt($("#memberListSearch").val());
				that.memberList();
			},
			modalCountBtn : function(boolean){
				var countEvent = $("#modalPopTable tbody").children().size();
				var UsingCouponeNO = "";
				for(var i=0; i<(countEvent-1) ; i++){
					if($("#checkboxid"+i).is(":checked")){
						UsingCouponeNO += ","+$(".linecountno"+i).attr("coupone_no");
					}
				}
				if(parseInt($("#modalStackMileage").text()) >= parseInt($("#usingPoint").val())  || 
						$("#usingPoint").val()==""){
					$.post("../memberList/payCount.do", 
							{
						scno: $("#modalPopTable").attr("scno"),
						usingcouponeno: UsingCouponeNO,
						cashpay: $("#cashpay").val(),
						cardpay: $("#cardpay").val(),
						usingPoint: $("#usingPoint").val(),
						sno:loginInfo.sno,
						bool:boolean
							},
							function(result) {
								if(result.status == "success") {
									location.href="index.html";
								} else {
									alert("실행중 오류발생!");
									console.log(result.data);
								}
							},
					"json");

				}else{
					alert("마일리지가 부족합니다.");
				}
			}
	};
	window.appContext.addObject("memberListjs", memberListjs);
};

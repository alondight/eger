if (window.appContext.getObject("signupjs") == undefined) {
	console.log("signup.js 로딩 완료");
	var signupjs = {
			init: function() {
				var bar = $('.bar');
				var percent = $('.percent');
				var status = $('#status');
				$("#Signupbtn").click(function(){
					if($("#sPassword").val()=== $("#sPasswordCheck").val()){

						$('#serverInfoForm').ajaxSubmit({ 
							type:'post',
							url:'signup.do', 
							beforeSend: function() {
								status.empty();
								var percentVal = '0%';
								bar.width(percentVal);
								percent.html(percentVal);

							},
							uploadProgress: function(event, position, total, percentComplete) {
								var percentVal = percentComplete + '%';
								bar.width(percentVal);
								percent.html(percentVal);
							},
							data:{
								sno:$("#StoreNo").val(),
								sname:$("#StoreName").val(),
								spassword: b64_md5($("#sPassword").val()),
								stel:$("#StoreTel").val(),
								s_address:$("#sAddress").val(),
								s_detail_address:$("#sDetail_Address").val(),
								stime:$("#sTime").val(),
								cateno:$("#sCategory").attr("cateno"),
								scontent:$("#sProfile").val()
							},
							dataType:'json',
							success:    function() { 
								$( "#dialog-modal" ).dialog({
									autoOpen: false,
									show: {
										effect: "blind",
										duration: 1000
									},
									hide: {
										effect: "explode",
										duration: 1000
									},
								});
								$('.ui-dialog-titlebar' ).remove();
								$("#dialog-modal").dialog('open');
								setTimeout(function(){
									$("#dialog-modal").dialog('close');
								},2000);

								setTimeout(function(){
									location.href="../web2/index.html";
								},3000);
							} 
						});
					}else{
						alert("Password 확인이 올바르지 않습니다.");
					}
				});

//				Filepreview
				var preview = $(".upload-preview img");
				$(".filePreview").change(function(event){
					var input = $(event.currentTarget);
					var file = input[0].files[0];
					var reader = new FileReader();
					reader.onload = function(e){
						image_base64 = e.target.result;
						preview.attr("src", image_base64);
					};
					reader.readAsDataURL(file);
				});

				$("#selectPhotoSignup").click(function(){
					$(this).trigger("portBox:close");
				});



				$("#postSearchTable").on('click', '.ClickeventList', function() {
					$("#sAddress").val($(this).find("td:eq(0)").text()+" "+$(this).find("td:eq(1)").text());
					$(this).trigger("portBox:close");

				});
				$("#cateSearchTable").on('click', '.ClickeventList', function() {
					$("#sCategory").attr("cateno",$(this).find("td:eq(0)").text());
					$("#sCategory").val($(this).find("td:eq(1)").text());
					$(this).trigger("portBox:close");

				});


				$(document).on("click", "[cate-display]", function(t) {
					var thatt = this;
					t.preventDefault();
					$.getJSON("category.do", function(result) {
						if(result.status == "success") {
							$("#signupCate").display($(thatt).data());
							$("#cateSearchTable td").remove();
							for(var i in result.data){
								$("#cateSearchTable").append(
										$("<tr>").attr("onMouseOver","this.style.backgroundColor='#D5D5D5'").attr("onMouseOut","this.style.backgroundColor=''")
										.append($("<td>").text(result.data[i].cateno))
										.append($("<td>").text(result.data[i].category))
										.addClass("ClickeventList")
								);
							}
						} else {
							alert("죄송합니다. 서버가 올바르지 않습니다.");
						}
					});
				});







				$('#signupcheck').click(function(event){
					$.ajax("PostApi.do", {
						type: "post",
						data: {
							query: $("#postQuery").val()
						},
						dataType: "json",
						success: function(result) {
							if(result.status == "fail") {
								alert("주소 정보가 올바르지 않습니다..");
							} else {

								$("#postSearchTable td").remove();
								for(var i in result.data){
									$("#postSearchTable").append(
											$("<tr>").attr("onMouseOver","this.style.backgroundColor='#D5D5D5'").attr("onMouseOut","this.style.backgroundColor=''")
											.append($("<td>").text(result.data2[i]))
											.append($("<td>").text(result.data[i]))
											.addClass("ClickeventList")
											.attr("data-no", i)
									);
								}							
							}
						}
					});
				});


			}
	};
	window.appContext.addObject("signupjs", signupjs);
};

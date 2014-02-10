var sno ="";
$(document).ready(function($){
	$.getJSON("loginInfo.do", function(result) {
		if(result.status == "success") {
			sno = result.data.sno;

			var serverAddress = 'http://192.168.41.27:3000',
//			var serverAddress = 'http://192.168.2.5:3000',
			socket = io.connect(serverAddress),
			clientId = null,   
			nickname = null,
			currentRoom = null,

			tmplt = {
//				room: [
//				'<li data-roomId="${room}">',
//				'<span class="icon"></span> ${room}',
//				'</li>'
//				].join(""),
				client: [
				         '<li data-clientId="${clientId}" class="cf">',
				         '<div class="fl clientName"><span class="icon"></span> ${nickname}</div>',
				         '<div class="fr composing"></div>',
				         '</li>'
				         ].join("")
//				         ,
//				         message: [
//				         '<li class="cf">',
//				         '<div class="fl sender">${sender}: </div><div class="fl text">${text}</div><div class="fr time">${time}</div>',
//				         '</li>'
//				         ].join("")
			};
			
			$('#chatPage').css('min-height', '500px');
			Date.prototype.format = function(f) {
			    if (!this.valueOf()) return " ";

			    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
			    var d = this;

			    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
			        switch ($1) {
			            case "yyyy": return d.getFullYear();

			            case "yy": return (d.getFullYear() % 1000).zf(2);

			            case "MM": return (d.getMonth() + 1).zf(2);

			            case "dd": return d.getDate().zf(2);

			            case "E": return weekName[d.getDay()];

			            case "HH": return d.getHours().zf(2);

			            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);

			            case "mm": return d.getMinutes().zf(2);

			            case "ss": return d.getSeconds().zf(2);

			            case "a/p": return d.getHours() < 12 ? "오전" : "오후";

			            default: return $1;
			        }
			    });

			};
			String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
			String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
			Number.prototype.zf = function(len){return this.toString().zf(len);};
			
			
			$("#chatTest").css("top",200);
			$("#chatTest").css("left",400);
			
			
			$("#users").on('click','.cf', function() {
				var whisper = $(this).find("div").text();
				$("#message").val("/w"+whisper+" ");
				location.href="#chatPage";
			});


			$('#cancel-message').click(function(){
				$("#message").val("");
			});

			$('#clear-message').click(function(){
				$("#chat").children().remove();
				$('#chatTest').scrollTop(0);
			});
			
			
			$('#setNick').click(function(e) {
				setNickName(e);
			});
			$("#nickname").keyup(function(e){
				if (e.keyCode == 13)
					setNickName(e);
			});


			socket.on('ready', function(data) {
				clientId = data.clientId;
			});

			socket.on('addroom', function(data){
				addRoom(data.room, true);
			});

			socket.on('presence', function(data){
				if(data.state == 'online'){
					addClient(data.client, true);
				} else if(data.state == 'offline'){
					$('#users ul li[data-clientId="' + data.client.clientId + '"]').remove();
				}
			});


			socket.on('roomclients', function(data){

				addRoom(data.room, false);
				currentRoom = data.room;

				addClient({ nickname: nickname, clientId: clientId }, false, true);
				for(var i = 0, len = data.clients.length; i < len; i++){
					if(data.clients[i]){
						addClient(data.clients[i], false);
					}
				}
			});

			$('#send-message').click(function(e) {
				sendMessage(e);
			});

			$("#message").keyup(function(e){
				if (e.keyCode == 13)
					sendMessage(e);
			});


			socket.on('new message', function(data) {
				var time = new Date().format('HH:mm:ss');
				$('#chat').
				append('<div id="receieveDiv"><div  id="receieveDivContent"><div id="receieveMesseging" data-inline="true">' 
						+'<span id="nickName">'+ data.nick + ':</span>' +data.msg+'</div><div id="receieveTimeing" data-inline="true">'
						+time+'</div></div></div>');
//				$.mobile.silentScroll($("#contentWrap")[0].offsetHeight);
				if($('#contentWrap')[0].scrollHeight > 400){
					$('#chatTest').scrollTop($('#contentWrap')[0].scrollHeight+100);
				}
				
			});

			socket.on('whisper', function(data) {
				var time = new Date().format('HH:mm:ss');
				$('#chat').
				append('<div id="receieveDiv"><div  id="receieveDivContent"><div id="receieveWhisperMesseging" data-inline="true">' 
						+'<span id="nickName">'+ data.nick + ':</span>' +data.msg+'</div><div id="receieveTimeing" data-inline="true">'
						+time+'</div></div></div>');
//				$.mobile.silentScroll($("#contentWrap")[0].offsetHeight);
				if($('#contentWrap')[0].scrollHeight > 400){
					$('#chatTest').scrollTop($('#contentWrap')[0].scrollHeight+100);
				}
			});


			function addRoom(name, announce){
				name = name+"";
				name = name.replace('/','');
//				if($('.chat-rooms ul li[data-roomId="' + name + '"]').length == 0){
//				$.tmpl(tmplt.room, { room: name }).appendTo('.chat-rooms ul');
//				// if announce is true, show a message about this room
//				if(announce){
//				insertMessage(serverDisplayName, 'The room `' + name + '` created...', true, false, true);
//				}
//				}
			};

			function addClient(client, announce, isMe){
				var $html = $.tmpl(tmplt.client, client);
				if(isMe){
					$html.addClass('me');
				}
				$('#usersUl').append($html);
				if ($('#usersUl').hasClass('ui-listview')) {
					$('#usersUl').listview('refresh');
				} else {
					$('#usersUl').trigger('create');
				}
//				$('#usersUl').trigger("create");
			}
			function setNickName(e){
				if($('#nickname').val() != "" ){
					e.preventDefault();
					nickname = $('#nickname').val().trim();
					$('#roomView').html('<h1>' + "RoomName : " + sno + '</h1>');
					socket.emit('new user', { nickname: nickname , sno : sno}, function(data) {

						if (data) {
							$('#nickWrap').hide();
							$('#contentWrap').show();
							$('#chatFooter').show();
							
						} else {
							$('#nickError').html('That username is already taken! Try again');
						}
					});
					$('#nickname').val('');
				}
			};
			function sendMessage(e){
				if($('#message').val() != "" ){

					e.preventDefault();
					socket.emit('send message', {message: $('#message').val(), room: currentRoom },function(data){
						$('#chat').append('<span class="error">' + data + "</span><br>");
					});
					var msg = $('#message').val().trim();
					if (msg.substr(0, 3) === "/w ") {
						msg = msg.substr(3);
						var ind = msg.indexOf(" ");
						if (ind !== -1) {
							var name = msg.substring(0, ind);
							var sendmsg = msg.substring(ind + 1);
							var time = new Date().format('HH:mm:ss');
							$('#chat').
							append('<div id="sendingDiv"><div  id="sendingDivcontent"><div id="sendWhisperMesseging" data-inline="true">' 
									+'<span id="nickName">'+ nickname + '(to '+name+') :</span>' +sendmsg+'</div><div id="sendTimeing" data-inline="true">'
									+time+'</div></div></div>');
							
						}
					}else{
						
						var time = new Date().format('HH:mm:ss');
						$('#chat').
						append('<div id="sendingDiv"><div  id="sendingDivcontent"><div id="sendMesseging" data-inline="true">' 
								+'<span id="nickName">'+ nickname + ':</span>' +$('#message').val()+'</div>'
								+'<div id="sendTimeing"	data-inline="true">'+time+'</div></div></div>');
					}
					
					
//					$.mobile.silentScroll($("#contentWrap")[0].offsetHeight);
					if($('#contentWrap')[0].scrollHeight > 400){
						$('#chatTest').scrollTop($('#contentWrap')[0].scrollHeight+100);
					}
					$('#message').val('');
				}
			}
		} else {
			alert("Sever Complication");
		}
	});
});
var express = require('express'), 
app = express(), 
server = require("http").createServer(app),
io = require("socket.io").listen(server), 
fs = require("fs"),
url = require('url'),
nicknames = new Object(),
whispernames = [],
port=3000;
server.listen(port);

app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use("/themes", express.static(__dirname + '/public/themes'));

app.set('view engine', 'jade');
app.get('/', function (req, res) {
//	res.setHeader('content-type', 'application/json');
	res.sendfile(__dirname + '/public/index.html');
//	res.end();
});
io.set('log level', 2);
io.set('transports', [ 'websocket', 'xhr-polling' ]);

var mysql = require('mysql');
var mysqlConfig = {
        host: "localhost",
        user: "test",
        password: "test",
        database: "eger"
};
var conn = mysql.createConnection(mysqlConfig);
//DeletePerMonth();


io.sockets.on("connection", function(socket) {
	
	socket.on("new user", function(data, callback) {
		if (nicknames == null) {
			callback(false);
		} else {
			callback(true);
			data.clientId = generateId();
			nicknames[socket.id] = data;
			whispernames[data.nickname]=socket;
			socket.emit("ready", { clientId: data.clientId});
			subscribe(socket, { room: data.sno });
		}
	});

	socket.on("send message", function(data, callback) {
		var msg = data.message.trim();
		if (msg.substr(0, 3) === "/w ") {
			msg = msg.substr(3);
			var ind = msg.indexOf(" ");
			if (ind !== -1) {
				var name = msg.substring(0, ind).trim();
				var sendmsg = msg.substring(ind + 1).trim();

				whispernames[name].emit("whisper", {
					nick : nicknames[socket.id].nickname,
					msg : sendmsg
				});
				console.log("whisper message send is : " + sendmsg);
			} else {
				callback("Error! Please enter a message for your whisper.");
			}
		} else {
			console.log("after trimming message is : " + msg);
			socket.broadcast.to(data.room).emit('new message', { nick: nicknames[socket.id].nickname, msg: data.message});
		}
	});


	socket.on("disconnect", function(data) {
		var rooms = io.sockets.manager.roomClients[socket.id];
		for(var room in rooms){
			if(room && rooms[room]){
				unsubscribe(socket, { room: room.replace('/','') });
			}
		}
		delete nicknames[socket.id];
	});
});



function DeletePerMonth(){
// 지난 이벤트 삭제	
//	SET SQL_SAFE_UPDATES=0
//	delete from EVENT
//	where
//	E_COUPONE_LEVEL=0 AND now() > ETIME;

//  사용된 쿠폰 중 한달 이상 된 값 삭제	
//	 SET SQL_SAFE_UPDATES=0
//		delete from CCOUPONE
//		where
//		COUPONE_LEVEL=1 AND DATE_ADD(NOW(), INTERVAL -1 MONTH) > COUPONE_USEDATE;
//	
	setInterval(function(){
		conn.query('delete from CCOUPONE where COUPONE_LEVEL=1 AND DATE_ADD(NOW(), INTERVAL -1 MONTH) > COUPONE_USEDATE;)',function(err,result){
			if(err){
				console.log("쿼리오류");
			}else{
				console.log(result);
			}
		});
		},(1000*60*60*24*30));
};
 
function generateId(){
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};
function getRooms(){
	return Object.keys(io.sockets.manager.rooms);
};
function subscribe(socket, data){
	var rooms = getRooms();
	if(rooms.indexOf('/' + data.room) < 0){
		socket.broadcast.emit('addroom', { room: data.room });
	}
	socket.join(data.room);
	updatePresence(data.room, socket, 'online');
	socket.emit('roomclients', { room: data.room, clients: getClientsInRoom(socket.id, data.room) });
}
function unsubscribe(socket, data){
	socket.leave(data.room);
	updatePresence(data.room, socket, 'offline');
	if(!countClientsInRoom(data.room)){
		io.sockets.emit('removeroom', { room: data.room });
	}

}
function getRooms(){
	return Object.keys(io.sockets.manager.rooms);
}
function updatePresence(room, socket, state){
	console.log(room);
	room = (room+"").replace('/','');
	socket.broadcast.to(room).emit('presence', { client: nicknames[socket.id], state: state, room: room });
}
function getClientsInRoom(socketId, room){
	var socketIds = io.sockets.manager.rooms['/' + room];
	var clients = [];
	if(socketIds && socketIds.length > 0){
		socketsCount = socketIds.lenght;

		for(var i = 0, len = socketIds.length; i < len; i++){
			if(socketIds[i] != socketId){
				clients.push(nicknames[socketIds[i]]);
			}
		}
	}
	return clients;
};

function countClientsInRoom(room){
	if(io.sockets.manager.rooms['/' + room]){
		return io.sockets.manager.rooms['/' + room].length;
	}else{
		return 0;
	}
};
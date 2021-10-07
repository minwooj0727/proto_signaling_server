var objectSchema = require('./util/objectSchema');
//var axios = require('axios')
const roomName = 'Room';
//const apiServer = "http://10.244.4.2:8000"
var sampleArray = [];


module.exports = function(io,socket,util,axios,apiServer){

	socket.on('joinRoom',async function(data){

		// validation check
		if(objectSchema.joinRoomValid(data) == false) {
			util.writeLog('Error','There is Missing Key(s) : joinRoom');
			return;
		}

		socket.join(roomName);

		util.writeLog('Info',data);

		// set joined user status - redis or http call
		await axios.post(apiServer+'/api/user/join', data, {
   	        	headers: {
		    		'Content-Type': 'application/json; charset=utf-8'
    			}
  		}).then((response) => {
	        	console.log(response.data);
		});
		// set joined user status end

		// get avatars info
                await axios.get(apiServer+'/api/user/infos', {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			var responseAvatarsInfo = new Map();
			responseAvatarsInfo.set('infos',response.data);
        	        var roomInfoObject = new Object();
	                responseAvatarsInfo.forEach((value, key) => {
        	                var keys = key.split('.'),
	                        last = keys.pop();
                        	keys.reduce((r, a) => r[a] = r[a] || {}, roomInfoObject)[last] = value;
                	});


        	        socket.broadcast.to(roomName).emit('joinRoom',data);
	                io.to(socket.id).emit('avatarsInfo',roomInfoObject);
                });


		var mapObject = new Object();
		mapObject.uid = data.uid;
		mapObject.socketID = socket.id;

		await axios.post(apiServer+'/api/socket/map', mapObject, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
                });
		// get avatars info end

		// dataArray put infos
	});

	socket.on('avatarAction',function(data){

		//validation check
		if(objectSchema.avatarActionValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : avatarAction');
                        return;
                }

		util.writeLog('Info',data);

		// set avatarAction - redis call
                axios.patch(apiServer+'/api/user/action', data, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			socket.broadcast.to(roomName).emit('avatarAction',data);

                });
		// set avatarAction end

	});

	socket.on('exitRoom',function(data){

		//validation check
		if(objectSchema.exitRoomValid(data) == false) {
			util.writeLog('Error','There is Missing Key(s) : exitRoom');
			return;
		}

		util.writeLog('Info',data)
		// remove user - redis or http call
                axios.delete(apiServer+'/api/user/unjoin', {data : data}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			socket.broadcast.to(roomName).emit('exitRoom',data);

                });
		// remove user end

	})

	socket.on('reset',function(){
		//redis reset
                axios.delete(apiServer+'/api/reset', {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			socket.to(roomName).emit('reset',response.data);


                });
		//redis reset



	});

	socket.on('gimmick',function(data){

		//validation check
		if(objectSchema.gimmickValid(data) == false) {
			util.writeLog('Error','There is Missing Key(s) : gimmick');

		}

		util.writeLog('Info',data);

		// something to do ...
                axios.patch(apiServer+'/api/gimmick', data, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			socket.broadcast.to(roomName).emit('gimmick',response.data);

                });
		// something to do ... end

	});

};

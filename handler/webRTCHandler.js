var objectSchema = require('./util/objectSchema')
const roomName = 'Room';
var sampleArray = [];
const uuidV4 = require('uuid/v4');
function randomInt() { // min and max included
        var min = 1;
        var max = 2147483647;
        return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = function(io, socket, util, axios, apiServer){

	/*
	socket.on('openChat', async function(data){
                //validation check
                if(objectSchema.openChatValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : openChat');
                        return;
                }
                var getSocketIDObject = new Object();
                getSocketIDObject.uid = data.receiverUid;
		var receiverSocketID;
                await axios.get(apiServer+'/api/socket/socketid', {data : getSocketIDObject}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
			console.log('socketid : ')
                        console.log(response.data);
                        receiverSocketID = response.data.socketID;
                });

		//After Check Duplication, return error emit

		//data.channelID = 1;
                data.channelID = randomInt();
                data.channelName = uuidV4();
                //data.channelName = '1';


                await axios.post(apiServer+'/api/channel/open', data, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then(async function(response){
			console.log('open ')
                        console.log(response.data);

                        //var receiverSocket = await io.in(receiverSocketID).fetchSockets();
			var receiverSocket = io.of("/").connected[receiverSocketID]
                        var channelName = response.data.users[0].channelName;
			var connectionIDIdx = 1;
                        socket.join(channelName);
                        receiverSocket.join(channelName);


			response.data.users.forEach((user)=>{
				user.connectionID = connectionIDIdx++;
			})
			console.log(response.data)
			io.to(channelName).emit('openChat',response.data);

                        //response.data.connectionID = 1
                        //io.to(socket.id).emit('openChat',response.data);

                        //response.data.connectionID = 2
                        //io.to(receiverSocket.id).emit('openChat',response.data);

                });

	});

       socket.on('closeChat',async function(data){

                //validation check
                if(objectSchema.closeChatValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : closeChat');
                        return;
                }

                util.writeLog('Info',data);

		var channelNameObject = new Object();
		channelNameObject.channelName = data.channelName;
                var senderSocketID;
                var receiverSocketID;


                await axios.get(apiServer+'/api/socket/channel',{data : channelNameObject}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
                        senderSocketID = response.data.socketIDs[0].socketID;
                        receiverSocketID = response.data.socketIDs[1].socketID;
			console.log(senderSocketID)

                }).catch((error) => {console.error(error);});


                await axios.delete(apiServer+'/api/channel/close', {data : data}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then(async function(response){
                        console.log(response.data);
			var senderSocket = io.of("/").connected[senderSocketID]
			var receiverSocket = io.of("/").connected[receiverSocketID]
                        //var senderSocket = await io.in(senderSocketID).fetchSockets();
                        //var receiverSocket = await io.in(receiversocketID).fetchSockets();

                        var channelName = response.data.channelName;
			io.to(channelName).emit('closeChat',response.data);
                        senderSocket.leave(channelName);
                        receiverSocket.leave(channelName);
//                        io.to(senderSocket.id).emit('closeChat',response.data);
//                        io.to(receiverSocketID.id).emit('closeChat',response.data);
                }).catch((error) => {console.error(error);});


        });
	*/

	socket.on('webRTCOffer',async function(data){
                if(objectSchema.webRTCOfferValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : webRTCOffer');
                        return;
                }

		util.writeLog('Info',data);

                var getSocketIDObject = new Object();
                getSocketIDObject.uid = data.receiverUid;
                var receiverSocketID;

                await axios.get(apiServer+'/api/socket/socketid', {data : getSocketIDObject}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log('socketid : ')
                        console.log(response.data);
                        receiverSocketID = response.data.socketID;
                });

		if(receiverSocketID != null) {
			io.to(receiverSocketID).emit('webRTCOffer',data);
		} else {
			util.writeLog('Error','webRTCOffer : There is No SocketID')
			return;
		}
	});

	socket.on('webRTCAnswer',async function(data){
                if(objectSchema.webRTCAnswerValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : webRTCAnswer');
                        return;
                }

		util.writeLog('Info',data);

                var getSocketIDObject = new Object();
                getSocketIDObject.uid = data.receiverUid;
                var receiverSocketID;

                await axios.get(apiServer+'/api/socket/socketid', {data : getSocketIDObject}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log('socketid : ')
                        console.log(response.data);
                        receiverSocketID = response.data.socketID;
                });

                if(receiverSocketID != null) {
                        io.to(receiverSocketID).emit('webRTCAnswer',data);
                } else {
                        util.writeLog('Error','webRTCOffer : There is No SocketID')
                        return;
                }
	});

	socket.on('webRTCCandidate',async function(data){
                if(objectSchema.webRTCCandidateValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : webRTCCandidate');
                        return;
                }

		util.writeLog('Info',data);

                var getSocketIDObject = new Object();
                getSocketIDObject.uid = data.receiverUid;
                var receiverSocketID;

                await axios.get(apiServer+'/api/socket/socketid', {data : getSocketIDObject}, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log('socketid : ')
                        console.log(response.data);
                        receiverSocketID = response.data.socketID;
                });

                if(receiverSocketID != null) {
                        io.to(receiverSocketID).emit('webRTCCandidate',data);
                } else {
                        util.writeLog('Error','webRTCOffer : There is No SocketID')
                        return;
                }
	})

	/*
       socket.on('requestChat',async function(data){


                //validation check
                if(objectSchema.requestChatValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : requestChat');
                        return;
                }

                util.writeLog('Info',data);

		var getSocketIDObject = new Object()
		getSocketIDObject.uid = data.receiverUid
		var receiverSocketID;
                await axios.get(apiServer+'/api/user/action', getSocketIDObject, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			receiverSocketID = response.data.socketID;
                });

		data.requestID = randomInt()

                await axios.patch(apiServer+'/api/user/action', data, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			io.to(socket.id).emit('requestChat',response.data);
			io.to(receiverSocketID).emit('requestChat',response.data);
                });


        });

        socket.on('requestChatConfirm',async function(data){


                //validation check
                if(objectSchema.requestChatConfirmValid(data) == false) {
                        util.writeLog('Error','There is Missing Key(s) : requestChatConfirm');
                        return;
                }

                util.writeLog('Info',data);

		var requestIDObject = new Object()
		requestIDObject.requestID = data.requestID;


		var senderSocketID;
		var receiverSocketID;
                await axios.patch(apiServer+'/api/user/action', requestIDObject, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
			senderSocketID = response.data.senderSocketID;
			receiverSocketID = response.data.receiverSocketID;
                });



               	data.channelID = randomInt()
		data.channelName = uuidV4()

                await axios.patch(apiServer+'/api/user/action', data, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);

			if(response.data.open == true){
				var senderSocket = await io.in(senderSocketID).fetchSockets();
				var receiverSocket = await io.in(receiverSocketID).fetchSockets();

				var channelName = response.data.channelName;
				senderSocket.join(channelName)
				receiverSocket.join(channelName)
				response.data.connectionID = 1
                                io.to(senderSocket.id).emit('requestChatConfirm',response.data);
				response.data.connectionID = 2
                                io.to(receiverSocketID.id).emit('requestChatConfirm',response.data);
			} else {
	                        io.to(senderSocketID).emit('requestChatConfirm',response.data);
	                        io.to(receiverSocketID).emit('requestChatConfirm',response.data);
			}
                });


        });
	*/

};

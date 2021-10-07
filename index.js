const port = 3001;

var fs = require('fs');
var https = require('https').createServer({
	key: fs.readFileSync('./cert/key.pem'),
	cert: fs.readFileSync('./cert/cert.pem'),
	ca : fs.readFileSync('./cert/ca.pem'),
	requestCert: false,
        rejectUnauthorized: false
});

//var io = require('socket.io')(port)
var io = require('socket.io')(https)
//var userHandler = require('./handler/userHandler');
var webRTCHandler = require('./handler/webRTCHandler');
var util = require('./handler/util/utils');
var axios = require('axios');
//https.listen(port);
const apiServer = "http://10.244.4.2:8000";
console.log('server on port '+port);





io.sockets.on('connection',async function(socket){


	console.log('connected ' + socket.id);
	//userHandler(io,socket,util,axios,apiServer);
	webRTCHandler(io,socket,util,axios,apiServer);
	/*
	socket.on('disconnect',async function(){
		var mapObject = new Object();
		mapObject.socketID = socket.id;
		console.log(mapObject)
		 await axios.delete(apiServer+'/api/socket/unmap', { data : mapObject }, {
                        headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                        }
                }).then((response) => {
                        console.log(response.data);
                });
	})
	*/

});

https.listen(port)


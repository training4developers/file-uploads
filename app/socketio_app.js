module.exports = function(app) {

	app.use(require("express").static(app.config.rootFolder));

	require('socket.io')(app.httpServer)
		.on('connection', function(socket){

			console.log('a user connected');

		  socket.on('disconnect', function(){
		    console.log('user disconnected');
		  });

			socket.on("upload file", function(data) {
				socket.emit("upload result", "bytes recieved: " + data.length);
			});

		});

};

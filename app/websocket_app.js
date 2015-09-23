module.exports = function(app) {

	app.use(require("express").static(app.config.rootFolder));

	new (require('ws').Server)({ server: app.httpServer })
		.on("connection", function(ws) {

			ws.on("error", function(data) {
				console.log("ws error: " + data);
			});

			ws.on("close", function(data) {
				console.log("ws close");
			});

			ws.on("message", function(data) {
				console.log("ws message");
				ws.send("byte received: " + data.length);
			});

		});

};

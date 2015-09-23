module.exports = {

	createApp: function(appConfig) {

		var
			http = require("http"),
			express = require("express"),
			app = express(),
			httpServer = http.createServer(app);

		app.httpServer = httpServer;
		app.config = appConfig;

		return app;
	},

	startApp: function(serverModuleFileName, appConfig) {

		var app = this.createApp(appConfig);

		require(serverModuleFileName)(app);

		app.httpServer.listen(appConfig.port, function() {
			console.log("http server started on port " + appConfig.port);
		});
	}

};

module.exports = function(grunt) {

	var appFactory = require("./app/app");

	grunt.initConfig({
		app: {
			rootFolder: "app/www",
			uploadsFolder: "app/uploads",
			childApps: {
				"appMain": { port: 8080 },
				"appWebSockets": { port: 8081 },
				"appSocketIO": { port: 8082 }
			}
		}
	});

	function loadConfig(appName) {
		var appConfig = grunt.config("app");
		appConfig.port = appConfig.childApps[appName].port;
		return appConfig;
	}

	function getModulePath(moduleName) {
		return require("path").join(__dirname, "app", moduleName);
	}

	grunt.registerTask("web-sockets", "start a web socket upload server", function() {
		appFactory.startApp(getModulePath("websocket_app"), loadConfig("appWebSockets"));
	});

	grunt.registerTask("socket-io", "start a socket io upload server", function() {
		appFactory.startApp(getModulePath("socketio_app"), loadConfig("appSocketIO"));
	});

	grunt.registerTask("main", "start a main web page", function() {
		appFactory.startApp(getModulePath("main_app"), loadConfig("appMain"));
		this.async();
	});

	grunt.registerTask("default", "start all upload servers",
		["web-sockets", "socket-io", "main"]);

};

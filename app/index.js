var
	appFactory = require("./app"),
	config = {
		app: {
			rootFolder: "app/www",
			uploadsFolder: "app/uploads",
			childApps: {
				"appMain": { port: 8080, caption: "home", main: true },
				"appWebSockets": {
					port: 8081,
					caption: "File Uploads with Plain Web Sockets",
					index: "index_websockets_upload.html"
				},
				"appSocketIO": {
					port: 8082,
					caption: "File Uploads with Socket.IO using Web Sockets",
					index: "index_socketio_upload.html"
				}
			}
		}
	};

function loadConfig(appConfig, appName) {
	appConfig.port = appConfig.childApps[appName].port;
	return appConfig;
}

function getModulePath(moduleName) {
	return require("path").join(__dirname, moduleName);
}

appFactory.startApp(
	getModulePath("websocket_app"),
	loadConfig(config.app, "appWebSockets")
);

appFactory.startApp(
	getModulePath("socketio_app"),
	loadConfig(config.app, "appSocketIO")
);

appFactory.startApp(
	getModulePath("main_app"),
	loadConfig(config.app, "appMain")
);

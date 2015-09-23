module.exports = function(app) {

	var path = require("path");

	app.use("/css", require("express")
		.static(path.join(app.config.rootFolder, "css")));

	app.use("/js", require("express")
		.static(path.join(app.config.rootFolder, "js")));

	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.get('/', function(req, res) {

		var rootUrl = req.protocol + "://" + req.hostname + ":";

		function getChildApp(childAppKey) {
			return app.config.childApps[childAppKey]
		}

	  res.render('index', {
			demos: Object.keys(app.config.childApps).filter(function(childAppKey) {
				return !getChildApp(childAppKey).main;
			}).map(function(childAppKey) {
				var childApp = getChildApp(childAppKey);
				return {
					url: rootUrl + childApp.port + "/" + childApp.index,
					caption: childApp.caption
				};
			})
		});
	});

};

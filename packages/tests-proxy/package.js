Package.describe({
	name: "velocity:test-proxy",
	summary: "Dynamically created package to expose test files to mirrors",
	version: "0.0.4",
	debugOnly: true
});

Package.onUse(function (api) {
	api.use("coffeescript", ["client", "server"]);
    api.add_files("tests/jasmine/client/integration/ui.js",["client"]);
    api.add_files("tests/jasmine/client/unit/basic/logic.js",["client"]);
});

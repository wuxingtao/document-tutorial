var server = require("./route_server(路由)");
var router = require("./router");

server.start(router.route);
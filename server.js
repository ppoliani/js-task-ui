var http = require('http'),
    finalhandler = require('finalhandler');
    serveStatic = require('serve-static');

var serve = serveStatic("./"),

    server = http.createServer(function(req, res){
        var done = finalhandler(req, res);
        serve(req, res, done);
    });

var listen = exports.listen = function(port, host) {
    server.listen(port, host, function() {
        var info = server.address();
        console.log("Server listening on http://%s:%d", info.address, info.port);
    });
};

if (require.main === module) {
    listen(
        process.env.PORT || 8088,
        process.env.HOST || "localhost"
    );
}

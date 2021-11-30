let http = require("http");
let port = 9000;

function sayHello() {
    return "Hello World from Node";
}

let server =  http.createServer(function (request, response) {
    response.end(sayHello());
})

server.listen(port, function () {
    console.log("server listening on port " + port);
})

let http = require("http");
let url = require("url");
let fs = require("fs");
let port = 9000;

let server = http.createServer(function(req, res) {
  res.writeHead(200, {"Access-Control-Allow-Origin": "*"});
  let urlParts = url.parse(req.url, true);

  let permittedFiles = /(.html|.js)/gi;

  if (urlParts.path.search(permittedFiles) !== -1) {
    fs.readFile(__dirname + urlParts.path, function(err, file) {
      if (urlParts.path.indexOf(".html")) {
        res.writeHead(200, {"Content-Type": "text/html"});
      } else {
        res.writeHead(200, {"Content-Type": "text/javascript"});
      }

      res.end(file);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, function() {
  console.log("Server listening on " + port);
});
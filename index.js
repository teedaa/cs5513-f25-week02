//use http package from node.js
const myhttp = require("http");

//load core node filesystem module
const fs = require("fs").promises;

function serveFile(myresponse, filePath, contentType) {
    return fs.readFile(filePath)
    .then(content => {
        myresponse.writeHead(200, {"Content-Type": contentType + "; charset=UTF-8"});
        myresponse.end(content);
    });
}

const requestListener = function (myrequest, myresponse) { 
    console.log(myrequest.url);
    //return html file
    if (myrequest.url === "/") {
        serveFile(myresponse, __dirname + "/one.html", "text/html");
    } 
    else {
    //return json data
        serveFile(myresponse, __dirname + "/data.json", "application/json")
    }
};
//use http package createServer()
let myserver = myhttp.createServer(
    requestListener
);

//ask http server to start listening on a tcp port for incoming http requests 
myserver.listen(8080, "127.0.0.1");
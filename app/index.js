var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World!");
});

app.listen(3141);
console.log("Listening on port 3141");

var path = require("path");

var express = require("express");

// Make our experess instance
var app = express();

// Setup our middleware
app.use(app.router);
app.use(express.static(path.normalize(__dirname + "/../static")));
app.use(express.errorHandler());

// Setup our template engine
app.set("views", path.normalize(__dirname + "/../client"));
app.set("view engine", "jade");

app.get("/", function(req, res){
    res.render("index");
});

app.listen(3141);
console.log("Listening on port 3141");

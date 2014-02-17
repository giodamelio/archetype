var path = require("path");

var express = require("express");
var browserify = require("browserify-middleware");

// Make our experess instance
var app = express();

// Setup our middleware
app.use(app.router);
app.use(express.static(path.normalize(__dirname + "/../static")));
app.use(express.errorHandler());

// Setup our template engine
app.set("views", path.normalize(__dirname + "/../client"));
app.set("view engine", "jade");

// The root of our app
app.get("/", function(req, res){
    res.render("index");
});

// Serve our browserify-ed javascript
app.get("/bundle.js", browserify(path.normalize(__dirname + "/../client/main.js")));

app.listen(3141);
console.log("Listening on port 3141");

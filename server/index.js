var path = require("path");

var express = require("express");
var browserify = require("browserify-middleware");
var helmet = require("helmet");

// Make our experess instance
var app = express();

// Configuration

// All environments
app.configure(function(){
    // Use helmet to protect from various attacks
    helmet.defaults(app);

    // Serve our static routes
    app.use(express.static(path.normalize(__dirname + "/../static")));

    // Hangle Errors
    app.use(express.errorHandler());

    // Parse cookies and keep sessions
    app.use(express.cookieParser());
    app.use(express.session({ secret: "secret goes here" }));
    app.use(express.urlencoded())
    app.use(express.json())

    // Protect from csrf attacks
    app.use(express.csrf());

    // Setup our template engine
    app.set("views", path.normalize(__dirname + "/../client"));
    app.set("view engine", "jade");
})

// Development only
app.configure("development", function(){
    // Devolpment errors
    app.use(express.errorHandler());
})

// Production only
app.configure("production", function(){
})

// The root of our app
app.get("/", function(req, res){
    res.render("index");
});

// Serve our browserify-ed javascript
app.get("/bundle.js", browserify(path.normalize(__dirname + "/../client/main.js")));

app.listen(3141);
console.log("Listening on port 3141");

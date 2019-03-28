var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser'); // Post Body Request
var mongoose = require('mongoose'); // MongoDB ORM
var path = require("path");
var routes = require("./")



// Require all models

var PORT = process.env.Port || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Handlebars as templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Make public a static folder
app.use(express.static(path.join('./public')));

// Import routes and give the server access to them.
require("./controllers/app-controller")(app);
// require("./controllers/notes-controller")(app);

////////////////////////////// Connect to DB \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tinfoilMongoose";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
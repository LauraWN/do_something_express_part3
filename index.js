var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname + "/public")));

var listsController = require("./app/controllers/lists");
var tasksController = require("./app/controllers/tasks");

app.get("/", function(req, res){
  //shows the routes
  var raw = listsController.stack.concat(tasksController.stack);
  var output = "<pre>";
  for(var r = 0; r < raw.length; r++){
    output += raw[r].route.stack[0].method + " " + raw[r].route.path + "\n";
  }
  res.send(output + "</pre>");
});

app.use("/", listsController);
app.use("/", tasksController);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});

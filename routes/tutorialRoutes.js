var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
var dBTutorials = require("../models/tutorials");
var dBTodo = require("../models/todo");
//var dBLinks = require("../models/tasks");
var dbHandler = require ("./dbHandler");

var mongoose = require("mongoose");
promise.promisifyAll(mongoose);

//INDEX ROUTES###########################
router.get("/tutorials", function(req, res){
   promise.props({
    tutorials:   dBTutorials.find().execAsync(),
    //links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dBTodo.findOne({'result': req.params.id }).execAsync(),//req.body.taskId
    //magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
    console.log("Aufruf von dbHandler");
    console.log(results.tutorials[0]);
    dbHandler.getTasks(results,res,"tutorials/index");
     //res.render("painting/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//NEW ROUTES###########################


//CREATE ROUTES###########################
router.post("/tutorials/new", function(req, res){
  console.log("Route: Tutorial create");
   dBTutorials.create(req.body.tutorials, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect("/composition/new");
   }
  });
});
//SHOW ROUTES###########################
//ANZEIGE eines Tutorials

//EDIT ROUTES###########################
//Seite zum Bearbeiten eines Tutorials

//UPDATE ROUTES###########################
//Bearbeiten eines Tutorials

//DESTROY ROUTES###########################
//Löschen eines Tutorials

module.exports = router;
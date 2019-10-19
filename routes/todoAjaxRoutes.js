
var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var http = require('http');
var router = express.Router();
var dBTasks = require("../models/tasks");
promise.promisifyAll(mongoose);


router.get("/readTaskData/:id",function(req,res){
  console.log("Funktion: readTaskData");
  dBTasks.findById(req.params.id,function(err,result){
    if(err){
      res.render("error", {error: err});
     }else{
      console.log("result:"+result);
      res.send(result);
     }
    });
});
//Speichern eines Tasks###########################
router.post("/saveTask",function(req,res){
  console.log("Ajax Route: SaveTask");
  var task = [{task:req.body.task,todoID:req.body.todoID}];
  dBTasks.create(task, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("newEntry:"+newEntry);
    //res.redirect("/todo/"+ newEntry._id+"/edit");
   }  
  });
});

router.post("/addArrayElement/:id",function(req,res){
  console.log("Ajax Route: addArrayElement");
  console.log("ID des Tasks:"+req.params.id);
  console.log("Wert der übergebenen Daten:"+req.body.link);
  var query={};
  var element;
  if(req.body.link && !req.body.subTasks){
    query={links:req.body.link};
    element=req.body.link;
    console.log(query);
  }else if(!req.body.link && req.body.subTasks){
    param="subtasks";
    element=req.body.subTasks;    
  }else{
    console.log("Fehler in der Parameterliste des Formulars");
  }
  
  dBTasks.findOneAndUpdate({_id: req.params.id},{$push:query}, function(err, updatedPost){
    if(err){
      //Funktion wird korrekt aufgerufen, aber der gespeicherte Datensatz schient fehlerhaft. Mit Compass prüfen (DOWNLOAD!)
       console.log("Something wrong when updating data!");
    }
      console.log("updatedPost Template:"+updatedPost);
      res.send(updatedPost);
  });  
});
/*
router.post("/addLink/:id",function(req,res){
  console.log("Ajax Route: addLink");
  console.log("ID des Tasks:"+req.params.id);
  console.log("Wert der übergebenen Daten:"+req.body.link);
  dBTasks.findOneAndUpdate({_id: req.params.id},{$push:{links: req.body.link}}, function(err, updatedPost){
    if(err){
      //Funktion wird korrekt aufgerufen, aber der gespeicherte Datensatz schient fehlerhaft. Mit Compass prüfen (DOWNLOAD!)
       console.log("Something wrong when updating data!");
       res.send (err);
    }
      console.log("updatedPost Template:"+updatedPost);
      res.send(updatedPost);
  });  
});

router.post("/addSubTask/:id",function(req,res){
  console.log("Ajax Route: addSubTask");
  console.log("ID des Tasks:"+req.params.id);
  console.log("Wert der übergebenen Daten:"+req.body.subTasks);//oder subTasks
  dBTasks.findOneAndUpdate({_id: req.params.id},{$push:{subTasks: req.body.subTasks}}, function(err, updatedPost){
    if(err){
      //Funktion wird korrekt aufgerufen, aber der gespeicherte Datensatz schient fehlerhaft. Mit Compass prüfen (DOWNLOAD!)
       console.log("Something wrong when updating data!");
       res.send (err);
    }
      
      console.log("updatedPost Template:"+updatedPost);
      res.send(updatedPost);
  });  
});
*/
//Löschen eines Tasks###########################
/*router.post("/deleteTask",function(req,res){
  console.log("Ajax Route: deleteTask");
  console.log("ID:" + req.body.data);
});*/

//Aktualisieren des Status eines Tasks###########################
router.post("/updateStatus/:id",function(req,res){
  console.log("Funktion: UpdateStatus:" + req.params.id);
  //console.log("erhaltener Status:" + req.body.data.status);
    dBTasks.findOneAndUpdate({"_id":req.params.id},{status:req.body.data.status},{new : true}, function(err, result){ //new:true um geändertes statt Originaldokument zurückzugeben
    if(err){
//ES wird nicht der korrekte datensatz geupdated
      //Funktion wird korrekt aufgerufen, aber der gespeicherte Datensatz schient fehlerhaft. Mit Compass prüfen (DOWNLOAD!)
      console.log("Something wrong when updating data!");
      res.send (err);
    }
      console.log("geupdatede ID:" + result._id);
      res.send (result);
  }); 
});

/////////////////////////////////////////////////////////////////////////


module.exports = router;
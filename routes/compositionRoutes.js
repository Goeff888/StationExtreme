var express = require ("express");
var router = express.Router();
var http = require('http');
var promise = require('bluebird');
var path = require('path');
const fileUpload = require('express-fileupload');
//var formidable = require('formidable');
var fs = require('fs');
var dBComposition = require("../models/composition");
var dBTutorials = require("../models/tutorials");
var dBComments = require("../models/comments");
var dbCategories = require("../models/categories");
//var dBTasks = require("../models/tasks");
var mongoose = require("mongoose");
//promise.promisifyAll(mongoose);
router.use(fileUpload());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));

//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/composition", function(req, res){
   promise.props({
     composition: dBComposition.find().execAsync(),
     tutorials:   dBTutorials.find().execAsync(),
   })
   .then(function(results) {
    //console.log(results);
     res.render("compositions/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//NEW ROUTES###########################

//Anzeige der Blender-Seite zum Hinzufügen von Bildern
router.get("/composition/new", function(req, res){
 console.log("Route: Compositions new");
 //Inhalte laden: Kategorien ,Tutorials
   promise.props({
     categories:  dbCategories.find().execAsync(),
     tutorials:   dBTutorials.find().execAsync(),
   })
   .then(function(results) {
    //console.log(results);
     res.render("compositions/new", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   }); 

 
 //res.render ("compositions/new");
});

//Anzeige der Blender-Seite zum Hinzufügen von Kommentaren
/*router.get("/composition/:id/comments/new", function(req, res){
 console.log("Neuer Comment in Composition");
 dBComposition.findById(req.params.id, function(err, composition){
 if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    console.log("Eintrag gefunden");
     //res.send("Hallo");
     res.render ("comments/new",{composition:composition});
    } 
  
  });
});*/
//CREATE ROUTES###########################
//Hinzufügen eines neuen Bildes
router.post("/composition/new",function(req,res){
    console.log("Post Route für composition");
    
    var composition = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.name}];
    // Datei hochladen
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.renderedImage;
    console.log(req.body.name);
    console.log(sampleFile.name);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/images/compositions/' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    dBComposition.create(composition, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
      res.redirect("/composition");
     }else{
     console.log(newEntry);
     
      res.redirect("/composition");
     }
    });
   });
   
    //Datenbankeintrag erzeugen

    //Show-Seite laden

 });

router.post("/upload",function(req,res){
    console.log("Post Route:  Upload");
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.renderedImage;
 console.log(req.body.name);
 console.log(sampleFile.name);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('public/images/compositions/' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });

 });
//Hnzufügen eines neues Tutorial
/*router.post("/tutorials/new",function(req,res){
    console.log("Post Route für neues Tutorial");
    dBTutorials.create(req.body.tutorials, function(err, newEntry){
    if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    console.log(newEntry);
     res.redirect("/composition");
    }
   });
 });*/

//Hinzufügen von Kommentaren zu einem Bild
/*router.post("/composition/:id/comments", function(req, res){
 console.log("Neuer Comment in Composition");
 dBComposition.findById(req.params.id, function(err, composition){
 if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    dBCommments.create(req.body.comment,function(err, comment){
     if(err){
      console.log(err);
      res.redirect("/composition");
    }else{
     composition.comments.push(comment);
     composition.save();
     console.log( "composition/" + composition._id);
     res.redirect ("/composition/" + composition._id);
    } 
   });
  }});
});*/
//SHOW ROUTES###########################
//Anzeige eines Composition-Eintrags
router.get("/composition/:id", function(req, res){
  console.log("Route für die Anzeige einer Composition-Detailseite ");
    dBComposition.findById(req.params.id).populate("comments").exec(function(err, entries){
    if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    //console.log(req.body.codingUnitPost.sectionID);
    //console.log(newEntry);
     res.render("compositions/show",{composition: entries});
     
    }
   });
 });
//EDIT ROUTES###########################
//Seite zum Bearbeiten von Bildern auf Blender-Seite
router.get("/composition/:id/edit", function(req, res){
 res.render ("compositions/edit");
});
//UPDATE ROUTES###########################
//Bearbeiten eines Bildeintrags

//DESTROY ROUTES###########################
//Löschen von Bildern auf Blender-Seite
router.delete("/composition/edit", function(req, res){
 res.render ("compositions/show");
});

module.exports = router;
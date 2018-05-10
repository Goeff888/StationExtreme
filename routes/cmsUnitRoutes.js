var express = require ("express");
var router = express.Router();

var dBCMS = require("../models/cms");
var dBCMSUnit = require("../models/cmsUnit");

function createNewEntry(task,id){
 var newEntry = {task:"Hallo" , todoID:id};
 dBCMSUnit.create(newEntry,function(err,newEntry){
  if(err){
   console.log(err);
   console.log(task);
   //res.render("error", {error:err});
  }else{
   console.log("Unterabschnitt hinzugefügt:" +newEntry);
  }
 });
}



//INDEX ROUTES###########################
//Anzeige aller Unterabschnitte

//NEW ROUTES###########################
//Anzeige der Seite für neuen Unterabschnitt 
router.get("/cms/:id/new", function(req, res){
 console.log("CMS New Seite");
 promise.props({
     cms:       dBCMS.find().execAsync(),
     cmsUnit:   dBCMSUnit.find().execAsync(),
     //hier Suche nach Posts einfügen
   })
   .then(function(results) {
    console.log(results.cmsUnit);
     res.render("cms/new", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//CREATE ROUTES###########################
//neuer Eintrag
router.post("/cms/:id/cmsUnit", function(req, res){
 console.log("Create Route: cmsUnit");
 dBCMS.findById(req.params.id, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
   dBCMSUnit.create(req.body.cmsUnit, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect ("/cms/new");
   }
  });

  }
 }); 

});
//SHOW ROUTES###########################
//ANZEIGE eines Posts

//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Posts
router.get("/cms/:id/cmsUnit/:id/edit", function(req, res){

});
//UPDATE ROUTES###########################
//Bearbeiten einer Posts
router.put("/cms/:id/edit", function(req, res){
  dBCodingPost.findByIdAndUpdate(req.params.id, entries, function(err, updatedPost){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("cms/edit", {todo: updatedPost});
   }
 });
});
//DESTROY ROUTES###########################
//Löschen einer Posts
router.delete("/cms/unit/:id", function(req, res){
  dBCodingUnit.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("Eintrag entfernt");
      res.redirect("/todo");
     }
  }); 
});

module.exports = router;
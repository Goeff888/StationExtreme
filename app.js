//////VARIABLES////////
var bodyParser = require("body-parser"); //Request Data from Form in HTML-Body
var methodOverride = require("method-override");
var express = require ("express");
var mongoose = require("mongoose");
var todoRoutes = require("./routes/todoRoutes");
var taskRoutes = require("./routes/taskRoutes");
var todoAjaxRoutes = require("./routes/todoAjaxRoutes");
var cmsRoutes = require("./routes/cmsRoutes");
var cmsUnitRoutes = require("./routes/cmsUnitRoutes");
var cmsPostRoutes = require("./routes/cmsPostsRoutes");
var compositionRoutes = require ("./routes/compositionRoutes");
var tutorialRoutes = require ("./routes/tutorialRoutes");
var commentRoutes = require ("./routes/commentRoutes");
var paintingRoutes = require ("./routes/paintingRoutes");
var mediaRoutes = require ("./routes/mediaRoutes");
var pythonRoutes = require ("./routes/pythonRoutes");
//////MONGO-DATABASE-SCHEMES////////
const fs = require("fs");
var app = express();
//////APP INIT////////
//promise.promisifyAll(mongoose);
//mongodb://user:password@sample.com:port/dbname,{useNewUrlParser: true } 
mongoose.connect("mongodb://localhost/homepage");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use('/settings',express.static(__dirname + 'X:/Media'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(fileUpload());    

//##########################
//////RESTFUL ROUTES////////
//##########################
app.use(todoRoutes);
app.use(taskRoutes);
app.use(todoAjaxRoutes);
app.use(cmsRoutes);
app.use(cmsUnitRoutes);
app.use(cmsPostRoutes);
//app.use(compositionRoutes);
app.use(commentRoutes);
app.use(tutorialRoutes);
app.use(mediaRoutes);
app.use(paintingRoutes);
app.use(pythonRoutes);
//LANDING PAGE
app.get("/", function(req, res){
 res.render ("index");
});
//Anzeige der Fehlerseite
app.get("/error", function(req, res){
  res.render ("error");
});



app.listen(8008,"127.0.0.1", function(){
    console.log("Check Availability of Videos");
    //const path = "public/images/"; WORKING
    const path = "public/videos/";
    if (fs.existsSync(path)) {
     console.log("Zugriff auf Videos");
    }else{
     console.log("Keine VIDEOS!!!!!!!!!!!!!!");
    }
    console.log( "Yoga-Server ist gestartet");
});




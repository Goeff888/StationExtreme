var mongoose =require("mongoose");
var weeklyAssignmentsSchema = new mongoose.Schema({
  file:         {type: String},
  description:    {type: String, default:'Description from Assignements page'},
  
});

var fileSchema = new mongoose.Schema({
  name:         {type: String},
  description:  {type: String, default:'Description of the week'},
  
});

var tutorialsSchema = new mongoose.Schema({
  name: String,
  category:               {type: String, default: 'uncategorized'},//Kurs, Tutorial, Projekt, textur, objekte
  author:                 {type: String},
  company:                {type: String},
  icon:                   {type: String, default: 'n.a.'},
  file:                   {type: fileSchema},
  weeklyAssignments:      {type: weeklyAssignmentsSchema},
  description:            {type: String, default: 'course description from Homepage'},
  weeks:                  {type: Number, default: 0},
});
module.exports = mongoose.model("tutorials", tutorialsSchema);
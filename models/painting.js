var mongoose =require("mongoose");
var historySchema = new mongoose.Schema({
  description:  String, 
  image:        String,
  created:      {type:Date, default: Date.now}
});
var templateSchema = new mongoose.Schema({
  description:  String, 
  image:        String,
  created:      {type:Date, default: Date.now}
});
var paintingSchema = new mongoose.Schema({
  name:         String,
  image:        String,
  description:  {type: String, default: 'n.a'},
  rating:       Number,
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
  status:       {type:Number}, //0 planned, 9: finished , 1:started, 2:in progress, 8:redo again
  history:      [historySchema],//alt.alle Bilder werden hier geladen, der Array hat immer eine feste Reihenfolge lt Manual
  templates:    [templateSchema],
  files:        String, //additional files as zip files
});

module.exports = mongoose.model("Painting", paintingSchema);
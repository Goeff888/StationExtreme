var mongoose =require("mongoose");
var historySchema = new mongoose.Schema({
  description:  String, 
  image:        String,
  intensity:    String,
  ambient:      String,
  causticsVol:  String,
  causticsSurf: String,
  shadow:       String,
  numLights:    Number,
  globalIllu:   String,
  created:      {type:Date, default: Date.now}
});
var templateSchema = new mongoose.Schema({
  description:  String, 
  image:        String,
  created:      {type:Date, default: Date.now}
});
var compositionSchema = new mongoose.Schema({
  name:         String,
  image:        String,
  description:  {type: String, default: 'n.a'},
  rating:       Number,
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
  history:      [historySchema],
  templates:    [templateSchema]//Array aus Bild, Beschreibung, Datum
});

module.exports = mongoose.model("Composition", compositionSchema);


var companySchema = new mongoose.Schema({
  name:         {type: String},
  description:  {type: String, default:'Description of the company'},
  link:         {type: Array},
});
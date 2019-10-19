var authorSchema = new mongoose.Schema({
  name:         {type: String},
  biography:    {type: String, default:'Description from Instructor page'},
  pics:         {type: Array},
});
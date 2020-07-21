const mongoose    = require("mongoose");

var TODOSchema = new mongoose.Schema({
  item: String
});

module.exports =  mongoose.model("Todo", TODOSchema);

const mongoose    = require("mongoose");

var TODOSchema = new mongoose.Schema({
  item: String,
  task_status: String,
  category: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports =  mongoose.model("Todo", TODOSchema);

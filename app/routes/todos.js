const express = require("express"),
      Todo    = require("../models/todos"),
      router  = express.Router();

router.get("/", function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/index", {todos: todos});
    }
  });
});

module.exports = router;

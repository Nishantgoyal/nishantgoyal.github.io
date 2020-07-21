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

// router.get("/new", function(req, res) {
//   res.render("todos/new");
// });

router.post("/", function(req, res) {
  Todo.create(req.body.todo, function(err, todo) {
    if (err) {
      res.send(err);
    } else {
      console.log("TODO Created");
      res.redirect("/todos");
    }
  });
});

module.exports = router;

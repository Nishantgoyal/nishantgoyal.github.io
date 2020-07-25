const express = require("express"),
      Todo    = require("../models/todos"),
      router  = express.Router();

router.get("/", function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/index", {todos: todos, id: null});
    }
  });
});

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

router.get("/:id/edit", function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/index", {todos: todos, id: req.params.id});
    }
  });
});

router.put("/:id", function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, todo) {
    if(err) {
      res.send(err);
    } else {
      console.log("TODO Updated");
      res.redirect("/todos");
    }
  });
});

router.delete("/:id", function(req, res) {
  Todo.findByIdAndDelete(req.params.id, function(err) {
    if(err) { 
      res.send(err);
    } else {
      console.log("TODO Deleted");
      res.redirect("/todos");
    }
  });
});

module.exports = router;

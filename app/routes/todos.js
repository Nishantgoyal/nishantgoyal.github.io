const express = require("express"),
      Todo    = require("../models/todos"),
      router  = express.Router(),
      middleware  = require("../middleware/index");

router.get("/", middleware.isLoggedIn, function(req, res) {
  Todo.find({'author.id': req.user.id}, function(err, todos) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/index", {todos: todos, id: null});
    }
  });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
  Todo.create({
    item: req.body.item,
    category: req.body.category,
    task_status: req.body.task_status,
    type: req.body.type,
    author: {
      username: req.user.username,
      id: req.user.id
    }
  }, function(err, todo) {
    if (err) {
      res.send(err);
    } else {
      console.log("TODO Created");
      res.redirect("/todos");
    }
  });
});

router.get("/:id/edit", middleware.isLoggedIn,function(req, res) {
  Todo.find({'author.id': req.user.id}, function(err, todos) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/index", {todos: todos, id: req.params.id});
    }
  });
});

router.put("/:id", middleware.isLoggedIn,function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, todo) {
    if(err) {
      res.send(err);
    } else {
      console.log("TODO Updated");
      res.redirect("/todos");
    }
  });
});

router.delete("/:id", middleware.isLoggedIn,function(req, res) {
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

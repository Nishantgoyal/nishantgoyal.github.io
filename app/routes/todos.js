const express = require("express"),
      Todo    = require("../models/todos"),
      router  = express.Router(),
      middleware  = require("../middleware/index");

router.get("/", middleware.isLoggedIn, function(req, res) {
  Todo.find({'author.id': req.user.id}, function(err, todos) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/index", {todos: todos, currentTodo: null});
    }
  });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("todos/new");
});

router.post("/", middleware.isLoggedIn, function(req, res) {
  Todo.create({
    item: req.body.item,
    category: req.body.category,
    task_status: "todo",
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

router.get("/:id", middleware.isLoggedIn, function(req, res){
  Todo.findById(req.params.id, function(err, todo) {
    if(err) {
      console.log(err);
    } else {
      Todo.find({'author.id': req.user.id}, function(err, todos) {
        if (err) {
          res.send("Error"); 
        } else {
          res.render("todos/index", {todos: todos, currentTodo: todo});
        }
      });
      // res.render("todos/show", {todo: todo});
    }
  });
});

router.get("/:id/edit", middleware.isLoggedIn,function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) {
      res.send("Error"); 
    } else {
      res.render("todos/edit", {todo: todo});
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

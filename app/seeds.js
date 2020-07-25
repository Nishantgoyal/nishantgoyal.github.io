const Todo    = require("./models/todos");
todoData = [
  { item: "TODO 1" },
  { item: "TODO 2" },
  { item: "TODO 3" },
  { item: "TODO 4" },
  { item: "TODO 5" }
]

function seedTodo() {
  Todo.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Removed All Todos");
      todoData.forEach(function(todo_item) {
        Todo.create(todo_item, function(err, todo) {
          if(err) {
            console.log(err);
          } else {
            console.log("Created TODO..");
          }
        });
      });
    }
  });
}

module.exports = seedTodo;

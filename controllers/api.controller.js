const { remove, find } = require("lodash");
const generateUniqueId = require("../public/javascripts/generateUniqueId.helper");
const { wrapper } = require("../middlewares/error.middleware");

const getId = generateUniqueId("do-");

exports.addTodo = wrapper((req, res) => {
  const { task } = req.body;
  const id = getId();

  const trimedTask = task.trim();

  if (trimedTask.length < 3) {
    throw new Error("Minimum 3 characters!");
  } else if (trimedTask.length > 50) {
    throw new Error("Maximum 50 characters!");
  }

  const newTodo = { task: trimedTask, id };

  req.session.todos.push({ success: true, data: newTodo });

  res.status(200).json({ success: true, data: newTodo });
});

exports.getTodo = (req, res) => {
  const { id } = req.params;

  const todo = find(req.session.todos, (todo) => {
    return todo.data.id === id;
  });

  res.status(200).json(todo);
};

exports.getTodos = (req, res) => {
  const { todos } = req.session;

  res.status(200).json(todos);
};

exports.updateTodo = wrapper((req, res, next) => {
  const { task } = req.body;
  const { id } = req.params;

  const trimedTask = task.trim();

  if (trimedTask.length < 3) {
    throw new Error("Minimum 3 characters!");
  } else if (trimedTask.length > 50) {
    throw new Error("Maximum 50 characters!");
  }

  const todo = find(req.session.todos, (todo) => {
    return todo.data.id === id;
  });

  todo.data.task = trimedTask;

  res.status(200).json(todo);
});

exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  const todo = find(req.session.todos, (todo) => {
    return todo.data.id === id;
  });

  remove(req.session.todos, (todo) => {
    return todo.data.id === id;
  });

  res.status(200).json(todo);
};

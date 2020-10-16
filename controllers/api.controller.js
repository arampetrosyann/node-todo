const { remove, find } = require("lodash");
const generateUniqueId = require("../public/javascripts/generateUniqueId.helper");

const getId = generateUniqueId("do-");

exports.addTodo = (req, res) => {
  const { task } = req.body;
  const id = getId();

  if (task.trim().length < 3) {
    throw new Error("Minimum 3 characters");
  }

  const newTodo = { task, id };

  req.session.todos.push({ success: true, data: newTodo });

  res.status(200).json({ success: true, data: newTodo });
};

exports.getTodo = (req, res) => {
  const todoId = req.params.id;

  const todo = find(req.session.todos, (todo) => {
    return todo.data.id === todoId;
  });

  res.status(200).json(todo);
};

exports.getTodos = (req, res) => {
  const todos = req.session.todos;

  res.status(200).json(todos);
};

exports.updateTodo = (req, res) => {
  const todoId = req.params.id;

  const todo = find(req.session.todos, (todo) => {
    return todo.data.id === todoId;
  });

  todo.data.task = req.body.task;

  res.status(200).json(todo);
};

exports.deleteTodo = (req, res) => {
  const todoId = req.params.id;

  const todo = find(req.session.todos, (todo) => {
    return todo.data.id === todoId;
  });

  remove(req.session.todos, (todo) => {
    return todo.data.id === todoId;
  });

  res.status(200).json(todo);
};

const express = require("express");
const api = express.Router();
const {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/api.controller");

api.route("/api/todos").get(getTodos).post(addTodo);

api.route("/api/todos/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = api;

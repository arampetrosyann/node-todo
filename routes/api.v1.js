const express = require("express");
const api = express.Router();
const {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/api.controller");

api.route("/api").get(getTodos).post(addTodo);

api.route("/api/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = api;

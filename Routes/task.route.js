
const express = require("express");

const taskrouter = express.Router();

const {
    getTasks,
    addTask,
    deleteTask,
    updateTask
} = require("../Controllers/task.controller");


taskrouter.get("/", getTasks);

taskrouter.post("/add", addTask);

taskrouter.delete("/delete/:id", deleteTask);

taskrouter.put("/update/:id", updateTask);


module.exports = taskrouter;

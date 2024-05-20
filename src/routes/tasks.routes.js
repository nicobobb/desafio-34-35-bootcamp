import express from "express";
import {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    editTask,
} from "../controllers/tasks.controller.js";
const route = express.Router();

route
    .post("/", createTask)
    .get("/", getTasks)
    .get("/:id", getTask)
    .put("/:id", editTask)
    .delete("/:id", deleteTask);

export default route;

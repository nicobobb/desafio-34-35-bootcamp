import { Tasks } from "../models/Tasks.js";

const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById({ _id: id });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Tasks({ title, description });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.status(201).json(tasks);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const newTask = await Tasks.findByIdAndUpdate(
            id,
            {
                title,
                description,
            },
            { new: true, runValidators: true }
        );

        if (!newTask) {
            return res.status(404).json({
                ok: false,
                msg: "La tarea no fue encontrada.",
            });
        }

        res.json({
            ok: true,
            msg: "Tarea actualizada correctamente",
            task: newTask,
        });
    } catch (error) {
        console.log("Ha habido un error al actualizar la tarea.");
        res.status(500).json({
            ok: false,
            msg: "Ha habido un error con el servidor",
        });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id);

        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: "La tarea no fue encontrada.",
            });
        }

        await Tasks.deleteOne({ _id: id });

        res.json({
            ok: true,
            msg: "Tarea eliminada correctamente",
        });
    } catch (error) {
        console.log("Ha habido un error al eliminar la tarea.");
        res.status(500).json({
            ok: false,
            msg: "Ha habido un error con el servidor",
        });
    }
};

export { createTask, deleteTask, editTask, getTasks, getTask };

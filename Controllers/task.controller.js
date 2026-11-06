
const taskmodel = require("../Models/task.model");

const getTasks = async (req, res) => {
    const allTasks = await taskmodel.find();
    res.json(allTasks);
};

const addTask = async (req, res) => {
    const task = await taskmodel.create(req.body);
    res.json(task);
};

const deleteTask = async (req, res) => {
    const id = req.params.id;

    await taskmodel.findByIdAndDelete(id);

    res.json({ message: "Task deleted successfully" });
};

const updateTask = async (req, res) => {
    const id = req.params.id;

    const updatedTask = await taskmodel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json(updatedTask);
};

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask
};


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    priority: {
        type: String,
        default: "Medium"
    },

    completed: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const taskmodel = mongoose.model("Task", taskSchema);

module.exports = taskmodel;

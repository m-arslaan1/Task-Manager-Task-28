const Task = require("../models/taskModels.js");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error: error });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

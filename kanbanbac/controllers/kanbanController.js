const Task = require("../models/kanbanSchema");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
};
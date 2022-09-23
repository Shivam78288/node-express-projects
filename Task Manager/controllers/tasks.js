const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../Errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const item = await Task.findOne({ _id: id });
  if (!item) {
    return next(createCustomError(`No task with ID: ${req.params.id}`, 404));
  }
  res.status(200).json({ item });
});

const createTask = asyncWrapper(async (req, res, next) => {
  let { name, completed } = req.body;
  const newTask = new Task({ name, completed });
  await newTask.save();
  res.status(201).json({ newTask });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const item = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true, // to return the updated item
    runValidators: true, //use validations defined in schema
  });
  if (!item) {
    return next(createCustomError(`No task with ID: ${req.params.id}`, 404));
  }
  res.status(200).json({ item });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const item = await Task.deleteOne({ _id: id });
  if (!item) {
    return next(createCustomError(`No task with ID: ${req.params.id}`, 404));
  }
  res.status(200).json({ item });
});

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};

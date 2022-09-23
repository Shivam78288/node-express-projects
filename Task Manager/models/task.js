const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    minlength: [3, "name cannot be less than 3 characters"],
    maxlength: [20, "name cannot be more than 20 characters"],
  },

  completed: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

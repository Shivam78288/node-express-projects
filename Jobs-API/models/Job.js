const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: [
        60,
        "Length of company name must be less than or equal to 60",
      ],
      minlength: [
        3,
        "Length of company name must be greater than or equal to 3",
      ],
    },
    position: {
      type: String,
      required: [true, "Please provide a position name"],
      maxlength: [
        60,
        "Length of position name must be less than or equal to 60",
      ],
      minlength: [
        3,
        "Length of position name must be greater than or equal to 3",
      ],
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobsSchema);

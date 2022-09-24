const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: [3, "Name must be of length greater than or equal to 3"],
    maxlength: [20, "Name must be of length less than or equal to 20"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price of product must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    required: [true, "Product name is required"],
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported", // {VALUE} is the variable passed by us
    },
  },
});

module.exports = mongoose.model("Product", ProductSchema);

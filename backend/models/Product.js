const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  date: { type: Date, default: Date.now },
  image: { type: String }, // Path to uploaded image
});

module.exports = mongoose.model("Product", productSchema);

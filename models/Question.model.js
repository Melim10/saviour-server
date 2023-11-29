const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  postedBy: { type: String },
  title: { type: String, required: true},
  description: { type: String },
  skills: [],
  answers: [],
  solved:{
    type: Boolean,
    default: false
  }
});

module.exports = model("Question", questionSchema);

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const answerSchema = new Schema({
  // Define the properties for each answer object
  postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  description: { type: String },
  when: {type: String},
  question: { type: mongoose.Types.ObjectId, ref: "Question" },
  cool:{type: Boolean, default: false}
});

module.exports = model("Answer", answerSchema);

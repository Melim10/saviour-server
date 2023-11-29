const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const answerSchema = new Schema({
  // Define the properties for each answer object
  postedBy: { type: String },
  description: { type: String },
  // Add more properties as needed
});

module.exports = model("Answer", answerSchema);

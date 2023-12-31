const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  postedBy: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  skills: [],
  answers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }],
  solved: {
    type: Boolean,
    default: false,
  },
  when: {
    type: String,
  },
  userId: {type: String},
});

module.exports = model("Question", questionSchema);

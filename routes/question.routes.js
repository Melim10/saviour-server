const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Question = require("../models/Question.model");

router.get("/questions", (req, res) => {
  Question.find()
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.post("/questions", (req, res) => {
  const { postedBy, title, description, skills, answers } = req.body;

  /*  "What if I don't have all the required fields with information?"  */
  if (postedBy === "" || title === "" || description === "") {
    res.status(400).json({ message: "Provide name, title and description." });
    return; // -> return will stop the code.
  }

  Question.create({ postedBy, title, description, skills, answers })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

router.get("/questions/:questionId", (req, res) => {
  const { questionId } = req.params;
  Question.findById(questionId)
    .then((question) => res.json(question))
    .catch((error) => res.json(error));
});

router.put("/questions/:questionId", (req, res) => {
  // Object destructuring
  const { questionId } = req.params;
  const { postedBy, title, description, skills } = req.body;

  Question.findByIdAndUpdate(questionId, { postedBy, title, description, skills }, { new: true })
    .then(() => {
      res.json({ message: "Question Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update Question." });
    });
});

router.delete('/questions/:questionId', (req,res)=>{
    const {questionId} = req.params; 

    Question.findByIdAndDelete(questionId)
        .then(()=>{
            res.json({message: 'Question deleted'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete a Question'});
        })
})

module.exports = router;

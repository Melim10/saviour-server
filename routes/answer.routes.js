const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer.model')
const Question = require('../models/Question.model')

router.get("/answers", (req,res)=>{
    Answer.find()
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((error)=> {
        res.status(500).json({error: error.message})
    })
})

router.post("/questions/:questionId/addAnswer", (req, res) => {
    const {questionId} = req.params;
    const {  postedBy,
        description,
        when,
        question} = req.body;
  
    if (postedBy === "" || question === "") {
      res.status(400).json({ message: "Provide name, title and description." });
      return;
    }


      Answer.create({ postedBy,
        description,
        when,
        question: questionId})
      .then((newAnswer)=>{
          return Question.findByIdAndUpdate(questionId, {
              $push: {answers: newAnswer._id}
          })
      })
      .then((response)=> res.json(response))
      .catch((error)=> res.json(error))
  });

module.exports = router;

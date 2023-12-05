const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer.model')
const Question = require('../models/Question.model')
const User = require('../models/User.model')

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
    const {postedBy,
        description,
        when,
        question} = req.body;
  
    if (postedBy === "" || question === "") {
      res.status(400).json({ message: "Provide name, title and description." });
      return;
    }


    Answer.create({
        postedBy,
        description,
        when,
        question: questionId
    })
        .then((newAnswer) => {
            // Update both the question and the user
            const updateQuestion = Question.findByIdAndUpdate(questionId, {
                $push: { answers: newAnswer._id }
            });
    
            const updateUser = User.findByIdAndUpdate(postedBy, {
                $push: { answers: newAnswer._id }
            });
    
            // Use Promise.all to wait for both updates to complete
            return Promise.all([updateQuestion, updateUser]);
        })
        .then(() => {
            console.log(postedBy);
        })
        .catch((error) => {
            console.log(error);
        });
        });

        router.get("/answers/:answerId", (req,res)=>{
            const {answerId} = req.params
            Answer.findById(answerId)
            .then((response)=>{
                res.status(200).json(response)
            })
            .catch((error)=> {
                res.status(500).json({error: error.message})
            })
        })
    
router.put("/answers/:answerId", (req, res) => {
            // Object destructuring
            const { answerId } = req.params;
            const { postedBy,
                description,
                when,
            cool} = req.body;
          
            Answer.findByIdAndUpdate(answerId, { postedBy, description, when, cool }, { new: true })
              .then(() => {
                console.log("posted", req.body)
                res.json({ message: "Question Updated!" });
              })
              .catch((error) => {
                res.json({ message: "Failed to Update Question." });
              });
          });
  





module.exports = router;

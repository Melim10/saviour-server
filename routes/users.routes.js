const router = require("express").Router();
const User = require("../models/User.model");
router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});
router.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
  .populate("answers")
  .populate({
    path: 'answers',
    populate: {
      path: 'question',
      model: 'Question',
    }
  })
  
  
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
router.put("/users/:userId/skills", (req, res)=>{
  const { skill} = req.body;
  const {userId} = req.params
  User.findById(userId).then((user)=>{
    
    if (!user) {
      return res.status(404).json({ message: 'No User' });
    }
  
    if (skill) {
      User.findByIdAndUpdate(userId, {$pull: {skills: skill}}, {new: true})
      .then((user)=>{
        updatedSkills = user.skills
        res.status(200).json({ skills: updatedSkills});
      })
      .catch((err)=>{
        res.status(500).json({ message: 'Skill was not removed.' });
      })
    }
    else{
      res.status(500).json({ message: 'Skill was not removed.' });
    }  
  }); 
})
router.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { skills, picture, jobTitle, correctAnswers } = req.body;
  User.findByIdAndUpdate(
    userId,
    {
      $push: { skills: skills },
      picture: picture,
      jobTitle: jobTitle,
      correctAnswers: correctAnswers
    },
    { new: true }
  )
    .then(() => {
      res.json({ message: "User Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update User." });
    });
});
module.exports = router;
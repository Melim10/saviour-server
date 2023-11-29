const router = require("express").Router();
const User = require('../models/User.model');

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
  const {userId} = req.params;
  
  User.findById(userId)
  .then((response)=>{
    res.status(200).json(response)
  })
  .catch((err)=>{
    res.status(500).json({message: err})
  })
});



module.exports = router;

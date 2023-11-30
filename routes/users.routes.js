const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt= require("bcryptjs")

const saltRounds = 10;

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
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, skills, picture, password } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(
    userId,
    {
      $push: { skills: skills },
      name: name,
      picture: picture,
      password: hashedPassword,
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

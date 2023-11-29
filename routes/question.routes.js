const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")

const User = require("../models/User.model")

router.get('/users' , (req,res)=>{
    User.find()
    .then((users)=>{
        res.status(200).json(users)
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({message: err.message})
    })
})


module.exports = router;
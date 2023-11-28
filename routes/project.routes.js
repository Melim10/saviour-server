const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")

const Project = require("../models/Project.model")

router.post("/project", (req, res, next) => {
  Project.create(req.body)
  .then((response)=>{res.json(response)})
  .catch((error)=>{res.json(error)})
});

router.get("/projects", (req, res)=>{
    Project.find()
    .populate('tasks')
    .then((allProjects)=> res.json(allProjects))
    .catch((error)=> res.json(error))
})

router.get("/projects/:projectId", (req, res)=>{
    Project.findById(req.params.projectId)
    .then((project)=> res.json(project))
    .catch((error)=> res.json(error))
})

router.put("/projects/:projectId", (req, res)=>{
    Project.findByIdAndUpdate(req.params.projectId, req.body, {new:true})
    .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to update the project" });
      });
})

router.delete("/projects/:projectId", (req, res)=>{
    Project.findByIdAndDelete(req.params.projectId)
    .then(() => {
        res.status(200).json({message: "Project deleted"});
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to update the project" });
      });
})

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../middleware/authenticate");

//CRUD for job
const createJob = require("./CRUD/createJob");
const getjob = require("./CRUD/getJob");
const updateJob = require("./CRUD/updateJob");
const deleteJob = require("./CRUD/deleteJob");

//get all jobs
const getjobs = require("./getJobs");

//apply to a job
const applyJob = require("./apply/apply");

//crud for job
router.post("/", authenticateToken, createJob);
router.patch("/:id", authenticateToken, updateJob);
router.get("/:id", getjob);
router.delete("/:id", authenticateToken, deleteJob);

//apply to a job
router.post("/:id", authenticateToken, applyJob);

//get all job details
router.get("/", getjobs);

module.exports = router;

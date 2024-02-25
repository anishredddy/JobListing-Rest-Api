const mongoose = require("mongoose");
const joblisting = require("../../../../models/joblisting");

async function applyJob(req, res) {
  try {
    //get job id from params
    const id = req.params.id;

    if (!id) {
      return res.status(400).send("No id provided");
    }

    //get the job details
    const currentJob = await joblisting.findById(id);

    if (!currentJob) {
      return res.status(404).send("Job not found");
    }

    //convert user id from string to of type mongoose object Id
    const userId = new mongoose.Types.ObjectId(req.user.id);

    //find index of userId in the usersapplied array
    const index = currentJob.usersApplied.indexOf(userId);

    //if user id does not exist in the array , index will be -1
    if (index !== -1) {
      currentJob.usersApplied.splice(index, 1);
    } else {
      currentJob.usersApplied.push(userId);
    }

    await currentJob.save(); // Wait for the save operation to complete

    res.status(200).send(index !== -1 ? "Application withdrawn" : "Applied");
  } catch (error) {
    console.log("Apply job error", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = applyJob;

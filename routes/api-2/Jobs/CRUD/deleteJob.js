const jobListing = require("../../../../models/joblisting");

async function deleteJob(req, res) {
  try {
    //check if current user is admin
    if (req.user.role !== "admin") {
      res.status(403).send("Current user is not an admin");
    }

    //find job from id from params
    const id = req.params.id;

    if (!id) {
      res.status(400).send("no id");
    }

    //find a job that is created by currentUser and id is id and delete it
    const currentJob = await jobListing.findOneAndDelete({
      _id: id,
      postedBy: req.user.id,
    });

    if (!currentJob) {
      return res.status(500).send("Job not found / job not posted by user");
    }

    res.status(201).json(currentJob);
  } catch (error) {
    console.log("delete job error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = deleteJob;

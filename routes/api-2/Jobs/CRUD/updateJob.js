const jobListing = require("../../../../models/joblisting");

async function updateJob(req, res) {
  try {
    //check if current User is admin
    //only admin can update
    if (req.user.role !== "admin") {
      return res.status(403).send("Current user is not an admin");
    }

    //get data from request
    const { link, title } = req.body;

    //get job id from params
    const id = req.params.id;

    if (!id) {
      return res.status(400).send("no id");
    }

    //get job
    const currentJob = await jobListing.findById({
      _id: id,
    });

    if (!currentJob) {
      return res.status(500).send("Job not found");
    }

    //check if the job is posted by current user
    //only the user who creted it can update it
    if (currentJob.postedBy.toString() !== req.user.id) {
      return res.status(500).send("You cannot update job");
    }

    if (link) {
      currentJob.link = link;
    }

    if (title) {
      currentJob.title = title;
    }

    currentJob.save();

    res.status(201).json(currentJob);
  } catch (error) {
    console.log("patch job error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = updateJob;

const joblisting = require("../../../../models/joblisting");

async function getjob(req, res) {
  try {
    //get job id from params
    const id = req.params.id;

    if (!id) {
      return res.status(400).send("No id provided");
    }

    //find job
    const currentJob = await joblisting.findById(id);

    if (!currentJob) {
      return res.status(404).send("Job not found");
    }

    res.status(200).json(currentJob);
  } catch {
    console.log("get job error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = getjob;

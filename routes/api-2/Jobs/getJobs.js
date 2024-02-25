const joblisting = require("../../../models/joblisting");

async function getjobs(req, res) {
  try {
    //get all jobs
    const jobs = await joblisting.find({}, "title link");

    res.status(200).json(jobs);
  } catch {
    console.log("get job error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = getjobs;

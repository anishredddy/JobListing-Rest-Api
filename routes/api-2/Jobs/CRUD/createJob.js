const joblisting = require("../../../../models/joblisting");

async function createJob(req, res) {
  try {
    //get dataa from request
    const { link, title } = req.body;

    if (!title) {
      res.status(400).send("No title");
    }
    if (!link) {
      res.status(400).send("No link");
    }

    //check if the current logged in user is admin
    //only admin can create jobs
    if (req.user.role !== "admin") {
      res.status(403).send("current user is not an admin");
    }

    //create job
    const job = new joblisting({
      title,
      link,
      postedBy: req.user.id,
    });

    await job.save();

    res.status(201).json(job);
  } catch (error) {
    console.log("create job error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = createJob;

const User = require("../../../models/user");

async function likedUsers(req, res) {
  try {
    //get all users from db in descending order of points they have
    //only name email points_count githublink and role are displayed
    //to protect other sensitive information
    const users = await User.find(
      {},
      "name email points_count githubLink role"
    ).sort({ points_count: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
}

module.exports = likedUsers;

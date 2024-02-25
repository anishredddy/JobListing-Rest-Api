const User = require("../../../models/user");
const mongoose = require("mongoose");

async function likeUser(req, res) {
  try {
    const userId = req.params.id;

    //to convert string into object Id and verify
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user id");
    }

    //find user and check if he exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    //find current user via jwt token
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).send("Current user not found");
    }

    //check if currentUser already liked user
    const index = user.points.indexOf(currentUser._id);

    if (index !== -1) {
      user.points.splice(index, 1);
      user.points_count -= 1;
    } else {
      user.points.push(currentUser._id);
      user.points_count += 1;
    }

    await user.save(); // Wait for the save operation to complete

    res.status(200).send(index !== -1 ? "Unliked" : "Liked");
  } catch (error) {
    console.error("LIKE ERROR", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = likeUser;

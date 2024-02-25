const User = require("../../../models/user");

async function deleteUser(req, res) {
  try {
    //find current user via jwt session token and delete
    const currentUser = await User.findByIdAndDelete(req.user.id);

    if (!currentUser) {
      res.status(500).send("No user");
    }

    res.status(201).json(currentUser);
  } catch (error) {
    console.log("delete user error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = deleteUser;

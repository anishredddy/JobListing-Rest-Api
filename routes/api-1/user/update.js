const User = require("../../../models/user");
const bcrypt = require("bcryptjs");

async function updateUser(req, res) {
  try {
    //get data from request
    const { name, email, githubLink, password } = req.body;

    //find current user via jwt session token
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      res.status(400).send("Current user not found");
    }

    //check if feild exists, if it exists update else leave it
    if (name) {
      currentUser.name = name;
    }
    if (email) {
      //check if the email given by user already exists in db
      if (await User.findOne({ email })) {
        return res.status(400).send("email alreadt exists in database");
      }
      currentUser.email = email;
    }
    if (githubLink) {
      currentUser.githubLink = githubLink;
    }
    if (password) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      currentUser.password = hashedPassword;
    }

    await currentUser.save();
    res.status(201).json(currentUser);
  } catch (error) {
    console.log("update user error", error);
    res.status(500).send("internal server error");
  }
}

module.exports = updateUser;

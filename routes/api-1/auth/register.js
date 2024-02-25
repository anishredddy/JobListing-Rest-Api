const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

async function registerUser(req, res) {
  try {
    const { name, password, email, githubLink, role } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ name });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user_role = "user";

    if (role) {
      if (role === "admin") {
        user_role = "admin";
      } else {
        user_role = "user";
        //if anything except admin entered , role will be user
      }
    }

    // Create a new user
    user = new User({
      name,
      password: hashedPassword,
      githubLink,
      email,
      role: user_role,
    });

    // Save the user to the database
    await user.save();

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.secretKey,
      { expiresIn: "1h" },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
}

module.exports = registerUser;

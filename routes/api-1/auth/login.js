const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

async function loginUser(req, res) {
  try {
    //extract data
    const { email, password } = req.body;

    //check for email and password
    if (!email) {
      res.status(400).send("No email");
    }
    if (!password) {
      res.status(400).send("No password");
    }

    //find user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    //jwt payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    //signing jwt token
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

module.exports = loginUser;

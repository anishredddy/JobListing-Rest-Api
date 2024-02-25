const express = require("express");
const router = express.Router();

const loginUser = require("./login");
const registerUser = require("./register");

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;

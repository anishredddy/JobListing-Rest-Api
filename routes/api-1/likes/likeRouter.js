const express = require("express");
const likeUser = require("./like");
const likedUsers = require("./getusers");

const authenticateToken = require("../../../middleware/authenticate");
const router = express.Router();

router.post("/:id", authenticateToken, likeUser);
router.get("/users", likedUsers);

module.exports = router;

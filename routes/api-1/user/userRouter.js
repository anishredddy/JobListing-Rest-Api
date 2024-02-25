const express = require("express");
const deleteUser = require("./delete");
const updateUser = require("./update");
const router = express.Router();

router.delete("/delete", deleteUser);
router.patch("/update", updateUser);

module.exports = router;

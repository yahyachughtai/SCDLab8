const express = require("express");
const router = express.Router();
const userController = require("../User/userController");

router.post("/", userController.registerUser);
router.get("/:userId", userController.getUser);
router.put("/:userId", userController.UpdateUser);

module.exports = router;

const express = require("express");
const userControllers = require("../controllers/user.controllers");

const router = express.Router();

router.post("/signup", userControllers.signup);
router.get("/", userControllers.getAllUsers);
router.post("/login", userControllers.login);
router.post(
  "/favoriteMovie",
  userControllers.protectRoutes,
  userControllers.addMovieToFav
);

module.exports = router;

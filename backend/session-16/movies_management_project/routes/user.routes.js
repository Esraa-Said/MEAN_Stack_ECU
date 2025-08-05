const express = require("express");
const userControllers = require("../controllers/user.controllers");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const multerErrorHandler = require("../middleware/multer.error.handler");

router
  .route("/signup")
  .post(upload.single("photo"), multerErrorHandler, userControllers.signup);
router.route("/").get(userControllers.getAllUsers);
router.route("/login").post(userControllers.login);

router.post(
  "/add-fav",
  userControllers.protectRoutes,
  userControllers.addMovieToFav
);

module.exports = router;

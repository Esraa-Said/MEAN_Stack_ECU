const express = require("express");
const movieControllers = require("../controllers/movie.controllers");

const userControllers = require("../controllers/user.controllers");

const router = express.Router();

router
  .route("/")
  .post(movieControllers.createMovie)
  .get( movieControllers.getAllMovies);
router
  .route("/:id")
  .get(movieControllers.getMovieById)
  .patch(movieControllers.updateMovieById)
  .delete(movieControllers.deleteMovieById);

module.exports = router;

const connectDB = require("../config/db");
const Movie = require("../models/movie.model");
const moviesData = require("./movies.json");

const insertMovies = async () => {
  try {
    await connectDB();
    await Movie.insertMany(moviesData);
    console.log("Movies inserted successfully.");
    process.exit();
  } catch (error) {
    console.error("Failed to insert movies:", error.message);
    process.exit(1);
  }
};

const deleteMovies = async () => {
  try {
    await connectDB();
    await Movie.deleteMany();
    console.log("All movies deleted successfully.");
    process.exit();
  } catch (error) {
    console.error("Failed to delete movies:", error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "--insert") {
  insertMovies();
} else if (process.argv[2] === "--delete") {
  deleteMovies();
} else {
  console.log("Unknown command. Use --insert or --delete");
  process.exit();
}

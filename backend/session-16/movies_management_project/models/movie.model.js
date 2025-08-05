const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    unique: true,
    trim: true,
  },
  language: {
    type: String,
    required: [true, "Language is Required"],
    enum: [
      "English",
      "Arabic",
      "Spanish",
      "French",
      "Hindi",
      "Chinese",
      "Japanese",
      "Korean",
      "Other",
    ],
  },
  description: { type: String, required: [true, "Description is Required"] },
  duration: { type: Number, required: [true, "Duration is Required"] },
  ratings: { type: Number, default: 1.0 },
  totalRatings: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release Year is Required"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
    required: [true, "Genres is Required"],
  },
  directors: {
    type: [String],
    required: [true, "Directors is Required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover Image is Required"],
  },
  trailerUrl: {
    type: String,
  },
  actors: {
    type: [String],
    required: [true, "Actors is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price is Required"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

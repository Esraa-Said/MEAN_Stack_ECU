const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const signup = async (req, res) => {
  try {
    let { name, password, confirmPassword, email, photo } = req.body;
    photo = req.file?.filename || "profile.png";

    if (password !== confirmPassword) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, "../uploads", photo));
      }

      return res
        .status(400)
        .json({ status: "fail", message: "Passwords not match" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, "../uploads", photo));
      }
      return res
        .status(400)
        .json({ status: "fail", message: `User already exists` });
    }

    const user = await User.create({ name, password, email, photo });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ status: "success", token, data: { user: user } });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, "../uploads", photo));
    }
    res
      .status(400)
      .json({ status: "fail", message: `Error in sign up ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email or password is missing" });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not Found" });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res
        .status(404)
        .json({ status: "fail", message: "Wrong password" });
    }

    const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ status: "success", token, message: "login" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const protectRoutes = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ status: "fail", message: "not login" });
    }

    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: error.message });
  }
};

const addMovieToFav = async (req, res) => {
  try {
    const userId = req.userId;

    const { movieId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User Not Found" });
    }

    let alreadyAdded = user.favMovies?.includes(movieId);

    if (alreadyAdded) {
      return res
        .status(400)
        .json({ status: "fail", message: "Movie already in your fav list" });
    }

    user.favMovies.push(movieId);
    await user.save();
    res.status(200).json({ status: "success", message: "movie is added" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = { signup, login, protectRoutes, addMovieToFav };

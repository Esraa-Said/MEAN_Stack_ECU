const express = require("express");
const path = require("path");

const movieRouter = require("./routes/movie.routes");
const userRouter = require("./routes/user.routes");

const connectDB = require("./config/db");

const app = express();

require("dotenv").config();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
connectDB();
app.use(express.json());

app.use("/movies", movieRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});

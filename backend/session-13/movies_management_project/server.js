const express = require("express");
const movieRouter = require("./routes/movie.routes");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

connectDB();
app.use(express.json());

app.use("/movies", movieRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});

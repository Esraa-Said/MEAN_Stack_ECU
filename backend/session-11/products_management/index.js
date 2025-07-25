const express = require("express");
const productsRouter = require("./routes/products.routes");



const app = express();

// handle request body
app.use(express.json());


app.use("/api/products", productsRouter);





app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const express = require("express");

const app = express();

app.use(express.json());

let products = [
  { id: 1, productName: "product_1", price: 1000 },
  { id: 2, productName: "product_2", price: 2000 },
  { id: 3, productName: "product_3", price: 3000 },
];

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const id = +req.params.id;

  const product = products.find((product) => {
    return product.id === id;
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ product: product });
});

app.post("/products", (req, res) => {
  let body = req.body;
  if (!body.productName || !body.price) {
    return res
      .status(400)
      .json({ message: "Product name or Price is missing" });
  }
  body = { id: products.length + 1, ...body };
  products.push(body);
  res.status(201).json({newProduct: body});
});

app.listen(5000, () => {
  console.log("Server is Listening");
});

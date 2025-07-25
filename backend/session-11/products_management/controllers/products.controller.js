let products = require("../data/products");



const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const createProduct = (req, res) => {
  let body = req.body;
  if (!body.productName || !body.price) {
    return res
      .status(400)
      .json({ message: "Product Name or Price is missing" });
  }
  body = { id: products.length + 1, ...body };

  products.push(body);
  res.status(201).json({ message: "Product added" });
};

const updateProduct = (req, res) => {
  const id = +req.params.id;
  const body = req.body;
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  products[index] = { ...products[index], ...body };
  res.status(200).json({ message: "Product updated" });
};

const deleteProduct = (req, res) => {
  const id = +req.params.id;

  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  products.splice(index, 1);
  res.status(200).json({ message: "Product deleted" });
};

const getProductId = (req, res) => {
  const id = +req.params.id;

  const product = products.find((product) => product.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  res.status(200).json({ product: product });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductId,
};

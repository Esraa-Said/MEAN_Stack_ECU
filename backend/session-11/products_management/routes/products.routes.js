const productsControllers = require("../controllers/products.controller");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(productsControllers.getAllProducts)
  .post(productsControllers.createProduct);

router
  .route("/:id")
  .patch(productsControllers.updateProduct)
  .delete(productsControllers.deleteProduct)
  .get(productsControllers.getProductId);


module.exports = router;
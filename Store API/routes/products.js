const express = require("express");
const router = express.Router();

const { getProductsStatic, getProducts } = require("../controllers/products");

router.get("/", getProducts);
router.get("/static", getProductsStatic);

module.exports = router;

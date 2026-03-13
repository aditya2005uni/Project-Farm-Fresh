const express = require('express');
const router = express.Router();

const checkAdmin=require("../middleware/checkAdmin");
const auth = require("../middleware/auth");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct
} = require('../controllers/productController');



// Get all products
router.get('/', getProducts);

// Get product by id
router.get('/:id', getProductById);


// Admin only
router.post('/',auth,checkAdmin, createProduct);
// Admin only
router.put('/:id',auth,checkAdmin, updateProduct);


module.exports = router;


// Create product
// router.post('/', createProduct);
// Update product
// router.put('/:id', updateProduct);
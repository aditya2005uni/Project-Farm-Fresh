const express = require('express');
const auth = require("../middleware/auth");
const router = express.Router();

const {
  addToCart,
  viewCart,
  removeFromCart,
  updateCartItem
} = require('../controllers/cartController');

router.post('/add', auth,addToCart);

router.get('/', auth,viewCart);

router.delete('/remove', auth, removeFromCart);

router.put('/update', auth, updateCartItem);

module.exports = router;
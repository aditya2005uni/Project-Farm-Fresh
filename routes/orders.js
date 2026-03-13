const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");

const { 
  checkout, 
  getMyOrders,
  getAllOrders,
  updateOrderStatus 
} = require('../controllers/orderController');

router.post('/checkout', auth, checkout);

router.get('/my-orders', auth, getMyOrders);

router.get('/all', auth, checkAdmin, getAllOrders);

router.put('/:id/status', auth, checkAdmin, updateOrderStatus);

module.exports = router;







// const express = require('express');
// const router = express.Router();

// const { checkout, getMyOrders,getAllOrders,updateOrderStatus } = require('../controllers/orderController');

// router.post('/checkout', checkout);
// router.get('/my-orders', getMyOrders);
// router.get('/all', getAllOrders);
// router.put('/:id/status', updateOrderStatus);
// module.exports = router;
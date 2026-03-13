const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');


const checkout = async (req, res) => {

  const userId = req.user.id;

  try {

    const cart = await Cart.findOne({ user: userId })
      .populate('items.product');

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    let total = 0;

    const items = cart.items.map(item => {

      const price = item.product.price;

      total += price * item.qty;

      return {
        product: item.product._id,
        qty: item.qty,
        priceAtPurchase: price
      };

    });

    const order = new Order({
      user: userId,
      items,
      total
    });

    await order.save();

    // clear cart after checkout
    cart.items = [];
    await cart.save();

    res.status(201).json(order);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: 'Server error' });

  }

};


const getMyOrders = async (req, res) => {

  const userId = req.user.id;

  try {

    const orders = await Order.find({ user: userId })
      .populate("items.product");

    res.json(orders);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};


const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user")
      .populate("items.product");

    res.json(orders);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

};


const updateOrderStatus = async (req, res) => {

  const { status } = req.body;

  try {

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.status = status;

    await order.save();

    res.json(order);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

};


module.exports = {
  checkout,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};
















// const Cart = require('../models/Cart');
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// const checkout = async (req, res) => {
//   const { userId } = req.body;

//   try {

//     const cart = await Cart.findOne({ user: userId })
//       .populate('items.product');

//     if (!cart || cart.items.length === 0)
//       return res.status(400).json({ message: 'Cart is empty' });

//     let total = 0;

//     const items = cart.items.map(item => {

//       const price = item.product.price;

//       total += price * item.qty;

//       return {
//         product: item.product._id,
//         qty: item.qty,
//         priceAtPurchase: price
//       };
//     });

//     const order = new Order({
//       user: userId,
//       items,
//       total
//     });

//     await order.save();

//     cart.items = [];
//     await cart.save();

//     res.status(201).json(order);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getMyOrders = async (req, res) => {

//   const { userId } = req.query;

//   try {

//     const orders = await Order.find({ user: userId })
//       .populate("items.product");

//     res.json(orders);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }

// };

// const getAllOrders = async (req, res) => {

//   try {

//     const orders = await Order.find()
//       .populate("user")
//       .populate("items.product");

//     res.json(orders);

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }

// };

// const updateOrderStatus = async (req, res) => {

//   const { status } = req.body;

//   try {

//     const order = await Order.findById(req.params.id);

//     if (!order)
//       return res.status(404).json({ message: "Order not found" });

//     order.status = status;

//     await order.save();

//     res.json(order);

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }

// };

// module.exports = {
//   checkout,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus
// };
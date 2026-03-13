const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user.id;

  try {

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.qty += qty || 1;
    } else {
      cart.items.push({ product: productId, qty: qty || 1 });
    }

    cart.updatedAt = Date.now();

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const viewCart = async (req, res) => {

  const userId = req.user.id;

  try {

    const cart = await Cart.findOne({ user: userId })
      .populate('items.product');

    if (!cart)
      return res.json({ items: [] });

    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const removeFromCart = async (req, res) => {

  const { productId } = req.body;
  const userId = req.user.id;

  try {

    const cart = await Cart.findOne({ user: userId });

    if (!cart)
      return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.updatedAt = Date.now();

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateCartItem = async (req, res) => {

  const { productId, qty } = req.body;
  const userId = req.user.id;

  try {

    const cart = await Cart.findOne({ user: userId });

    if (!cart)
      return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: 'Item not in cart' });

    item.qty = qty;

    cart.updatedAt = Date.now();

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  addToCart,
  viewCart,
  removeFromCart,
  updateCartItem
};




// const Cart = require('../models/Cart');
// const Product = require('../models/Product');

// const addToCart = async (req, res) => {
//   const { userId, productId, qty } = req.body;

//   try {
//     const product = await Product.findById(productId);
//     if (!product)
//       return res.status(404).json({ message: 'Product not found' });

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       cart = new Cart({ user: userId, items: [] });
//     }

//     const existingItem = cart.items.find(
//       item => item.product.toString() === productId
//     );

//     if (existingItem) {
//       existingItem.qty += qty || 1;
//     } else {
//       cart.items.push({ product: productId, qty: qty || 1 });
//     }

//     cart.updatedAt = Date.now();

//     await cart.save();
//     await cart.populate('items.product');

//     res.json(cart);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const viewCart = async (req, res) => {
//   const { userId } = req.query;

//   try {
//     const cart = await Cart.findOne({ user: userId }).populate('items.product');

//     if (!cart) return res.json({ items: [] });

//     res.json(cart);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const removeFromCart = async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const cart = await Cart.findOne({ user: userId });

//     if (!cart)
//       return res.status(404).json({ message: 'Cart not found' });

//     cart.items = cart.items.filter(
//       item => item.product.toString() !== productId
//     );

//     cart.updatedAt = Date.now();

//     await cart.save();
//     await cart.populate('items.product');

//     res.json(cart);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const updateCartItem = async (req, res) => {
//   const { userId, productId, qty } = req.body;

//   try {
//     const cart = await Cart.findOne({ user: userId });

//     if (!cart)
//       return res.status(404).json({ message: 'Cart not found' });

//     const item = cart.items.find(
//       item => item.product.toString() === productId
//     );

//     if (!item)
//       return res.status(404).json({ message: 'Item not in cart' });

//     item.qty = qty;

//     cart.updatedAt = Date.now();

//     await cart.save();
//     await cart.populate('items.product');

//     res.json(cart);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   addToCart,
//   viewCart,
//   removeFromCart,
//   updateCartItem
// };
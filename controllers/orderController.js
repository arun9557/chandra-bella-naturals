const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorResponse('No order items', 400));
  }

  // Check if products exist and update their quantities
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      return next(
        new ErrorResponse(`Product not found with ID: ${item.product}`, 404)
      );
    }

    if (product.quantity < item.quantity) {
      return next(
        new ErrorResponse(
          `Not enough stock for product: ${product.name}. Only ${product.quantity} available`,
          400
        )
      );
    }
  }

  // Update product quantities
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { quantity: -item.quantity } },
      { new: true, runValidators: true }
    );
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get single order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  // Make sure user is order owner or admin
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to view this order', 401));
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/me
// @access  Private
exports.myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.allOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'id name');
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id
// @access  Private/Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  if (order.isDelivered) {
    return next(new ErrorResponse('Order already delivered', 400));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  
  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Delete order
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  await order.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

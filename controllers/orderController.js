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

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  // Make sure the order belongs to the user or user is admin
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(
      new ErrorResponse('Not authorized to view this order', 401)
    );
  }

  res.status(200).json(order);
});

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  // Make sure the order belongs to the user or user is admin
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(
      new ErrorResponse('Not authorized to update this order', 401)
    );
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  
  const validStatuses = [
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
  ];

  if (!validStatuses.includes(status)) {
    return next(
      new ErrorResponse(
        `Invalid status. Status must be one of: ${validStatuses.join(', ')}`,
        400
      )
    );
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  // If order is being marked as delivered, set deliveredAt
  if (status === 'delivered' && !order.isDelivered) {
    order.deliveredAt = Date.now();
    order.isDelivered = true;
  }

  // If order is being cancelled, return items to stock
  if (status === 'cancelled' && order.status !== 'cancelled') {
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: item.quantity } },
        { new: true, runValidators: true }
      );
    }
  }

  order.status = status;
  order.updatedAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Get monthly income
// @route   GET /api/v1/orders/monthly-income
// @access  Private/Admin
exports.getMonthlyIncome = asyncHandler(async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYear },
        isPaid: true
      }
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$totalPrice"
      }
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" }
      }
    }
  ]);

  res.status(200).json(income);
});

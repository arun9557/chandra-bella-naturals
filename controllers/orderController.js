const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (!order) {
        return next(
            new ErrorResponse(`No order found with id: ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        order
    });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/me
// @access  Private
exports.myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        count: orders.length,
        orders
    });
});

// @desc    Get all orders - ADMIN
// @route   GET /api/orders
// @access  Private/Admin
exports.allOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate('user', 'id name');

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        count: orders.length,
        orders
    });
});

// @desc    Update / Process order - ADMIN
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`No order found with id: ${req.params.id}`, 404)
        );
    }

    if (order.orderStatus === 'Delivered') {
        return next(
            new ErrorResponse('You have already delivered this order', 400)
        );
    }

    // Update stock
    if (req.body.status === 'Shipped') {
        order.orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        order
    });
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`No order found with id: ${req.params.id}`, 404)
        );
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: 'Order is deleted'
    });
});

// Update product stock after order
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}

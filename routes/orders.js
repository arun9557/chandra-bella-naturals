const express = require('express');
const router = express.Router();
const {
  createOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(protect, createOrder)
  .get(protect, authorize('admin'), allOrders);

router
  .route('/me')
  .get(protect, myOrders);

router
  .route('/:id')
  .get(protect, getSingleOrder)
  .put(protect, authorize('admin'), updateOrder)
  .delete(protect, authorize('admin'), deleteOrder);

module.exports = router;

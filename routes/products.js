const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
  getProductsByCategory,
  getFeaturedProducts
} = require('../controllers/productController');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

// Include other resource routers
const reviewRouter = require('./reviews');

// Re-route into other resource routers
router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(advancedResults(Product, 'reviews'), getProducts)
  .post(protect, authorize('admin'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router
  .route('/:id/photo')
  .put(protect, authorize('admin'), productPhotoUpload);

router
  .route('/category/:category')
  .get(getProductsByCategory);

router
  .route('/featured')
  .get(getFeaturedProducts);

module.exports = router;

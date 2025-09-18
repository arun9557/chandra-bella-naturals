const Review = require('../models/Review');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all reviews
// @route   GET /api/reviews
// @route   GET /api/products/:productId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.productId) {
        const reviews = await Review.find({ product: req.params.productId })
            .populate({
                path: 'user',
                select: 'name avatar'
            });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'product',
        select: 'name'
    });

    if (!review) {
        return next(
            new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: review
    });
});

// @desc    Add review
// @route   POST /api/products/:productId/reviews
// @access  Private
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.product = req.params.productId;
    req.body.user = req.user.id;

    const product = await Product.findById(req.params.productId);

    if (!product) {
        return next(
            new ErrorResponse(
                `No product with the id of ${req.params.productId}`,
                404
            )
        );
    }

    // Check if user already submitted a review for this product
    const existingReview = await Review.findOne({
        product: req.params.productId,
        user: req.user.id
    });

    if (existingReview) {
        return next(
            new ErrorResponse(
                `User has already reviewed this product`,
                400
            )
        );
    }

    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review
    });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this review`,
                401
            )
        );
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: review
    });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete this review`,
                401
            )
        );
    }

    await review.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

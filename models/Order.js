const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'Please enter address']
        },
        city: {
            type: String,
            required: [true, 'Please enter city']
        },
        state: {
            type: String,
            required: [true, 'Please enter state']
        },
        country: {
            type: String,
            required: [true, 'Please enter country']
        },
        postalCode: {
            type: String,
            required: [true, 'Please enter postal code']
        },
        phoneNo: {
            type: String,
            required: [true, 'Please enter phone number']
        }
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
        enum: {
            values: [
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled'
            ],
            message: 'Please select correct status for order'
        }
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);

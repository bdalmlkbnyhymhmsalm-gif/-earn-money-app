/**
 * Order Model
 */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Info
  orderId: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Items
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number,
    subtotal: Number
  }],

  // Pricing
  pricing: {
    subtotal: Number,
    shippingCost: Number,
    tax: Number,
    discount: Number,
    total: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },

  // Shipping
  shipping: {
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    method: {
      type: String,
      enum: ['standard', 'express', 'overnight']
    },
    trackingNumber: String,
    estimatedDelivery: Date,
    actualDelivery: Date
  },

  // Payment
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'wallet', 'bank_transfer']
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },

  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }],

  // Seller Info
  seller: {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sellerName: String
  },

  // Notes
  notes: String,
  cancellationReason: String,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate Order ID
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    this.orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

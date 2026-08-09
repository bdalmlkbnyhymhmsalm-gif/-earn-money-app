/**
 * Product Model - Shopping Catalog
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },

  // Pricing
  price: {
    usd: {
      type: Number,
      required: true,
      min: 0
    },
    eur: Number,
    gbp: Number,
    aed: Number,
    sar: Number,
    egp: Number,
    jod: Number
  },

  // Category & Tags
  category: {
    type: String,
    enum: ['electronics', 'fashion', 'home', 'books', 'toys', 'sports', 'beauty', 'food', 'other'],
    required: true
  },
  tags: [String],
  brand: String,

  // Stock
  stock: {
    total: {
      type: Number,
      default: 0,
      min: 0
    },
    reserved: {
      type: Number,
      default: 0
    },
    available: {
      type: Number,
      default: 0
    }
  },

  // Images
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],

  // Seller Info
  seller: {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sellerName: String,
    sellerCountry: String,
    sellerRating: Number
  },

  // Shipping
  shipping: {
    weight: Number, // kg
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingCost: {
      basePrice: Number,
      perKg: Number
    },
    estimatedDelivery: Number, // days
    countries: [String] // Countries where product can be shipped
  },

  // Reviews & Ratings
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],

  // Discount & Offers
  discount: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    validUntil: Date
  },

  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },

  // SEO
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  metaDescription: String,
  metaKeywords: [String],

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

// Indexes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ 'seller.sellerId': 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Product', productSchema);

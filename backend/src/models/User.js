/**
 * User Model - Database Schema
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },

  // Location & Country
  country: {
    type: String,
    required: [true, 'Please provide country'],
    enum: require('./countries.json').map(c => c.code)
  },
  city: {
    type: String,
    required: true
  },
  address: {
    street: String,
    zipCode: String
  },
  latitude: Number,
  longitude: Number,

  // Account Status
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpire: Date,
  is2FAEnabled: {
    type: Boolean,
    default: false
  },
  twoFASecret: String,

  // Profile
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },

  // Financial Info
  wallet: {
    balance: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    totalEarned: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    }
  },

  // Bank Account Details (Encrypted)
  bankAccount: {
    bankName: String,
    accountHolder: String,
    accountNumber: String, // Encrypted
    routingNumber: String,
    swiftCode: String,
    iban: String
  },

  // Payment Methods
  paymentMethods: [{
    type: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer']
    },
    provider: String,
    token: String,
    lastFourDigits: String,
    expiryDate: String,
    isDefault: Boolean,
    isVerified: Boolean
  }],

  // Preferences
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'ar', 'fr', 'es', 'de', 'zh', 'ja']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  emailNotifications: {
    marketing: { type: Boolean, default: true },
    orders: { type: Boolean, default: true },
    games: { type: Boolean, default: true },
    surveys: { type: Boolean, default: true }
  },

  // Activity
  lastLogin: Date,
  lastActivity: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String,
  suspensionUntil: Date,

  // Stats
  totalGamesPlayed: {
    type: Number,
    default: 0
  },
  totalSurveysCompleted: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 5
  },

  // Referral Program
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referralBonus: {
    type: Number,
    default: 0
  },

  // Security & Verification
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  idVerified: { type: Boolean, default: false },
  idVerificationImage: String,
  idVerificationDate: Date,

  // Metadata
  role: {
    type: String,
    enum: ['user', 'seller', 'admin'],
    default: 'user'
  },
  metadata: {
    source: String, // How user discovered the app
    referralCampaign: String
  },

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

// ==================== INDEXES ====================
userSchema.index({ email: 1 });
userSchema.index({ country: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ wallet.balance: -1 });

// ==================== MIDDLEWARE ====================

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update the updatedAt timestamp
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// ==================== METHODS ====================

// Compare password
userSchema.methods.comparePassword = async function(passwordToCheck) {
  return await bcrypt.compare(passwordToCheck, this.password);
};

// Get user public profile
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.twoFASecret;
  delete user.bankAccount;
  delete user.verificationToken;
  return user;
};

// Generate referral code
userSchema.methods.generateReferralCode = function() {
  this.referralCode = `EARN${this._id.toString().slice(-8).toUpperCase()}`;
  return this.referralCode;
};

// Update last activity
userSchema.methods.updateLastActivity = function() {
  this.lastActivity = new Date();
  return this.save();
};

// Add wallet balance
userSchema.methods.addBalance = async function(amount, reason = 'manual') {
  this.wallet.balance += amount;
  if (amount > 0) {
    this.wallet.totalEarned += amount;
  }
  return this.save();
};

// Deduct wallet balance
userSchema.methods.deductBalance = async function(amount, reason = 'purchase') {
  if (this.wallet.balance < amount) {
    throw new Error('Insufficient balance');
  }
  this.wallet.balance -= amount;
  this.wallet.totalSpent += amount;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

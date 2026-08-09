/**
 * Earning/Transaction Model
 */

const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  // User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Transaction Details
  transactionId: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    enum: ['game_reward', 'survey_reward', 'referral_bonus', 'purchase_refund', 'withdrawal', 'deposit', 'adjustment'],
    required: true
  },
  description: String,

  // Amount
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },

  // Source
  source: {
    sourceId: String, // Game ID, Survey ID, etc.
    sourceName: String
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  failureReason: String,

  // Balance Snapshot
  balanceAfter: Number,

  // Metadata
  metadata: {
    ipAddress: String,
    userAgent: String,
    country: String,
    deviceType: String
  },

  // Fraud Detection
  flaggedForReview: {
    type: Boolean,
    default: false
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

// Generate Transaction ID
earningSchema.pre('save', async function(next) {
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Indexes
earningSchema.index({ userId: 1, createdAt: -1 });
earningSchema.index({ type: 1 });
earningSchema.index({ status: 1 });

module.exports = mongoose.model('Earning', earningSchema);

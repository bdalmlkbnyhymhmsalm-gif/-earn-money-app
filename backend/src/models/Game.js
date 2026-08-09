/**
 * Game Model - Games & Rewards
 */

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  // Game Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  type: {
    type: String,
    enum: ['spin_wheel', 'memory', 'quiz', 'shooting', 'puzzle'],
    required: true
  },

  // Game Settings
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  duration: {
    type: Number, // seconds
    default: 60
  },
  rules: String,

  // Rewards
  reward: {
    minAmount: {
      type: Number,
      default: 0.5
    },
    maxAmount: {
      type: Number,
      default: 50
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },

  // Play Limits
  dailyLimit: {
    type: Number,
    default: 5 // plays per day
  },
  cooldownPeriod: {
    type: Number,
    default: 300 // seconds between plays
  },
  minLevelRequired: {
    type: Number,
    default: 1
  },

  // Game Assets
  thumbnail: String,
  banner: String,
  gameUrl: String,
  assetFiles: [String],

  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },

  // Stats
  totalPlays: {
    type: Number,
    default: 0
  },
  totalRewardsGiven: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Game', gameSchema);

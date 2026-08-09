/**
 * Wallet Routes - Balance & Earnings
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get wallet balance
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      wallet: user.wallet,
      message: '💳 Wallet retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

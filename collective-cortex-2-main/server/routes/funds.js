const express = require('express');
const router = express.Router();
const Fund = require('../models/Fund');
const Expense = require('../models/Expense');

// @route   GET /api/funds
// @desc    Get all funds
router.get('/', async (req, res) => {
  try {
    const funds = await Fund.find().populate('expenses');
    res.json(funds);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/funds
// @desc    Create a new fund project (Admin)
router.post('/', async (req, res) => {
  try {
    const fund = await Fund.create(req.body);
    res.status(201).json(fund);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/funds/:id/expenses
// @desc    Add an expense to a fund
router.post('/:id/expenses', async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);
    if (!fund) return res.status(404).json({ message: 'Fund not found' });

    const newExpense = await Expense.create({
      project_id: fund._id,
      ...req.body
    });

    // Anomaly detection mock (e.g. if amount is too large for vendor)
    if (newExpense.amount > 500000) {
      newExpense.risk_level = 'high';
      fund.risk_score = 'high';
      await newExpense.save();
    }

    fund.used_amount += newExpense.amount;
    fund.expenses.push(newExpense._id);
    await fund.save();

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

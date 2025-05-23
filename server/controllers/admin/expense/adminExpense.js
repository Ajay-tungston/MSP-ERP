const { response } = require('express');
const Expense = require('../../../models/Expense');

// Get expenses with pagination
exports.getExpenses = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  try {
    const expenses = await Expense.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Expense.countDocuments();

    res.status(200).json({
      data: expenses,
      currentPage: Number(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new expense
exports.createExpense = async (req, res) => {
  try {
    const { expense, amount, date } = req.body;
console.log(req.body)
    const newExpense = new Expense({ expense, amount, date });
    await newExpense.save();

    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: 'Expense not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

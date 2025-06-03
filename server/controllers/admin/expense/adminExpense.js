const { response } = require('express');
const Expense = require('../../../models/Expense');
const Payment = require('../../../models/Payment');

// Get expenses with search and pagination
exports.getExpenses = async (req, res) => {
  const { page = 1, limit = 8, search = "" } = req.query;

  try {
    // Build search query
    const query = search
      ? { expense: { $regex: search, $options: "i" } }
      : {};

    const expenses = await Expense.find(query)
      .sort({ date: -1 }) // Sort by `date` field
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Expense.countDocuments(query);

    res.status(200).json({
      data: expenses,
      currentPage: Number(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new expense
exports.createExpense = async (req, res) => {
  try {
    const { expense, amount } = req.body;

    const newExpense = new Expense({ expense, amount });
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
      runValidators: true,
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
    const expenseId = req.params.id;

    // ✅ Check if any Payment references this expense
    const existingPayment = await Payment.findOne({ expense: expenseId });

    if (existingPayment) {
      return res.status(400).json({
        message: 'Cannot delete expense as it is linked to a payment.',
      });
    }

    // Proceed to delete
    const deleted = await Expense.findByIdAndDelete(expenseId);

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get full list of expenses (optionally with search)
exports.getExpenseList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? { expense: { $regex: search, $options: "i" } }
      : {};
    const expense = await Expense.find(query);

    return res.status(200).json(expense);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting expense" });
  }
};

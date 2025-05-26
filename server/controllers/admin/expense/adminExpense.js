const { response } = require('express');
const Expense = require('../../../models/Expense');

// Get expenses with pagination
exports.getExpenses = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  try {
    const expenses = await Expense.find()
      .sort({ date: -1 }) // <-- Sort by the `date` field instead of `createdAt`
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
    const { expense, amount } = req.body;
console.log(req.body)
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

exports.getExpenseList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
  ? { expense: { $regex: search, $options: "i" } }
  : {};
    const expense = await Expense.find(query)
   
    return res.status(200).json(expense);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting expense" });
  }
};

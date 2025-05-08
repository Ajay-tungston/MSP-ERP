const express = require('express');
const router = express.Router();
const expenseController = require('../../../controllers/admin/expense/adminExpense');

router.get('/', expenseController.getExpenses);
router.post('/add', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;

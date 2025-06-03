const express = require('express');
const router = express.Router();
const expenseController = require('../../../controllers/admin/expense/adminExpense');
const verifyJwt = require('../../../middleware/verifyJwt');

router.get('/',verifyJwt, expenseController.getExpenses);
router.post('/add',verifyJwt, expenseController.createExpense);
router.get("/list",verifyJwt,expenseController.getExpenseList)
router.put('/:id',verifyJwt, expenseController.updateExpense);
router.delete('/:id',verifyJwt, expenseController.deleteExpense);

module.exports = router;

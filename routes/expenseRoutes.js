const express = require('express');
const expenseController = require('../controllers/expenseController');
const router = express.Router();
  
  router.get('/church/:id', expenseController.expense_index);
  router.post('/', expenseController.expense_create_post);
  router.get('/create', expenseController.expense_create_get);
  router.post('/deleted/:id', expenseController.expense_delete);
  router.get('/delete/:id', expenseController.expense_delete_get);
  router.get('/:id', expenseController.expense_details);
  router.get('/edit/:id', expenseController.expense_edit_get);
  router.post('/edited/:id', expenseController.expense_edit);

  module.exports = router;
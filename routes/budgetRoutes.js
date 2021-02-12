const express = require('express');
const budgetController = require('../controllers/budgetController');
const router = express.Router();
  
  router.get('/church/:id', budgetController.budget_index);
  router.post('/', budgetController.budget_create_post);
  router.get('/create/:id', budgetController.budget_create_get);
  router.post('/deleted/:id', budgetController.budget_delete);
  router.get('/delete/:id', budgetController.budget_delete_get);
  router.get('/:id', budgetController.budget_details);
  router.get('/edit/:id', budgetController.budget_edit_get);
  router.post('/edited/:id', budgetController.budget_edit);

  module.exports = router;
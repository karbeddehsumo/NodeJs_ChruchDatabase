const express = require('express');
const incomeController = require('../controllers/incomeController');
const router = express.Router();
  
  router.get('/church/:id', incomeController.income_index);
  router.post('/', incomeController.income_create_post);
  router.get('/create/:id', incomeController.income_create_get);
  router.post('/deleted/:id', incomeController.income_delete);
  router.get('/delete/:id', incomeController.income_delete_get);
  router.get('/:id', incomeController.income_details);
  router.get('/edit/:id', incomeController.income_edit_get);
  router.post('/edited/:id', incomeController.income_edit);

  module.exports = router;
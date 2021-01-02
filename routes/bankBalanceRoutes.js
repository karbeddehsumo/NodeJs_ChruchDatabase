const express = require('express');
const bankBalanceController = require('../controllers/bankBalanceController');
const router = express.Router();
  
  router.get('/church/:id', bankBalanceController.bankBalance_index);
  router.post('/', bankBalanceController.bankBalance_create_post);
  router.get('/create/:id', bankBalanceController.bankBalance_create_get);
  router.post('/deleted/:id', bankBalanceController.bankBalance_delete);
  router.get('/delete/:id', bankBalanceController.bankBalance_delete_get);
  router.get('/:id', bankBalanceController.bankBalance_details);
  router.get('/edit/:id', bankBalanceController.bankBalance_edit_get);
  router.post('/edited/:id', bankBalanceController.bankBalance_edit);

  module.exports = router;
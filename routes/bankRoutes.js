const express = require('express');
const bankController = require('../controllers/bankController');
const router = express.Router();
  
  router.get('/church/:id', bankController.bank_index);
  router.post('/', bankController.bank_create_post);
  router.get('/create/:id', bankController.bank_create_get);
  router.post('/deleted/:id', bankController.bank_delete);
  router.get('/delete/:id', bankController.bank_delete_get);
  router.get('/:id', bankController.bank_details);
  router.get('/edit/:id', bankController.bank_edit_get);
  router.post('/edited/:id', bankController.bank_edit);

  module.exports = router;
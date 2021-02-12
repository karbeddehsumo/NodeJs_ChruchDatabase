const express = require('express');
const payeeController = require('../controllers/payeeController');
const router = express.Router();
  
  router.get('/church/:id', payeeController.payee_index);
  router.post('/', payeeController.payee_create_post);
  router.get('/create/:id', payeeController.payee_create_get);
  router.post('/deleted/:id', payeeController.payee_delete);
  router.get('/delete/:id', payeeController.payee_delete_get);
  router.get('/:id', payeeController.payee_details);
  router.get('/edit/:id', payeeController.payee_edit_get);
  router.post('/edited/:id', payeeController.payee_edit);

  module.exports = router;
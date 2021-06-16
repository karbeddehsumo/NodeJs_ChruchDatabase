const express = require('express');
const billController = require('../controllers/billController');
const router = express.Router();
  
  router.get('/church/:id', billController.bill_index);
  router.post('/', billController.bill_create_post);
  router.get('/create/:id', billController.bill_create_get);
  router.post('/deleted/:id', billController.bill_delete);
  router.get('/delete/:id', billController.bill_delete_get);
  router.get('/:id', billController.bill_details);
  router.get('/edit/:id', billController.bill_edit_get);
  router.post('/edited/:id', billController.bill_edit);

  module.exports = router;
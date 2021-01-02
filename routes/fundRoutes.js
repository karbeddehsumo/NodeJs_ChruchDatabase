const express = require('express');
const fundController = require('../controllers/fundController');
const router = express.Router();
  
  router.get('/church/:id', fundController.fund_index);
  router.post('/', fundController.fund_create_post);
  router.get('/create/:id', fundController.fund_create_get);
  router.post('/deleted/:id', fundController.fund_delete);
  router.get('/delete/:id', fundController.fund_delete_get);
  router.get('/:id', fundController.fund_details);
  router.get('/edit/:id', fundController.fund_edit_get);
  router.post('/edited/:id', fundController.fund_edit);

  module.exports = router;
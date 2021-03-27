const express = require('express');
const tableController = require('../controllers/tableController');
const router = express.Router();
  
  router.get('/church/:id', tableController.table_index);
  router.post('/', tableController.table_create_post);
  router.get('/create/:id', tableController.table_create_get);
  router.post('/deleted/:id', tableController.table_delete);
  router.get('/delete/:id', tableController.table_delete_get);
  router.get('/:id', tableController.table_details);
  router.get('/edit/:id', tableController.table_edit_get);
  router.post('/edited/:id', tableController.table_edit);

  module.exports = router;
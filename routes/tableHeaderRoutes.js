const express = require('express');
const tableHeaderController = require('../controllers/tableHeaderController');
const router = express.Router();
  
  router.get('/church/:id', tableHeaderController.tableHeader_index);
  router.post('/', tableHeaderController.tableHeader_create_post);
  router.get('/create/:id', tableHeaderController.tableHeader_create_get);
  router.get('./created/:id', tableHeaderController.tableHeader_create_get_ministry);
  router.post('/deleted/:id', tableHeaderController.tableHeader_delete);
  router.get('/delete/:id', tableHeaderController.tableHeader_delete_get);
  router.get('/:id', tableHeaderController.tableHeader_details);
  router.get('/edit/:id', tableHeaderController.tableHeader_edit_get);
  router.post('/edited/:id', tableHeaderController.tableHeader_edit);

  module.exports = router;
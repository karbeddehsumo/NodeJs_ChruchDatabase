const express = require('express');
const tableDataController = require('../controllers/tableDataController');
const router = express.Router();
  
  router.get('/church/:id/:tableId', tableDataController.tableData_index);
  router.post('/', tableDataController.tableData_create_post);
  router.get('/create/:id', tableDataController.tableData_create_get);
  router.post('/deleted/:id', tableDataController.tableData_delete);
  router.get('/delete/:id', tableDataController.tableData_delete_get);
  router.get('/:id', tableDataController.tableData_details);
  router.get('/edit/:id', tableDataController.tableData_edit_get);
  router.post('/edited/:id', tableDataController.tableData_edit);

  module.exports = router;
const express = require('express');
const constantController = require('../controllers/constantController');
const router = express.Router();
  
  router.get('/church/:id', constantController.constant_index);
  router.post('/', constantController.constant_create_post);
  router.get('/create/:id', constantController.constant_create_get);
  router.post('/deleted/:id', constantController.constant_delete);
  router.get('/delete/:id', constantController.constant_delete_get);
  router.get('/:id', constantController.constant_details);
  router.get('/edit/:id', constantController.constant_edit_get);
  router.post('/edited/:id', constantController.constant_edit);

  module.exports = router;
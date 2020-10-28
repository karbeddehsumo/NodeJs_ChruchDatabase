const express = require('express');
const roleController = require('../controllers/roleController');
const router = express.Router();
  
  router.get('/', roleController.role_index);
  router.post('/', roleController.role_create_post);
  router.get('/create/:id', roleController.role_create_get);
  router.post('/deleted/:id', roleController.role_delete);
  router.get('/delete/:id', roleController.role_delete_get);
  router.get('/:id', roleController.role_details);
  router.get('/edit/:id', roleController.role_edit_get);
  router.post('/edited/:id', roleController.role_edit);

  module.exports = router;
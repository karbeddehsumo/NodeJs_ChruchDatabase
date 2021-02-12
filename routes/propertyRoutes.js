const express = require('express');
const propertyController = require('../controllers/propertyController');
const router = express.Router();
  
  router.get('/church/:id', propertyController.property_index);
  router.post('/', propertyController.property_create_post);
  router.get('/create/:id', propertyController.property_create_get);
  router.post('/deleted/:id', propertyController.property_delete);
  router.get('/delete/:id', propertyController.property_delete_get);
  router.get('/:id', propertyController.property_details);
  router.get('/edit/:id', propertyController.property_edit_get);
  router.post('/edited/:id', propertyController.property_edit);

  module.exports = router;
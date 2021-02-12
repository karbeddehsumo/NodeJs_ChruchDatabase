const express = require('express');
const staffController = require('../controllers/staffController');
const router = express.Router();
  
  router.get('/church/:id', staffController.staff_index);
  router.post('/', staffController.staff_create_post);
  router.get('/create/:id', staffController.staff_create_get);
  router.post('/deleted/:id', staffController.staff_delete);
  router.get('/delete/:id', staffController.staff_delete_get);
  router.get('/:id', staffController.staff_details);
  router.get('/edit/:id', staffController.staff_edit_get);
  router.post('/edited/:id', staffController.staff_edit);

  module.exports = router;
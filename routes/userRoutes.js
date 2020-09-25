const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
  
  router.get('/', userController.user_index);
  router.post('/', userController.user_create_post);
  router.get('/create', userController.user_create_get);
  router.post('/deleted/:id', userController.user_delete);
  router.get('/delete/:id', userController.user_delete_get);
  router.get('/:id', userController.user_details);
  router.get('/edit/:id', userController.user_edit_get);
  router.post('/edited/:id', userController.user_edit);

  module.exports = router;
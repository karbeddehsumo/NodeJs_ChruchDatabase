const express = require('express');
const friendController = require('../controllers/friendController');
const router = express.Router();
  
  router.get('/church/:id', friendController.friend_index);
  router.post('/', friendController.friend_create_post);
  router.get('/create/:id', friendController.friend_create_get);
  router.post('/deleted/:id', friendController.friend_delete);
  router.get('/delete/:id', friendController.friend_delete_get);
  router.get('/:id', friendController.friend_details);
  router.get('/edit/:id', friendController.friend_edit_get);
  router.post('/edited/:id', friendController.friend_edit);

  module.exports = router;
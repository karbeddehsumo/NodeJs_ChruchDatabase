const express = require('express');
const memberController = require('../controllers/memberController');
const router = express.Router();
  
  router.get('/', memberController.member_index);
  router.post('/', memberController.member_create_post);
  router.get('/create', memberController.member_create_get);
  router.post('/deleted/:id', memberController.member_delete);
  router.get('/delete/:id', memberController.member_delete_get);
  router.get('/:id', memberController.member_details);
  router.get('/edit/:id', memberController.member_edit_get);
  router.post('/edited/:id', memberController.member_edit);

  module.exports = router;
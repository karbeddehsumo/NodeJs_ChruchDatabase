const express = require('express');
const pictureController = require('../controllers/pictureController');
const router = express.Router();
  
  router.get('/church/:id', pictureController.picture_index);
  router.post('/', pictureController.picture_create_post);
  router.get('/create/:id', pictureController.picture_create_get);
  router.post('/deleted/:id', pictureController.picture_delete);
  router.get('/delete/:id', pictureController.picture_delete_get);
  router.get('/:id', pictureController.picture_details);
  router.get('/edit/:id', pictureController.picture_edit_get);
  router.post('/edited/:id', pictureController.picture_edit);

  module.exports = router;
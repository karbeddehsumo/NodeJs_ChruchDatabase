const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();
  
  router.get('/church/:id', videoController.video_index);
  router.post('/', videoController.video_create_post);
  router.get('/create/:id', videoController.video_create_get);
  router.post('/deleted/:id', videoController.video_delete);
  router.get('/delete/:id', videoController.video_delete_get);
  router.get('/:id', videoController.video_details);
  router.get('/edit/:id', videoController.video_edit_get);
  router.post('/edited/:id', videoController.video_edit);

  module.exports = router;
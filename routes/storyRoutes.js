const express = require('express');
const storyController = require('../controllers/storyController');
const router = express.Router();
  
  router.get('/church/:id', storyController.story_index);
  router.post('/', storyController.story_create_post);
  router.get('/create/:id', storyController.story_create_get);
  router.get('/created/:id', storyController.story_create_get_for_ministry);
  router.post('/deleted/:id', storyController.story_delete);
  router.get('/delete/:id', storyController.story_delete_get);
  router.get('/:id', storyController.story_details);
  router.get('/edit/:id', storyController.story_edit_get);
  router.post('/edited/:id', storyController.story_edit);

  module.exports = router;
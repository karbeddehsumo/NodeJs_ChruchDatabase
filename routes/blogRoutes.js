const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();
  
  router.get('/', blogController.blog_index);
  router.post('/', blogController.blog_create_post);
  router.get('/create', blogController.blog_create_get);
  router.post('/deleted/:id', blogController.blog_delete);
  router.get('/delete/:id', blogController.blog_delete_get);
  router.get('/:id', blogController.blog_details);
  router.get('/edit/:id', blogController.blog_edit_get);
  router.post('/edited/:id', blogController.blog_edit);

  module.exports = router;
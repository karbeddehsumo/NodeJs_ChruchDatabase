const express = require('express');
const contributionController = require('../controllers/contributionController');
const router = express.Router();
  
  router.get('/', contributionController.contribution_index);
  router.post('/', contributionController.contribution_create_post);
  router.get('/create', contributionController.contribution_create_get);
  router.post('/deleted/:id', contributionController.contribution_delete);
  router.get('/delete/:id', contributionController.contribution_delete_get);
  router.get('/:id', contributionController.contribution_details);
  router.get('/edit/:id', contributionController.contribution_edit_get);
  router.post('/edited/:id', contributionController.contribution_edit);

  module.exports = router;
const express = require('express');
const familyController = require('../controllers/familyController');
const router = express.Router();
  
  router.get('/', familyController.family_index);
  router.post('/', familyController.family_create_post);
  router.get('/create', familyController.family_create_get);
  router.post('/deleted/:id', familyController.family_delete);
  router.get('/delete/:id', familyController.family_delete_get);
  router.get('/:id', familyController.family_details);
  router.get('/edit/:id', familyController.family_edit_get);
  router.post('/edited/:id', familyController.family_edit);

  module.exports = router;
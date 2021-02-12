const express = require('express');
const ministryController = require('../controllers/ministryController');
const router = express.Router();
  
  router.get('/church/:id', ministryController.ministry_index);
  router.post('/', ministryController.ministry_create_post);
  router.get('/create/:id', ministryController.ministry_create_get);
  router.post('/deleted/:id', ministryController.ministry_delete);
  router.get('/delete/:id', ministryController.ministry_delete_get);
  router.get('/:id', ministryController.ministry_details);
  router.get('/edit/:id', ministryController.ministry_edit_get);
  router.post('/edited/:id', ministryController.ministry_edit);

  module.exports = router;
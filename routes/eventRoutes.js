const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();
  
  router.get('/church/:id', eventController.event_index);
  router.post('/:id', eventController.event_create_post);
  router.get('/create/:id', eventController.event_create_get);
  router.post('/deleted/:id', eventController.event_delete);
  router.get('/delete/:id', eventController.event_delete_get);
  router.get('/:id', eventController.event_details);
  router.get('/edit/:id', eventController.event_edit_get);
  router.post('/edited/:id', eventController.event_edit);

  module.exports = router;
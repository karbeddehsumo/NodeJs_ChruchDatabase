const express = require('express');
const calendarController = require('../controllers/calendarController');
const router = express.Router();
  
  router.get('/church/:id', calendarController.calendar_index);
  router.post('/', calendarController.calendar_create_post);
  router.get('/create/:id', calendarController.calendar_create_get);
  router.post('/deleted/:id', calendarController.calendar_delete);
  router.get('/delete/:id', calendarController.calendar_delete_get);
  router.get('/:id', calendarController.calendar_details);
  router.get('/edit/:id', calendarController.calendar_edit_get);
  router.post('/edited/:id', calendarController.calendar_edit);

  module.exports = router;
const express = require('express');
const meetingController = require('../controllers/meetingController');
const router = express.Router();
  
  router.get('/church/:id', meetingController.meeting_index);
  router.post('/', meetingController.meeting_create_post);
  router.get('/create/:id', meetingController.meeting_create_get);
  router.post('/deleted/:id', meetingController.meeting_delete);
  router.get('/delete/:id', meetingController.meeting_delete_get);
  router.get('/:id', meetingController.meeting_details);
  router.get('/edit/:id', meetingController.meeting_edit_get);
  router.post('/edited/:id', meetingController.meeting_edit);

  module.exports = router;
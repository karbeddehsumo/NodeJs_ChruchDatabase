const express = require('express');
const announcementController = require('../controllers/announcementController');
const router = express.Router();
  
  router.get('/church/:id', announcementController.announcement_index);
  router.post('/', announcementController.announcement_create_post);
  router.get('/create/:id', announcementController.announcement_create_get);
  router.post('/deleted/:id', announcementController.announcement_delete);
  router.get('/delete/:id', announcementController.announcement_delete_get);
  router.get('/:id', announcementController.announcement_details);
  router.get('/edit/:id', announcementController.announcement_edit_get);
  router.post('/edited/:id', announcementController.announcement_edit);

  module.exports = router;
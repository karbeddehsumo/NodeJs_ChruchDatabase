const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const router = express.Router();
  
  router.get('/', attendanceController.attendance_index);
  router.post('/', attendanceController.attendance_create_post);
  router.get('/create', attendanceController.attendance_create_get);
  router.post('/deleted/:id', attendanceController.attendance_delete);
  router.get('/delete/:id', attendanceController.attendance_delete_get);
  router.get('/:id', attendanceController.attendance_details);
  router.get('/edit/:id', attendanceController.attendance_edit_get);
  router.post('/edited/:id', attendanceController.attendance_edit);

  module.exports = router;
const express = require('express');
const visitorController = require('../controllers/visitorController');
const router = express.Router();
  
  router.get('/church/:id', visitorController.visitor_index);
  router.post('/', visitorController.visitor_create_post);
  router.get('/create/:id', visitorController.visitor_create_get);
  router.post('/deleted/:id', visitorController.visitor_delete);
  router.get('/delete/:id', visitorController.visitor_delete_get);
  router.get('/:id', visitorController.visitor_details);
  router.get('/edit/:id', visitorController.visitor_edit_get);
  router.post('/edited/:id', visitorController.visitor_edit);

  module.exports = router;
const express = require('express');
const pledgeController = require('../controllers/pledgeController');
const router = express.Router();
  
  router.get('/church/:id', pledgeController.pledge_index);
  router.post('/', pledgeController.pledge_create_post);
  router.get('/create/:id', pledgeController.pledge_create_get);
  router.post('/deleted/:id', pledgeController.pledge_delete);
  router.get('/delete/:id', pledgeController.pledge_delete_get);
  router.get('/:id', pledgeController.pledge_details);
  router.get('/edit/:id', pledgeController.pledge_edit_get);
  router.post('/edited/:id', pledgeController.pledge_edit);

  module.exports = router;
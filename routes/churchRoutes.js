const express = require('express');
const churchController = require('../controllers/churchController');
const router = express.Router();
  
  router.get('/', churchController.church_index);
  router.post('/', churchController.church_create_post);
  router.get('/branch/:id', churchController.church_branch_create_get);
  router.post('/createBranch', churchController.church_createBranch_post);

  router.get('/create', churchController.church_create_get);
  

  router.post('/deleted/:id', churchController.church_delete);
  router.get('/delete/:id', churchController.church_delete_get);
  router.get('/:id', churchController.church_details);
  router.get('/edit/:id', churchController.church_edit_get);
  router.post('/edited/:id', churchController.church_edit);


  module.exports = router;
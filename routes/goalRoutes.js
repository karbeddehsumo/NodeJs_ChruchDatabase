const express = require('express');
const goalController = require('../controllers/goalController');
const router = express.Router();
  
  router.get('/church/:id', goalController.goal_index);
  router.post('/', goalController.goal_create_post);
  router.get('/create/:id', goalController.goal_create_get);
  router.post('/deleted/:id', goalController.goal_delete);
  router.get('/delete/:id', goalController.goal_delete_get);
  router.get('/:id', goalController.goal_details);
  router.get('/edit/:id', goalController.goal_edit_get);
  router.post('/edited/:id', goalController.goal_edit);

  module.exports = router;
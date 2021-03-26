const Goal = require('../models/goal');
const Church = require('../models/church');

const goal_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Goal.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('goals/index', { title: 'All goal', goals: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const goal_details = async (req, res) => {
    const id = req.params.id;
    await Goal.findById(id)
     .then((result) => {
      res.render("goal/details", { goal: result, title: 'goal Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'goal not found'});
    });
}

const goal_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('goals/create', {title: 'Create a New goal', churchId});
}

const goal_create_post = (req, res) => {
  const goal = new Goal(req.body);
  goal.church = req.body.churchId;

  goal.save()
  .then((result) => {
    res.redirect("/goals/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const goal_delete = async (req, res) => {
 const id = req.params.id;
  await Goal.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/goal");
  })
  .catch((err) => {
    console.log(err);
  });
}

const goal_delete_get = async (req, res) => {
  const id = req.params.id;
    await Goal.findById(id)
    .then(result => {
      res.render('goal/delete', {goal: result, title: 'Delete goal'});
    })
    .catch(err => console.log(err));
}

const goal_edit_get = async (req, res) => {
  const id = req.params.id;
    await Goal.findById(id)
    .then(result => {
      res.render('goal/edit', {goal: result, title: 'Edit goal'});
    })
    .catch(err => console.log(err));
}

const goal_edit = async (req, res) => {
const id = req.params.id;
const goal = new Goal(req.body);
await Goal.findById(id)
.then(result => {
  result.church = goal.church;
  result.ministry = goal.ministry;
  result.year = goal.year;
  result.goal = goal.goal;
  result.schedule = goal.schedule 
  result.enteredBy = goal.enteredBy;
  result.save();
  res.redirect('/goal');
})
.catch(err => console.log(err));
  
}

module.exports = {
    goal_index,
    goal_details,
    goal_create_get,
    goal_create_post,
    goal_delete_get,
    goal_delete,
    goal_edit_get,
    goal_edit
}
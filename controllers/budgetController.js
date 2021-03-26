const Budget = require('../models/budget');
const Church = require('../models/church');

const budget_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Budget.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('budgets/index', { title: 'All budget', budgets: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const budget_details = async (req, res) => {
    const id = req.params.id;
    await Budget.findById(id)
     .then((result) => {
      res.render("budget/details", { budget: result, title: 'budget Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'budget not found'});
    });
}

const budget_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('budgets/create', {title: 'Create a New budget', churchId});
}

const budget_create_post = (req, res) => {
  const budget = new Budget(req.body);
  budget.church = req.body.churchId;

  budget.save()
  .then((result) => {
    res.redirect("/budgets/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const budget_delete = async (req, res) => {
 const id = req.params.id;
  await Budget.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/budget");
  })
  .catch((err) => {
    console.log(err);
  });
}

const budget_delete_get = async (req, res) => {
  const id = req.params.id;
    await Budget.findById(id)
    .then(result => {
      res.render('budget/delete', {budget: result, title: 'Delete budget'});
    })
    .catch(err => console.log(err));
}

const budget_edit_get = async (req, res) => {
  const id = req.params.id;
    await Budget.findById(id)
    .then(result => {
      res.render('budget/edit', {budget: result, title: 'Edit budget'});
    })
    .catch(err => console.log(err));
}

const budget_edit = async (req, res) => {
const id = req.params.id;
const budget = new Budget(req.body);
await Budget.findById(id)
.then(result => {
  result.church = budget.church;
  result.fund = budget.fund;
  result.year = budget.year;
  result.amount = budget.amount;
  result.enteredBy = budget.enteredBy;
  result.save();
  res.redirect('/budget');
})
.catch(err => console.log(err));
  
}

module.exports = {
    budget_index,
    budget_details,
    budget_create_get,
    budget_create_post,
    budget_delete_get,
    budget_delete,
    budget_edit_get,
    budget_edit
}
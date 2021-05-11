const Budget = require('../models/budget');
const Church = require('../models/church');
const Constant = require('../models/constant');
const Fund = require('../models/fund');

const budget_index = async (req, res) => {
    const churchId = req.params.id;
    await Budget.find({ church: churchId }).sort({ createdAt: -1 })
    .populate('fund','name _id')
    .then((result) => {
      console.log('budget data here');
      console.log(result);
      res.render('budgets/index', { title: 'All budget', budgets: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const budget_details = async (req, res) => {
    const id = req.params.id;
    await Budget.findById(id)
    .populate('fund','name _id')
     .then((result) => {
       console.log('Here is the budget item');
       console.log(result);
      res.render("budgets/details", { budget: result, title: 'budget Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'budget not found'});
    });
}

const budget_create_get = async (req, res) => {
  const churchId = req.params.id;
  const fundType = req.params.type;
  let year = new Date().getFullYear();
  var budgetYear = [year-1,year,year+1]
  await Fund.find({ church: churchId, category: [fundType,'Both']}).sort({ createdAt: -1 })
    .then((result) => {
      res.render('budgets/create', {title: 'Create a New budget', churchId, funds: result, fundType, budgetYear })
    })
    .catch((err) => {
      console.log(err)
    })
}

const budget_create_post = (req, res) => {
  const budget = new Budget(req.body);
  budget.church = req.body.churchId;
  budget.enteredBy = global.userId;
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
    res.redirect("/budgets");
  })
  .catch((err) => {
    console.log(err);
  });
}

const budget_delete_get = async (req, res) => {
  const id = req.params.id;
    await Budget.findById(id)
    .polupate('fund', 'name')
    .then(result => {
      console.log('here is the fund pop');
      console.log(result);
      res.render('budgets/delete', {budget: result, title: 'Delete budget'});
    })
    .catch(err => console.log(err));
}

const budget_edit_get = async (req, res) => {
  const id = req.params.id;
  const budget = await Budget.findById(id);
  const status = await Constant.find({category: 'Status'}, '_id category name value1').sort({ sort: 1}); 
  const funds =  await Fund.find({ church: budget.church, category: [budget.type, 'Both']}).sort({ createdAt: -1 });
    await Budget.findById(id)
    .populate('fund', 'name _id')
    .then(result => {
      const title = 'Edit ' + result.type + ' Budget';
      
      res.render('budgets/edit', {budget: result, funds, title, PermissionStatus});
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
  result.enteredBy = global.userId;
  result.save();
  res.redirect('/budgets/' + id);
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
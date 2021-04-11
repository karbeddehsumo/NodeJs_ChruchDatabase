const Expense = require('../models/expense');
const Fund = require('../models/fund');
const Church = require('../models/church');

const expense_index = async (req, res) => {
    const churchId = req.params.id;
    const churchName = global.churchName;
    await Expense.find({ church: churchId}).sort({ createdAt: -1 })
    .then((result) => {
      res.render('expenses/index', { title: 'All expenses', expenses: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const expense_details = async (req, res) => {
    const id = req.params.id;
    await Expense.findById(id)
     .then((result) => {
      res.render("expenses/details", { expense: result, title: 'expense Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'expense not found'});
    });
}

const expense_create_get = async (req, res) => {
    const churchId = req.params.id;
    const todayDate = new Date();
    await Fund.find({ church: churchId, category: ['Expense','Both']}).sort({ createdAt: -1 })
    .then((result) => {
      console.log('Here is the fund result');
      console.log(result);
      res.render('expenses/create', {title: 'Create a New expense', churchId, funds: result, todayDate});
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Income not found'});
    });
}

const expense_create_post = (req, res) => {
  const expense = new Expense(req.body);
  expense.enteredBy = global.userId;
  expense.save()
  .then((result) => {
    res.redirect("/expenses");
  })
  .catch((err) => {
    console.log(err);
  });
}

const expense_delete = async (req, res) => {
 const id = req.params.id;
  await Expense.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/expenses");
  })
  .catch((err) => {
    console.log(err);
  });
}
const expense_delete_get = (req, res) => {
  const id = req.params.id;
    Expense.findById(id)
    .then(result => {
      res.render('expenses/delete', {expense: result, title: 'Delete expense'});
    })
    .catch(err => console.log(err));
}

const expense_edit_get = async (req, res) => {
  const id = req.params.id;
    await Expense.findById(id)
    .then(result => {
      res.render('expenses/edit', {expense: result, title: 'Edit expense'});
    })
    .catch(err => console.log(err));
}

const expense_edit = async (req, res) => {
const id = req.params.id;
const expense = new Expense(req.body);
await Expense.findById(id)
.then(result => {
  result.fundId = expense.fundId;
  result.statusId = expense.statusId;
  result.payee = expense.payee;
  result.amount = expense.amount;
  result.checkNumber = expense.checkNumber;
  result.expenseDate = expense.expenseDate;
  result.reconcile = expense.reconcile;
  result.comment = expense.comment;
  result.enteredBy = expense.enteredBy;
  result.save();
  res.redirect('/expenses');
})
.catch(err => console.log(err));
  
}

module.exports = {
    expense_index,
    expense_details,
    expense_create_get,
    expense_create_post,
    expense_delete_get,
    expense_delete,
    expense_edit_get,
    expense_edit
}
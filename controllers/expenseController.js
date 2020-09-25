const Expense = require('../models/expense');

const expense_index = (req, res) => {
    Expense.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('expenses/index', { title: 'All expenses', expenses: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const expense_details = (req, res) => {
    const id = req.params.id;
    Expense.findById(id)
     .then((result) => {
      res.render("expenses/details", { expense: result, title: 'expense Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'expense not found'});
    });
}

const expense_create_get = (req, res) => {
    res.render('expenses/create', {title: 'Create a New expense'});
}

const expense_create_post = (req, res) => {
  const expense = new Expense(req.body);
  
  expense.save()
  .then((result) => {
    res.redirect("/expenses");
  })
  .catch((err) => {
    console.log(err);
  });
}

const expense_delete = (req, res) => {
 const id = req.params.id;
  Expense.findByIdAndDelete(id)
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

const expense_edit_get = (req, res) => {
  const id = req.params.id;
    Expense.findById(id)
    .then(result => {
      res.render('expenses/edit', {expense: result, title: 'Edit expense'});
    })
    .catch(err => console.log(err));
}

const expense_edit = async (req, res) => {
const id = req.params.id;
const expense = new Expense(req.body);
Expense.findById(id)
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
const Income = require('../models/income');

const income_index = (req, res) => {
    Income.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('incomes/index', { title: 'All Incomes', incomes: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const income_details = (req, res) => {
    const id = req.params.id;
    Income.findById(id)
     .then((result) => {
      res.render("incomes/details", { income: result, title: 'Income Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Income not found'});
    });
}

const income_create_get = (req, res) => {
    res.render('incomes/create', {title: 'Create a New Income'});
}

const income_create_post = (req, res) => {
  const income = new Income(req.body);
  
  income.save()
  .then((result) => {
    res.redirect("/incomes");
  })
  .catch((err) => {
    console.log(err);
  });
}

const income_delete = (req, res) => {
 const id = req.params.id;
  Income.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/incomes");
  })
  .catch((err) => {
    console.log(err);
  });
}
const income_delete_get = (req, res) => {
  const id = req.params.id;
    Income.findById(id)
    .then(result => {
      res.render('incomes/delete', {income: result, title: 'Delete Income'});
    })
    .catch(err => console.log(err));
}

const income_edit_get = (req, res) => {
  const id = req.params.id;
    Income.findById(id)
    .then(result => {
      res.render('incomes/edit', {income: result, title: 'Edit Income'});
    })
    .catch(err => console.log(err));
}

const income_edit = async (req, res) => {
const id = req.params.id;
const income = new Income(req.body);
Income.findById(id)
.then(result => {
  result.fundId = income.fundId;
  result.statusId = income.statusId;
  result.cashAmount = income.cashAmount;
  result.checkAmount = income.checkAmount;
  result.coinAmount = income.coinAmount;
  result.incomeDate = income.incomeDate;
  result.checkNumber = income.checkNumber;
  result.comment = income.comment;
  result.enteredBy = income.enteredBy;
  result.save();
  res.redirect('/incomes');
})
.catch(err => console.log(err));
  
}

module.exports = {
    income_index,
    income_details,
    income_create_get,
    income_create_post,
    income_delete_get,
    income_delete,
    income_edit_get,
    income_edit
}
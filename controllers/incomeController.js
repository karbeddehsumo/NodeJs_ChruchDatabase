const Fund = require('../models/fund');
const Income = require('../models/income');

const income_index = async (req, res) => {
    const churchId = req.params.id;
    await Income.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('incomes/index', { title: 'All Incomes', incomes: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const income_details = async (req, res) => {
    const id = req.params.id;
    await Income.findById(id)
     .then((result) => {
      res.render("incomes/details", { income: result, title: 'Income Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Income not found'});
    });
}

const income_create_get = async (req, res) => {
  const churchId = req.params.id;
  const todayDate = new Date();
  await Fund.find({ church: churchId}).sort({ createdAt: -1 })
  .then((result) => {
    console.log('Here is the fund result');
    console.log(result);
    res.render('incomes/create', {title: 'Create a New income', churchId, funds: result, todayDate});
  })
  .catch((err) => {
    res.status(404).render('404', {title: 'Income not found'});
  });
  

}

const income_create_post = (req, res) => {
  console.log("Her is teh income data");
  console.log(req.body)
  const income = new Income(req.body);
  income.church = req.body.churchId;

  income.save()
  .then((result) => {
    res.redirect("/incomes/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const income_delete = async (req, res) => {
 const id = req.params.id;
  await Income.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/incomes");
  })
  .catch((err) => {
    console.log(err);
  });
}
const income_delete_get = async (req, res) => {
  const id = req.params.id;
    await Income.findById(id)
    .then(result => {
      res.render('incomes/delete', {income: result, title: 'Delete Income'});
    })
    .catch(err => console.log(err));
}

const income_edit_get = async (req, res) => {
  const id = req.params.id;
    await Income.findById(id)
    .then(result => {
      res.render('incomes/edit', {income: result, title: 'Edit Income'});
    })
    .catch(err => console.log(err));
}

const income_edit = async (req, res) => {
const id = req.params.id;
const income = new Income(req.body);
await Income.findById(id)
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
const BankBalance = require('../models/bankBalance');
const Bank = require('../models/bank');

const bankBalance_index = async (req, res) => {
    const churchId = req.params.id;
    await BankBalance.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('bankBalances/index', { title: 'All bank balances', bankBalances: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const bankBalance_details = async (req, res) => {
    const id = req.params.id;
    await BankBalance.findById(id)
     .then((result) => {
      res.render("bankBalance/details", { bank: result, title: 'bank balance Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'bank balance not found'});
    });
}

const bankBalance_create_get = async (req, res) => {
    const churchId = req.params.id;
    await Bank.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('bankBalances/create', {title: 'Create a New bank balance', banks: result, churchId});
   })
   .catch((err) => {
     res.status(404).render('404', {title: 'bank balance not found'});
   });
    
}

const bankBalance_create_post = (req, res) => {
  const bank = new BankBalance(req.body);
  console.log('Here is the bank Balance');
  console.log(req.body);

  bank.save()
  .then((result) => {
    res.redirect("/bankBalances");
  })
  .catch((err) => {
    console.log(err);
  });
}

const bankBalance_delete = async (req, res) => {
 const id = req.params.id;
  await BankBalance.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/bankBalances");
  })
  .catch((err) => {
    console.log(err);
  });
}
const bankBalance_delete_get = async (req, res) => {
  const id = req.params.id;
    await BankBalance.findById(id)
    .then(result => {
      res.render('bankBalance/delete', {bank: result, title: 'Delete bank balance'});
    })
    .catch(err => console.log(err));
}

const bankBalance_edit_get = async (req, res) => {
  const id = req.params.id;
    await BankBalance.findById(id)
    .then(result => {
      res.render('bankBalance/edit', {bank: result, title: 'Edit bank balance'});
    })
    .catch(err => console.log(err));
}

const bankBalance_edit = async (req, res) => {
const id = req.params.id;
const bankBalance = new BankBalance(req.body);
await BankBalance.findById(id)
.then(result => {
  result.church = bankBalance.church;
  result.bank = bankBalance.bank;
  result.beginDate = bankBalance.beginDate;
  result.endDate = babankBalancenk.endDate;
  result.beginBalance = bankBalance.beginBalance;
  result.endBalance = bankBalance.endBalance;
  result.income = bankBalance.income;
  result.expense = bankBalance.expense;
  result.revenueAmount = bankBalance.revenueAmount;
  result.enteredBy = bankBalance.enteredBy;
  result.save();
  res.redirect('/bankBalance');
})
.catch(err => console.log(err));
  
}

module.exports = {
    bankBalance_index,
    bankBalance_details,
    bankBalance_create_get,
    bankBalance_create_post,
    bankBalance_delete_get,
    bankBalance_delete,
    bankBalance_edit_get,
    bankBalance_edit
}
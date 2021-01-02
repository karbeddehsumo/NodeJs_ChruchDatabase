const Bank = require('../models/bank');

const bank_index = async (req, res) => {
    const id = req.params.id;
    await bank.find({ Church: id }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('bank/index', { title: 'All bank', bank: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const bank_details = async (req, res) => {
    const id = req.params.id;
    await Bank.findById(id)
     .then((result) => {
      res.render("bank/details", { bank: result, title: 'bank Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'bank not found'});
    });
}

const bank_create_get = (req, res) => {
    res.render('bank/create', {title: 'Create a New bank'});
}

const bank_create_post = (req, res) => {
  const bank = new Bank(req.body);
  
  bank.save()
  .then((result) => {
    res.redirect("/bank");
  })
  .catch((err) => {
    console.log(err);
  });
}

const bank_delete = async (req, res) => {
 const id = req.params.id;
  await Bank.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/bank");
  })
  .catch((err) => {
    console.log(err);
  });
}
const bank_delete_get = async (req, res) => {
  const id = req.params.id;
    await Bank.findById(id)
    .then(result => {
      res.render('bank/delete', {bank: result, title: 'Delete bank'});
    })
    .catch(err => console.log(err));
}

const bank_edit_get = async (req, res) => {
  const id = req.params.id;
    await Bank.findById(id)
    .then(result => {
      res.render('bank/edit', {bank: result, title: 'Edit bank'});
    })
    .catch(err => console.log(err));
}

const bank_edit = async (req, res) => {
const id = req.params.id;
const bank = new Bank(req.body);
await Bank.findById(id)
.then(result => {
  result.church = bank.church;
  result.accountName = bank.accountName;
  result.accountNumber = bank.accountNumber;
  result.description = bank.description;
  result.enteredBy = bank.enteredBy;
  result.save();
  res.redirect('/bank');
})
.catch(err => console.log(err));
  
}

module.exports = {
    bank_index,
    bank_details,
    bank_create_get,
    bank_create_post,
    bank_delete_get,
    bank_delete,
    bank_edit_get,
    bank_edit
}
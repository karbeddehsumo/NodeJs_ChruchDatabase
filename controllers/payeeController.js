const Payee = require('../models/payee');
const Church = require('../models/church');
const Constant = require('../models/constant');
const Fund = require('../models/fund');
const { populate } = require('../models/church');

const payee_index = async (req, res) => {
    const churchId = req.params.id;
    await Payee.find({ church: churchId }).sort({ createdAt: -1 })
    .populate('fund','name _id)')
    .populate('constant','name _id')
    .then((result) => {
      res.render('payees/index', { title: 'All payee', payees: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const payee_details = async (req, res) => {
    const id = req.params.id;
    await Payee.findById(id)
    .populate('fund','name _id')
     .then((result) => {
      res.render("payees/details", { payee: result, title: 'payee Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'payee not found'});
    });
}

const payee_create_get = async  (req, res) => {
  const churchId = req.params.id;
  const funds = await Fund.find({church: churchId},'_id name').sort({ name: 1 });
  const types = await Constant.find({church: churchId, category: 'Payee Type'},'_id category name value1').sort({ sort: -1 });
  const frequencies = await Constant.find({church: churchId, category: 'Payee Frequency'},'_id category name value1').sort({ sort: -1 });
  res.render('payees/create', {title: 'Create a New payee', churchId, types, funds, frequencies});
}

const payee_create_post = (req, res) => {
  const payee = new Payee(req.body);
  payee.church = req.body.churchId;
  payee.enteredBy = global.userId;
  payee.save()
  .then((result) => {
    res.redirect("/payees/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const payee_delete = async (req, res) => {
 const id = req.params.id;
  await Payee.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/payee");
  })
  .catch((err) => {
    console.log(err);
  });
}

const payee_delete_get = async (req, res) => {
  const id = req.params.id;
    await Payee.findById(id)
    .then(result => {
      res.render('payee/delete', {payee: result, title: 'Delete payee'});
    })
    .catch(err => console.log(err));
}

const payee_edit_get = async (req, res) => {
  const id = req.params.id;
    await Payee.findById(id)
    .then(result => {
      res.render('payee/edit', {payee: result, title: 'Edit payee'});
    })
    .catch(err => console.log(err));
}

const payee_edit = async (req, res) => {
const id = req.params.id;
const payee = new Payee(req.body);
await Payee.findById(id)
.then(result => {
  result.church = payee.church;
  result.fund = payee.fund;
  result.payee = payee.payee;
  result.phone = payee.phone;

  result.url = payee.url;
  result.fequency = payee.fequency;
  result.description = payee.description;
  result.payeeType = payee.payeeType;
  result.status = payee.status;


  result.enteredBy = payee.enteredBy;
  result.save();
  res.redirect('/payee');
})
.catch(err => console.log(err));
  
}

module.exports = {
    payee_index,
    payee_details,
    payee_create_get,
    payee_create_post,
    payee_delete_get,
    payee_delete,
    payee_edit_get,
    payee_edit
}
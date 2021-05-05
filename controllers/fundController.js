const Fund = require('../models/fund');
const Bank = require('../models/bank');
const Church = require('../models/church');

const fund_index = async (req, res) => {
    const churchId = req.params.id;
    const banks = await Bank.findById(churchId);
    await Fund.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('funds/index', { title: 'All fund', funds: result, churchId, banks })
    })
    .catch((err) => {
      console.log(err)
    })
}

const fund_details = async (req, res) => {
    const id = req.params.id;
    await Fund.findById(id)
     .then((result) => {
      res.render("fund/details", { fund: result, title: 'Fund Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Fund not found'});
    });
}

const fund_create_get = async (req, res) => {
    const churchId = req.params.id;
    await Bank.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('funds/create', {title: 'Create a New Fund', churchId, banks: result});
    })
    .catch((err) => {
      res.status(404).rednder('404', {title: 'Banks not found'});
    })
}

const fund_create_post = (req, res) => {
  const fund = new Fund(req.body);
  fund.church = req.body.churchId;
  fund.enteredBy = global.userId;
  fund.save()
  .then((result) => {
    res.redirect("/funds/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const fund_delete = async (req, res) => {
 const id = req.params.id;
  await Fund.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/fund");
  })
  .catch((err) => {
    console.log(err);
  });
}
const fund_delete_get = async (req, res) => {
  const id = req.params.id;
    await Fund.findById(id)
    .then(result => {
      res.render('fund/delete', {fund: result, title: 'Delete Fund'});
    })
    .catch(err => console.log(err));
}

const fund_edit_get = async (req, res) => {
  const id = req.params.id;
    await Fund.findById(id)
    .then(result => {
      res.render('fund/edit', {fund: result, title: 'Edit fund'});
    })
    .catch(err => console.log(err));
}

const fund_edit = async (req, res) => {
const id = req.params.id;
const fund = new Fund(req.body);
await Fund.findById(id)
.then(result => {
  result.church = fund.church;
  result.name = fund.name;
  result.category = fund.category;
  result.bank = fund.bank;
  result.description = fund.description;
  result.enteredBy = global.userId;
  result.save();
  res.redirect('/fund');
})
.catch(err => console.log(err));
  
}

module.exports = {
    fund_index,
    fund_details,
    fund_create_get,
    fund_create_post,
    fund_delete_get,
    fund_delete,
    fund_edit_get,
    fund_edit
}
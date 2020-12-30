const Fund = require('../models/fund');

const fund_index = async (req, res) => {
    const id = req.params.id;
    await Fund.find({ Church: id }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('fund/index', { title: 'All fund', fund: result })
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

const fund_create_get = (req, res) => {
    res.render('fund/create', {title: 'Create a New Fund'});
}

const fund_create_post = (req, res) => {
  const fund = new Fund(req.body);
  
  fund.save()
  .then((result) => {
    res.redirect("/fund");
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
  result.fund = fund.fund;
  result.category = fund.category;
  result.bank = fund.bank;
  result.description = fund.description;
  result.enteredBy = fund.enteredBy;
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
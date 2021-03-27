const Payee = require('../models/payee');
const Church = require('../models/church');

const payee_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Payee.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('payees/index', { title: 'All payee', payees: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const payee_details = async (req, res) => {
    const id = req.params.id;
    await Payee.findById(id)
     .then((result) => {
      res.render("payee/details", { payee: result, title: 'payee Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'payee not found'});
    });
}

const payee_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('payees/create', {title: 'Create a New payee', churchId});
}

const payee_create_post = (req, res) => {
  const payee = new Payee(req.body);
  payee.church = req.body.churchId;

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
const Pledge = require('../models/pledge');
const Church = require('../models/church');
const Member = require('../models/member');
const Fund = require('../models/fund');
const Constant = require('../models/constant');

const pledge_index = async (req, res) => {
    const churchId = req.params.id;
    await Pledge.find({ church: churchId }).sort({ createdAt: -1 })
    .populate('member','firstName lastName _id')
    .populate('fund','name _id')
    .then((result) => {
      res.render('pledges/index', { title: 'All pledge', pledges: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const pledge_details = async (req, res) => {
    const id = req.params.id;
    await Pledge.findById(id)
    .populate('member','firstName lastName _id')
    .populate('fund','name _id')
     .then((result) => {
      res.render("pledges/details", { pledge: result, title: 'pledge Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'pledge not found'});
    });
}

const pledge_create_get = async (req, res) => {
  const churchId = req.params.id;
  let year = new Date().getFullYear();
  var pledgeYear = [year-1,year,year+1]
  const members = await Member.find({church: churchId},'_id firstName lastName').sort({ sort: -1 });
  const frequencies = await Constant.find({church: churchId, category: 'Payee Frequency'},'_id category name value1').sort({ sort: -1 });
  const funds = await Fund.find({church: churchId},'_id name').sort({ name: 1 });

    res.render('pledges/create', {title: 'Create a New pledge', churchId, members, frequencies, funds, pledgeYear});
}

const pledge_create_post = (req, res) => {
  const pledge = new Pledge(req.body);
  pledge.church = req.body.churchId;
  pledge.enteredBy = global.userId;
  pledge.save()
  .then((result) => {
    res.redirect("/pledges/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const pledge_delete = async (req, res) => {
 const id = req.params.id;
  await Pledge.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/pledge");
  })
  .catch((err) => {
    console.log(err);
  });
}

const pledge_delete_get = async (req, res) => {
  const id = req.params.id;
    await Pledge.findById(id)
    .then(result => {
      res.render('pledge/delete', {pledge: result, title: 'Delete pledge'});
    })
    .catch(err => console.log(err));
}

const pledge_edit_get = async (req, res) => {
  const id = req.params.id;
    await Pledge.findById(id)
    .then(result => {
      res.render('pledge/edit', {pledge: result, title: 'Edit pledge'});
    })
    .catch(err => console.log(err));
}

const pledge_edit = async (req, res) => {
const id = req.params.id;
const pledge = new Pledge(req.body);
await Pledge.findById(id)
.then(result => {
  result.church = pledge.church;
  result.member = pledge.member;
  result.frequency = pledge.frequency;
  result.amount = pledge.amount;
  result.year = pledge.year;
  result.enteredBy = pledge.enteredBy;
  result.save();
  res.redirect('/pledge');
})
.catch(err => console.log(err));
  
}

module.exports = {
    pledge_index,
    pledge_details,
    pledge_create_get,
    pledge_create_post,
    pledge_delete_get,
    pledge_delete,
    pledge_edit_get,
    pledge_edit
}
const Calendar = require('../models/calendar');
const Church = require('../models/church');
const Constant = require('../models/constant');
const Ministry = require("../models/ministry");
const moment = require('moment');

const calendar_index = async (req, res) => {
    const churchId = req.params.id;
    await Calendar.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('calendars/index', { title: 'All calendar', calendars: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const calendar_details = async (req, res) => {
    const id = req.params.id;
    
    await Calendar.findById(id)
     .then((result) => {
      res.render("calendars/details", { calendar: result, title: 'calendar Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'calendar not found'});
    });
}

const calendar_create_get = async (req, res) => {
  const churchId = req.params.id;
  const ministries = await Ministry.find({church: churchId},'_id name').sort({ name: 1 });
  const venues = await Constant.find({church: churchId, category: 'Venue'},'_id category name value1').sort({ sort: -1 });
  const access = await Constant.find({category: 'Calendar Access'}, '_id category name value1').sort({ sort: 1});
    res.render('calendars/create', {title: 'Create a New calendar', churchId, ministries, venues, access});

    }

const calendar_create_post = (req, res) => {
  const calendar = new Calendar(req.body);
  calendar.church = req.body.churchId;
  if (req.body.ministry1 != 'None')
  {
    calendar.ministries.push(req.body.ministry1);
  }
  if (req.body.ministry2 != 'None')
  {
    calendar.ministries.push(req.body.ministry2);
  }
  if (req.body.ministry3 != 'None')
  {
    calendar.ministries.push(req.body.ministry3);
  }
  
  calendar.enteredBy = global.userId;
  calendar.save()
  .then((result) => {
    res.redirect("/calendars/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const calendar_delete = async (req, res) => {
 const id = req.params.id;
  await Calendar.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/calendars");
  })
  .catch((err) => {
    console.log(err);
  });
}

const calendar_delete_get = async (req, res) => {
  const id = req.params.id;
    await Calendar.findById(id)
    .then(result => {
      res.render('calendars/delete', {calendar: result, title: 'Delete calendar'});
    })
    .catch(err => console.log(err));
}

const calendar_edit_get = async (req, res) => {
  const id = req.params.id;
  const ministries = await Ministry.find({church: global.churchId},'_id name').sort({ name: 1 });
  const venues = await Constant.find({church: global.churchId, category: 'Venue'},'_id category name value1').sort({ sort: -1 });
  const access = await Constant.find({category: 'Calendar Access'}, '_id category name value1').sort({ sort: 1});
    await Calendar.findById(id)
    .populate('ministries','_id name')
    .then(result => {
      res.render('calendars/edit', {calendar: result, title: 'Edit calendar', ministries,venues, access, moment});
    })
    .catch(err => console.log(err));
}

const calendar_edit = async (req, res) => {
const id = req.params.id;
const calendar = new Calendar(req.body);
await Calendar.findById(id)
.then(result => {
  result.church = calendar.church;
  result.fund = calendar.fund;
  result.year = calendar.year;
  result.amount = calendar.amount;
  result.enteredBy = global.userId;
  result.save();
  res.redirect('/calendars/church/' + req.body.church);
})
.catch(err => console.log(err));
  
}

module.exports = {
    calendar_index,
    calendar_details,
    calendar_create_get,
    calendar_create_post,
    calendar_delete_get,
    calendar_delete,
    calendar_edit_get,
    calendar_edit
}
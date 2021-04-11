const Calendar = require('../models/calendar');
const Church = require('../models/church');

const calendar_index = async (req, res) => {
    const churchId = req.params.id;
     const churchName = global.churchName;
    await Calendar.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('calendars/index', { title: 'All calendar', calendars: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const calendar_details = async (req, res) => {
    const id = req.params.id;
    await Calendar.findById(id)
     .then((result) => {
      res.render("calendar/details", { calendar: result, title: 'calendar Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'calendar not found'});
    });
}

const calendar_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('calendars/create', {title: 'Create a New calendar', churchId});
}

const calendar_create_post = (req, res) => {
  const calendar = new Calendar(req.body);
  calendar.church = req.body.churchId;
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
    res.redirect("/calendar");
  })
  .catch((err) => {
    console.log(err);
  });
}

const calendar_delete_get = async (req, res) => {
  const id = req.params.id;
    await Calendar.findById(id)
    .then(result => {
      res.render('calendar/delete', {calendar: result, title: 'Delete calendar'});
    })
    .catch(err => console.log(err));
}

const calendar_edit_get = async (req, res) => {
  const id = req.params.id;
    await Calendar.findById(id)
    .then(result => {
      res.render('calendar/edit', {calendar: result, title: 'Edit calendar'});
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
  result.enteredBy = calendar.enteredBy;
  result.save();
  res.redirect('/calendar');
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
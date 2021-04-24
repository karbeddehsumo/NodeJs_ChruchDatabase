const Meeting = require('../models/meeting');
const Church = require('../models/church');

const meeting_index = async (req, res) => {
    const churchId = req.params.id;
    await meeting.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('meetings/index', { title: 'All meeting', meetings: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const meeting_details = async (req, res) => {
    const id = req.params.id;
    await Meeting.findById(id)
     .then((result) => {
      res.render("meeting/details", { meeting: result, title: 'meeting Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'meeting not found'});
    });
}

const meeting_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('meetings/create', {title: 'Create a New meeting', churchId});
}

const meeting_create_post = (req, res) => {
  const meeting = new Meeting(req.body);
  meeting.church = req.body.churchId;
  meeting.enteredBy = global.userId;
  meeting.save()
  .then((result) => {
    res.redirect("/meetings/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const meeting_delete = async (req, res) => {
 const id = req.params.id;
  await Meeting.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/meeting");
  })
  .catch((err) => {
    console.log(err);
  });
}

const meeting_delete_get = async (req, res) => {
  const id = req.params.id;
    await Meeting.findById(id)
    .then(result => {
      res.render('meeting/delete', {meeting: result, title: 'Delete meeting'});
    })
    .catch(err => console.log(err));
}

const meeting_edit_get = async (req, res) => {
  const id = req.params.id;
    await Meeting.findById(id)
    .then(result => {
      res.render('meeting/edit', {meeting: result, title: 'Edit meeting'});
    })
    .catch(err => console.log(err));
}

const meeting_edit = async (req, res) => {
const id = req.params.id;
const meeting = new Meeting(req.body);
await Meeting.findById(id)
.then(result => {
  result.church = meeting.church;
  result.fund = meeting.fund;
  result.year = meeting.year;
  result.amount = meeting.amount;
  result.enteredBy = meeting.enteredBy;
  result.save();
  res.redirect('/meeting');
})
.catch(err => console.log(err));
  
}

module.exports = {
    meeting_index,
    meeting_details,
    meeting_create_get,
    meeting_create_post,
    meeting_delete_get,
    meeting_delete,
    meeting_edit_get,
    meeting_edit
}
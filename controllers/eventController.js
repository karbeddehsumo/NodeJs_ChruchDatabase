const Event = require('../models/event');
const Church = require('../models/church');

const event_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Event.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('events/index', { title: 'All event', events: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const event_details = async (req, res) => {
    const id = req.params.id;
    await Event.findById(id)
     .then((result) => {
      res.render("event/details", { event: result, title: 'event Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'event not found'});
    });
}

const event_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('events/create', {title: 'Create a New event', churchId});
}

const event_create_post = (req, res) => {
  const event = new Event(req.body);
  event.church = req.body.churchId;

  event.save()
  .then((result) => {
    res.redirect("/events/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const event_delete = async (req, res) => {
 const id = req.params.id;
  await Event.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/event");
  })
  .catch((err) => {
    console.log(err);
  });
}

const event_delete_get = async (req, res) => {
  const id = req.params.id;
    await Event.findById(id)
    .then(result => {
      res.render('event/delete', {event: result, title: 'Delete event'});
    })
    .catch(err => console.log(err));
}

const event_edit_get = async (req, res) => {
  const id = req.params.id;
    await Event.findById(id)
    .then(result => {
      res.render('event/edit', {event: result, title: 'Edit event'});
    })
    .catch(err => console.log(err));
}

const event_edit = async (req, res) => {
const id = req.params.id;
const event = new Event(req.body);
await Event.findById(id)
.then(result => {
  result.church = event.church;
  result.ministry = event.ministry;
  result.title = event.title;
  result.beginDate = event.beginDate;

  result.endDate = event.endDate;
  result.startTime = event.startTime;
  result.endTime = event.endTime;
  result.budget = event.budget;
  result.missionStatement = event.missionStatement;
  
  result.enteredBy = event.enteredBy;
  result.save();
  res.redirect('/event');
})
.catch(err => console.log(err));
  
}

module.exports = {
    event_index,
    event_details,
    event_create_get,
    event_create_post,
    event_delete_get,
    event_delete,
    event_edit_get,
    event_edit
}
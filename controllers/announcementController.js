const Announcement = require('../models/announcement');

const announcement_index = (req, res) => {
    Announcement.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('announcements/index', { title: 'All Announcements', announcements: result })
    })
    .catch((err) => {
      console.log(err)
    });
}

const announcement_details = (req, res) => {
    const id = req.params.id;
    Announcement.findById(id)
     .then((result) => {
      res.render("announcements/details", { announcement: result, title: 'Announcement Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Announcement not found'});
    });
}

const announcement_create_get = (req, res) => {
    res.render('announcements/create', {title: 'Create a New Announcement'});
}

const announcement_create_post = (req, res) => {
  const announcement = new Announcement(req.body);
  
  announcement.save()
  .then((result) => {
    res.redirect("/announcements");
  })
  .catch((err) => {
    console.log(err);
  });
}

const announcement_delete = async (req, res) => {
 const id = req.params.id;
  await Announcement.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/announcements");
  })
  .catch((err) => {
    console.log(err);
  });
}
const announcement_delete_get = async (req, res) => {
  const id = req.params.id;
    await Announcement.findById(id)
    .then(result => {
      res.render('announcements/delete', {announcement: result, title: 'Delete Announcement'});
    })
    .catch(err => console.log(err));
}

const announcement_edit_get = async (req, res) => {
  const id = req.params.id;
    await Announcement.findById(id)
    .then(result => {
      res.render('announcements/edit', {announcement: result, title: 'Edit Announcement'});
    })
    .catch(err => console.log(err));
}

const announcement_edit = async (req, res) => {
const id = req.params.id;
const announcement = new Announcement(req.body);
await Announcement.findById(id)
.then(result => {
  result.ministryId = announcement.ministryId;
  result.documentId = announcement.documentId;
  result.title = announcement.title;
  result.beginDate = announcement.beginDate;
  result.endDate = announcement.endDate;
  result.message = announcement.message;
  result.statusId = announcement.statusId;
  result.enteredBy = announcement.enteredBy;
  result.save();
  res.redirect('/announcements');
})
.catch(err => console.log(err));
  
}

module.exports = {
    announcement_index,
    announcement_details,
    announcement_create_get,
    announcement_create_post,
    announcement_delete_get,
    announcement_delete,
    announcement_edit_get,
    announcement_edit
}
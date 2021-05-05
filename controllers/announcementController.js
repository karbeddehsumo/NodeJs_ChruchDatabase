const Announcement = require('../models/announcement');
const Ministry = require('../models/ministry');
const Constant = require('../models/constant');
const moment = require('moment');

const announcement_index = async (req, res) => {
    const churchId = req.params.id;
    await Announcement.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      console.log('Inside announcement');
      console.log(result);
      res.render('announcements/index', { title: 'All Announcements', announcements: result, churchId })
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

const announcement_create_get = async (req, res) => {
  const churchId = req.params.id;
  const ministries = await Ministry.find({church: churchId},'_id name').sort({ name: 1 });
  const access = await Constant.find({church: churchId, category: 'Calendar Access'}, '_id category name value1').sort({ sort: 1});
  const status = await Constant.find({category: 'Status'}, '_id category name value1').sort({ sort: 1}); 
  res.render('announcements/create', {title: 'Create a New Announcement', ministries, access, churchId, status});
}

const announcement_create_post = (req, res) => {
  const announcement = new Announcement(req.body);
  announcement.access = req.body.access;

  announcement.enteredBy = global.userId;
  announcement.church = req.body.churchId;
  announcement.enteredBy = global.userId;
  if (req.body.ministry1 != 'None')
  {
    announcement.ministries.push(req.body.ministry1);
  }
  if (req.body.ministry2 != 'None')
  {
    announcement.ministries.push(req.body.ministry2);
  }
  if (req.body.ministry3 != 'None')
  {
    announcement.ministries.push(req.body.ministry3);
  }
  
  announcement.save()
  .then((result) => {
    res.redirect("/announcements/church/" + req.body.churchId);
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
  const status = await Constant.find({category: 'Status'}, '_id category name value1').sort({ sort: 1});
  const access = await Constant.find({ category: 'Calendar Access'}, '_id category name value1').sort({ sort: 1});
  const ministries = await Ministry.find({church: global.churchId},'_id name').sort({ name: 1 });
  await Announcement.findById(id)
    .populate('church','name _id')
    .populate('ministries','name _id')
    .then(result => {

      //result.startDate = result.moment().format('l');
      //result.endDate = moment(result.endDate).utc().format("mm-dd-yyyy");
      console.log('Here in announcement access');
      console.log(result);
      res.render('announcements/edit', {announcement: result, title: 'Edit Announcement', moment, status, access, ministries});
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
  result.enteredBy = global.userId;
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
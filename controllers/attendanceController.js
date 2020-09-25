const Attendance = require('../models/attendance');

const attendance_index = (req, res) => {
    Attendance.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('attendances/index', { title: 'All attendances', attendances: result })
    })
    .catch((err) => {
      console.log(err)
    });
}

const attendance_details = (req, res) => {
    const id = req.params.id;
    Attendance.findById(id)
     .then((result) => {
      res.render("attendances/details", { attendance: result, title: 'attendance Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'attendance not found'});
    });
}

const attendance_create_get = (req, res) => {
    res.render('attendances/create', {title: 'Create a New attendance'});
}

const attendance_create_post = (req, res) => {
  const attendance = new Attendance(req.body);
  attendance.dateEntered = Date.now();
  attendance.enteredBy = "4567890";
  attendance.save()
  .then((result) => {
    res.redirect("/attendances");
  })
  .catch((err) => {
    console.log(err);
  });
}

const attendance_delete = (req, res) => {
 const id = req.params.id;
 Attendance.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/attendances");
  })
  .catch((err) => {
    console.log(err);
  });
}
const attendance_delete_get = (req, res) => {
  const id = req.params.id;
  Attendance.findById(id)
    .then(result => {
      res.render('attendances/delete', {attendance: result, title: 'Delete attendance'});
    })
    .catch(err => console.log(err));
}

const attendance_edit_get = (req, res) => {
  const id = req.params.id;
  Attendance.findById(id)
    .then(result => {
      res.render('attendances/edit', {attendance: result, title: 'Edit attendance'});
    })
    .catch(err => console.log(err));
}

const attendance_edit = async (req, res) => {
const id = req.params.id;
const attendance = new Attendance(req.body);
Attendance.findById(id)
.then(result => {
  result.memberId = attendance.memberId;
  result.calenderId = attendance.calenderId;
  result.rollCall = attendance.rollCall;
  result.enteredBy = attendance.enteredBy;
  result.save();
  res.redirect('/attendances');
})
.catch(err => console.log(err));
  
}

module.exports = {
    attendance_index,
    attendance_details,
    attendance_create_get,
    attendance_create_post,
    attendance_delete_get,
    attendance_delete,
    attendance_edit_get,
    attendance_edit
}
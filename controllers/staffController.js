const Staff = require('../models/staff');
const Church = require('../models/church');

const staff_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Staff.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('staffs/index', { title: 'All staff', staffs: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const staff_details = async (req, res) => {
    const id = req.params.id;
    await Staff.findById(id)
     .then((result) => {
      res.render("staff/details", { staff: result, title: 'staff Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'staff not found'});
    });
}

const staff_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('staffs/create', {title: 'Create a New staff', churchId});
}

const staff_create_post = (req, res) => {
  const staff = new Staff(req.body);
  staff.church = req.body.churchId;

  staff.save()
  .then((result) => {
    res.redirect("/staffs/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const staff_delete = async (req, res) => {
 const id = req.params.id;
  await Staff.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/staff");
  })
  .catch((err) => {
    console.log(err);
  });
}

const staff_delete_get = async (req, res) => {
  const id = req.params.id;
    await Staff.findById(id)
    .then(result => {
      res.render('staff/delete', {staff: result, title: 'Delete staff'});
    })
    .catch(err => console.log(err));
}

const staff_edit_get = async (req, res) => {
  const id = req.params.id;
    await Staff.findById(id)
    .then(result => {
      res.render('staff/edit', {staff: result, title: 'Edit staff'});
    })
    .catch(err => console.log(err));
}

const staff_edit = async (req, res) => {
const id = req.params.id;
const staff = new Staff(req.body);
await Staff.findById(id)
.then(result => {
  result.church = staff.church;
  result.firstName = staff.firstName;
  result.lastName = staff.lastName;
  result.middleName = staff.MiddleName;

  result.title = staff.title;
  result.department = staff.department;
  result.jobDesctiption = staff.jobDescription;
  result.supervisor = staff.supervisor;

  result.picture = staff.picture;
  result.dateHired = staff.dateHired;
  result.status = staff.status;
  

  result.enteredBy = staff.enteredBy;
  result.save();
  res.redirect('/staff');
})
.catch(err => console.log(err));
  
}

module.exports = {
    staff_index,
    staff_details,
    staff_create_get,
    staff_create_post,
    staff_delete_get,
    staff_delete,
    staff_edit_get,
    staff_edit
}
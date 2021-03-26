const Ministry = require('../models/ministry');
const Church = require('../models/church');

const ministry_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Ministry.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('ministrys/index', { title: 'All ministry', ministrys: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const ministry_details = async (req, res) => {
    const id = req.params.id;
    await Ministry.findById(id)
     .then((result) => {
      res.render("ministry/details", { ministry: result, title: 'ministry Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'ministry not found'});
    });
}

const ministry_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('ministrys/create', {title: 'Create a New ministry', churchId});
}

const ministry_create_post = (req, res) => {
  const ministry = new Ministry(req.body);
  ministry.church = req.body.churchId;

  ministry.save()
  .then((result) => {
    res.redirect("/ministrys/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const ministry_delete = async (req, res) => {
 const id = req.params.id;
  await Ministry.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/ministry");
  })
  .catch((err) => {
    console.log(err);
  });
}

const ministry_delete_get = async (req, res) => {
  const id = req.params.id;
    await Ministry.findById(id)
    .then(result => {
      res.render('ministry/delete', {ministry: result, title: 'Delete ministry'});
    })
    .catch(err => console.log(err));
}

const ministry_edit_get = async (req, res) => {
  const id = req.params.id;
    await Ministry.findById(id)
    .then(result => {
      res.render('ministry/edit', {ministry: result, title: 'Edit ministry'});
    })
    .catch(err => console.log(err));
}

const ministry_edit = async (req, res) => {
const id = req.params.id;
const ministry = new Ministry(req.body);
await Ministry.findById(id)
.then(result => {
  result.church = ministry.church;
  result.parentMinistry = ministry.parentMinistry;
  result.ministryName = ministry.ministryName;
  result.description = ministry.description;

  result.contact = ministry.contact;
  result.email = ministry.email;
  result.phone = ministry.phone;

  result.missionStatement = ministry.missionStatement;

  result.enteredBy = ministry.enteredBy;
  result.save();
  res.redirect('/ministry');
})
.catch(err => console.log(err));
  
}

module.exports = {
    ministry_index,
    ministry_details,
    ministry_create_get,
    ministry_create_post,
    ministry_delete_get,
    ministry_delete,
    ministry_edit_get,
    ministry_edit
}
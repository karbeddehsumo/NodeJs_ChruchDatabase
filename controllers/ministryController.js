const Ministry = require('../models/ministry');
const Church = require('../models/church');

const ministry_index = async (req, res) => {
    const churchId = req.params.id;
    await Ministry.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      console.log('Here are the list of ministries');
      console.log(result);
      res.render('ministries/index', { title: 'All ministry', ministries: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const ministry_details = async (req, res) => {
    const id = req.params.id;
    await Ministry.findById(id)
     .then((result) => {
      res.render("ministries/details", { ministry: result, title: 'ministry Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'ministry not found'});
    });
}

const ministry_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('ministries/create', {title: 'Create a New ministry', churchId});
}

const ministry_create_post = (req, res) => {
  const ministry = new Ministry(req.body);
  ministry.church = req.body.churchId;
  ministry.enteredBy = global.userId;
  ministry.save()
  .then((result) => {
    res.redirect("/ministries/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const ministry_delete = async (req, res) => {
 const id = req.params.id;
  await Ministry.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/ministries");
  })
  .catch((err) => {
    console.log(err);
  });
}

const ministry_delete_get = async (req, res) => {
  const id = req.params.id;
    await Ministry.findById(id)
    .then(result => {
      res.render('ministries/delete', {ministry: result, title: 'Delete ministry'});
    })
    .catch(err => console.log(err));
}

const ministry_edit_get = async (req, res) => {
  const id = req.params.id;
    await Ministry.findById(id)
    .then(result => {
      res.render('ministries/edit', {ministry: result, title: 'Edit Ministry'});
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

  result.enteredBy = global.userId;
  result.save();
  res.redirect("/ministries/church/" + req.body.churchId);
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
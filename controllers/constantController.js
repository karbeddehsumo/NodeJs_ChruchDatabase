const Constant = require('../models/constant');
const Church = require("../models/church");

//app.get('*', checkUser); //put user values in res.locals
const constant_index = async (req, res) => {
    const id = req.params.id;
     const churchName = global.churchName;

    Constant.find({ church: id }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('constants/index', { title: 'All constants', constants: result, churchId: id, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const constant_details = (req, res) => {
    const id = req.params.id;
    Constant.findById(id)
     .then((result) => {
      res.render("constants/details", { constant: result, title: 'constant Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'constant not found'});
    });
}

const constant_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('constants/create', {title: 'Create a New constant', churchId});
}

const constant_create_post = async (req, res) => {
  const constant = new Constant(req.body);
  constant.enteredBy = global.userId;
  constant.church = req.body.churchId;
  constant.status = "Active";
  constant.save()
  .then((result) => {
    res.redirect("/constants/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const constant_delete = async (req, res) => {
 const id = req.params.id;
 await Constant.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/constants");
  })
  .catch((err) => {
    console.log(err);
  });
}
const constant_delete_get = async (req, res) => {
  const id = req.params.id;
  await Constant.findById(id)
    .then(result => {
      res.render('constants/delete', {constant: result, title: 'Delete constant'});
    })
    .catch(err => console.log(err));
}

const constant_edit_get = async (req, res) => {
  const id = req.params.id;
    await Constant.findById(id)
    .then(result => {
      res.render('constants/edit', {constant: result, title: 'Edit constant'});
    })
    .catch(err => console.log(err));
}

const constant_edit = async (req, res) => {
const id = req.params.id;
const constant = new Constant(req.body);
console.log(constant);
await Constant.findById(id)
.then(result => {
  result.category = constant.category;
  result.name = constant.name;
  result.value1 = constant.value1;
  result.value2 = constant.value2;
  result.value3 = constant.value3;
  result.sort = constant.sort;
  result.status = constant.status;
  result.enteredBy = constant.enteredBy;
  result.save();
  res.redirect('/constants');
})
.catch(err => console.log(err));
  
}

module.exports = {
    constant_index,
    constant_details,
    constant_create_get,
    constant_create_post,
    constant_delete_get,
    constant_delete,
    constant_edit_get,
    constant_edit
}
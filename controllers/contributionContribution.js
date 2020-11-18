const Contribution = require('../models/contribution');

//app.get('*', checkUser); //put user values in res.locals
const contribution_index = (req, res) => {
    Contribution.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('contributions/index', { title: 'All contributions', contributions: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const contribution_details = (req, res) => {
    const id = req.params.id;
    Contribution.findById(id)
     .then((result) => {
      res.render("contributions/details", { contribution: result, title: 'contribution Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'contribution not found'});
    });
}

const contribution_create_get = (req, res) => {
    
    res.render('contributions/create', {title: 'Create a New contribution'});
}

const contribution_create_post = (req, res) => {
  const contribution = new Contribution(req.body);
  contribution.enteredBy = global.userId;
  contribution.status = "Active";
  contribution.save()
  .then((result) => {
    res.redirect("/contributions");
  })
  .catch((err) => {
    console.log(err);
  });
}

const contribution_delete = (req, res) => {
 const id = req.params.id;
 Contribution.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/contributions");
  })
  .catch((err) => {
    console.log(err);
  });
}
const contribution_delete_get = async (req, res) => {
  const id = req.params.id;
  await Contribution.findById(id)
    .then(result => {
      res.render('contributions/delete', {contribution: result, title: 'Delete contribution'});
    })
    .catch(err => console.log(err));
}

const contribution_edit_get = async (req, res) => {
  const id = req.params.id;
  await Contribution.findById(id)
    .then(result => {
      res.render('contributions/edit', {contribution: result, title: 'Edit contribution'});
    })
    .catch(err => console.log(err));
}

const contribution_edit = async (req, res) => {
const id = req.params.id;
const contribution = new Contribution(req.body);
console.log(contribution);
await contribution.findById(id)
.then(result => {
  result.category = contribution.category;
  result.name = contribution.name;
  result.value1 = contribution.value1;
  result.value2 = contribution.value2;
  result.value3 = contribution.value3;
  result.sort = contribution.sort;
  result.status = contribution.status;
  result.enteredBy = contribution.enteredBy;
  result.save();
  res.redirect('/contributions');
})
.catch(err => console.log(err));
  
}

module.exports = {
    contribution_index,
    contribution_details,
    contribution_create_get,
    contribution_create_post,
    contribution_delete_get,
    contribution_delete,
    contribution_edit_get,
    contribution_edit
}
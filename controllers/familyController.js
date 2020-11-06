const Family = require('../models/family');

const family_index = (req, res) => {
    Family.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('families/index', { title: 'All families', families: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const family_details = (req, res) => {
    const id = req.params.id;
    Family.findById(id)
     .then((result) => {
      res.render("families/details", { family: result, title: 'family Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'family not found'});
    });
}

const family_create_get = (req, res) => {
    res.render('families/create', {title: 'Create a New family'});
}

const family_create_post = (req, res) => {
  const family = new Family(req.body);
  
  family.save()
  .then((result) => {
    res.redirect("/families");
  })
  .catch((err) => {
    console.log(err);
  });
}

const family_delete = (req, res) => {
 const id = req.params.id;
 Family.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/families");
  })
  .catch((err) => {
    console.log(err);
  });
}
const family_delete_get = (req, res) => {
  const id = req.params.id;
  Family.findById(id)
    .then(result => {
      res.render('families/delete', {family: result, title: 'Delete family'});
    })
    .catch(err => console.log(err));
}

const family_edit_get = (req, res) => {
  const id = req.params.id;
  Family.findById(id)
    .then(result => {
      res.render('families/edit', {family: result, title: 'Edit family'});
    })
    .catch(err => console.log(err));
}

const family_edit = async (req, res) => {
const id = req.params.id;
const family = new Family(req.body);
Family.findById(id)
.then(result => {
  result.familyName = family.firstName;
  result.address1 = family.address1;
  result.address2 = family.address2;
  result.city = family.city;
  result.state = family.state;
  result.zip = family.zip;
  result.country = family.country;
  result.save();
  res.redirect('/families');
})
.catch(err => console.log(err));
  
}

module.exports = {
    family_index,
    family_details,
    family_create_get,
    family_create_post,
    family_delete_get,
    family_delete,
    family_edit_get,
    family_edit
}
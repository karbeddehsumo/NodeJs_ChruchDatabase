const Visitor = require('../models/visitor');
const Church = require('../models/church');
const Constant = require('../models/constant');

const visitor_index = async (req, res) => {
    const churchId = req.params.id;
    await Visitor.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('visitors/index', { title: 'All visitor', visitors: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const visitor_details = async (req, res) => {
    const id = req.params.id;
    await Visitor.findById(id)
     .then((result) => {
      res.render("visitor/details", { visitor: result, title: 'visitor Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'visitor not found'});
    });
}

const visitor_create_get = async (req, res) => {
  const churchId = req.params.id;
  const visitorTitles = await Constant.find({church: churchId, category: 'Visitor Title'},'_id category name value1').sort({ sort: -1 });
  res.render('visitors/create', {title: 'Create a New visitor', churchId, visitorTitles});
}

const visitor_create_post = (req, res) => {
  console.log('visitor data');
  console.log(req.body)
  const visitor = new Visitor(req.body);
  visitor.church = req.body.churchId;
  visitor.enteredBy = global.userId;
  visitor.save()
  .then((result) => {
    res.redirect("/visitors/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const visitor_delete = async (req, res) => {
 const id = req.params.id;
  await Visitor.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/visitor");
  })
  .catch((err) => {
    console.log(err);
  });
}

const visitor_delete_get = async (req, res) => {
  const id = req.params.id;
    await Visitor.findById(id)
    .then(result => {
      res.render('visitor/delete', {visitor: result, title: 'Delete visitor'});
    })
    .catch(err => console.log(err));
}

const visitor_edit_get = async (req, res) => {
  const id = req.params.id;
    await Visitor.findById(id)
    .then(result => {
      res.render('visitor/edit', {visitor: result, title: 'Edit visitor'});
    })
    .catch(err => console.log(err));
}

const visitor_edit = async (req, res) => {
const id = req.params.id;
const visitor = new Visitor(req.body);
await Visitor.findById(id)
.then(result => {
  result.church = visitor.church;
  result.lastName = visitor.lastName;
  result.firstName = visitor.firstName;
  result.title = visitor.title;

  result.address1 = visitor.address1;
  result.address2 = visitor.address2;
  result.city = visitor.city;
  result.state = visitor.state;
  result.zip = visitor.zip;
  result.phone = visitor.phone;

  result.email = visitor.email;
  result.status = visitor.status;
  result.lastVisit = visitor.lastVisit;
  result.offering = visitor.offering;

  result.enteredBy = visitor.enteredBy;
  result.save();
  res.redirect('/visitor');
})
.catch(err => console.log(err));
  
}

module.exports = {
    visitor_index,
    visitor_details,
    visitor_create_get,
    visitor_create_post,
    visitor_delete_get,
    visitor_delete,
    visitor_edit_get,
    visitor_edit
}
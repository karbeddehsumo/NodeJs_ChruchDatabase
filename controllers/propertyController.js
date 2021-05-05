const Property = require('../models/property');
const Church = require('../models/church');
const Constant = require('../models/constant');

const property_index = async (req, res) => {
    const churchId = req.params.id;
    await Property.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('properties/index', { title: 'All property', properties: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const property_details = async (req, res) => {
    const id = req.params.id;
    await Property.findById(id)
     .then((result) => {
      res.render("properties/details", { property: result, title: 'property Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'property not found'});
    });
}

const property_create_get = async (req, res) => {
  const churchId = req.params.id;
  const conditions = await Constant.find({church: churchId, category: 'Property Condition'},'_id category name value1').sort({ sort: -1 });
    res.render('properties/create', {title: 'Create a New property', churchId, conditions});
}

const property_create_post = (req, res) => {
  const property = new Property(req.body);
  property.church = req.body.churchId;
  property.enteredBy = global.userId;
  property.save()
  .then((result) => {
    res.redirect("/properties/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const property_delete = async (req, res) => {
 const id = req.params.id;
  await Property.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/properties");
  })
  .catch((err) => {
    console.log(err);
  });
}

const property_delete_get = async (req, res) => {
  const id = req.params.id;
    await Property.findById(id)
    .then(result => {
      res.render('properties/delete', {property: result, title: 'Delete property'});
    })
    .catch(err => console.log(err));
}

const property_edit_get = async (req, res) => {
  const id = req.params.id;
    await Property.findById(id)
    .then(result => {
      res.render('properties/edit', {property: result, title: 'Edit property'});
    })
    .catch(err => console.log(err));
}

const property_edit = async (req, res) => {
const id = req.params.id;
const property = new Property(req.body);
await Property.findById(id)
.then(result => {
  result.church = property.church;
  result.title = property.title;
  result.purchasedDate = property.purchasedDate;
  result.value = property.value;

  result.quantity = property.quantity;
  result.localtion = property.location;
  result.assignedTo = property.assignedTo;
  result.condition = property.condition;

  result.tagNumber = property.tagNumber;
  result.description = property.description;
  result.comment = property.comment;
  result.lastInventory = property.lastInventory;

  result.enteredBy = global.userId;
  result.save();
  res.redirect('/property');
})
.catch(err => console.log(err));
  
}

module.exports = {
    property_index,
    property_details,
    property_create_get,
    property_create_post,
    property_delete_get,
    property_delete,
    property_edit_get,
    property_edit
}
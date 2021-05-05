
const Table = require('../models/table');
const Church = require('../models/church');

const table_index = async (req, res) => {
    const churchId = req.params.id;
    await Table.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('tables/index', { title: 'All table', tables: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const table_details = async (req, res) => {
    const id = req.params.id;
    await Table.findById(id)
     .then((result) => {
      res.render("table/details", { table: result, title: 'table Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'table not found'});
    });
}

const table_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('tables/create', {title: 'Create a New table', churchId});
}

const table_create_post = (req, res) => {
  const table = new Table(req.body);
  table.church = req.body.churchId;
  table.enteredBy = global.userId;
  table.save()
  .then((result) => {
    res.redirect("/tables/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const table_delete = async (req, res) => {
 const id = req.params.id;
  await Table.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/table");
  })
  .catch((err) => {
    console.log(err);
  });
}

const table_delete_get = async (req, res) => {
  const id = req.params.id;
    await Table.findById(id)
    .then(result => {
      res.render('table/delete', {table: result, title: 'Delete table'});
    })
    .catch(err => console.log(err));
}

const table_edit_get = async (req, res) => {
  const id = req.params.id;
    await Table.findById(id)
    .then(result => {
      res.render('table/edit', {table: result, title: 'Edit table'});
    })
    .catch(err => console.log(err));
}

const table_edit = async (req, res) => {
const id = req.params.id;
const table = new Table(req.body);
await Table.findById(id)
.then(result => {
  result.church = table.church;
  result.ministry = table.ministry;
  result.title = table.title;
  result.field1 = table.field1;
  result.field2 = table.field2;
  result.field3 = table.field3;
  result.field4 = table.field4;
  result.field5 = table.field5;
  result.field6 = table.field6;
  result.field7 = table.field7;
  result.field8 = table.field8;
  result.field9 = table.field9;
  result.field10 = table.field10;
  result.enteredBy = global.userId;
  result.save();
  res.redirect('/table');
})
.catch(err => console.log(err));
  
}

module.exports = {
    table_index,
    table_details,
    table_create_get,
    table_create_post,
    table_delete_get,
    table_delete,
    table_edit_get,
    table_edit
}
const TableData = require('../models/tableData');
const Church = require('../models/church');

const tableData_index = async (req, res) => {
    const churchId = req.params.id;
    await TableData.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('tableDatas/index', { title: 'All tableData', tableDatas: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const tableData_details = async (req, res) => {
    const id = req.params.id;
    await TableData.findById(id)
     .then((result) => {
      res.render("tableData/details", { tableData: result, title: 'tableData Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'tableData not found'});
    });
}

const tableData_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('tableDatas/create', {title: 'Create a New tableData', churchId});
}

const tableData_create_post = (req, res) => {
  const tableData = new TableData(req.body);
  tableData.church = req.body.churchId;
  tableData.enteredBy = global.userId;
  tableData.save()
  .then((result) => {
    res.redirect("/tableDatas/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const tableData_delete = async (req, res) => {
 const id = req.params.id;
  await TableData.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/tableData");
  })
  .catch((err) => {
    console.log(err);
  });
}

const tableData_delete_get = async (req, res) => {
  const id = req.params.id;
    await TableData.findById(id)
    .then(result => {
      res.render('tableData/delete', {tableData: result, title: 'Delete tableData'});
    })
    .catch(err => console.log(err));
}

const tableData_edit_get = async (req, res) => {
  const id = req.params.id;
    await TableData.findById(id)
    .then(result => {
      res.render('tableData/edit', {tableData: result, title: 'Edit tableData'});
    })
    .catch(err => console.log(err));
}

const tableData_edit = async (req, res) => {
const id = req.params.id;
const tableData = new TableData(req.body);
await TableData.findById(id)
.then(result => {
  result.table = tableData.table;
  result.row.data1 = tableData.row.data1;
  result.row.data2 = tableData.row.data2;
  result.row.data3 = tableData.row.data3;
  result.row.data4 = tableData.row.data4;
  result.row.data5 = tableData.row.data5;
  result.row.data6 = tableData.row.data6;
  result.row.data7 = tableData.row.data7;
  result.row.data8 = tableData.rowle.data8;
  result.row.data9 = tableData.row.data9;
  result.row.data10 = tableData.row.data10;
  result.save();
  res.redirect('/tableData');
})
.catch(err => console.log(err));
  
}

module.exports = {
    tableData_index,
    tableData_details,
    tableData_create_get,
    tableData_create_post,
    tableData_delete_get,
    tableData_delete,
    tableData_edit_get,
    tableData_edit
}
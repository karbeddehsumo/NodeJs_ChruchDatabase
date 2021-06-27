
//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const tableDataDb = require('../db/tableDataDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const tableData_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM tableData WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('tableDatas/index', { title: 'All tableDatas', tableDatas: result, churchId: churchId })
        }
    });
    });
}

const tableData_details = (req, res) => {
    const tableDataId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM tableData WHERE tableDataId = ?', [tableDataId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("tableDatas/details", { tableData: result[0], title: 'tableData Details'})
        }
    });
    });
}

const tableData_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('tableDatas/create', {title: 'Create a New tableData', churchId});
}

const tableData_create_post = async (req, res) => {
  const tableDataId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO tableData SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.category,
      req.body.name,
      req.body.value1,
      req.body.value2,
      req.body.value3,
      req.body.sort,
      req.body.status,
      global.userId,
      new Date()
    ],
    (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.redirect("tableDatas/church/" + req.body.churchId);
      }
  });
  });
}

const tableData_delete = async (req, res) => {
 const tableDataId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM tableData WHERE tableDataId = ?', [tableDataId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/tableDatas/church/" + global.churchId);
    }
});
});
}


const tableData_delete_get = async (req, res) => {
  const tableDataId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM tableData WHERE tableDataId = ?', [tableDataId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("tableDatas/delete", { tableData: result[0], title: 'Delete tableData'})
      }
  });
});
}

const tableData_edit_get = async (req, res) => {
  const tableDataId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      if(err) throw err;
     connection.query('SELECT name FROM tableData WHERE category = ? ',['Status'], (err, status) => {
          _status = status;
      });
      connection.query('SELECT * FROM tableData WHERE tableDataId = ?', [tableDataId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("tableDatas/edit", { tableData: result[0], title: 'Edit tableData', status: _status})
        }
    });
    });
  }

const tableData_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const tableDataId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE tableData SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE tableDataID = ?',
  [
    req.body.churchId,
    req.body.category,
    req.body.name,
    req.body.value1,
    req.body.value2,
    req.body.value3,
    req.body.sort,
    req.body.status,
    global.userId,
    Date.now(),
    tableDataId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/tableDatas/church/" + req.body.churchId);
    }
});
});
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


// const TableData = require('../models/tableData');
// const Church = require('../models/church');

// const tableData_index = async (req, res) => {
//     const churchId = req.params.id;
//     await TableData.find({ Church: churchId }).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('tableDatas/index', { title: 'All tableData', tableDatas: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const tableData_details = async (req, res) => {
//     const id = req.params.id;
//     await TableData.findById(id)
//      .then((result) => {
//       res.render("tableData/details", { tableData: result, title: 'tableData Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'tableData not found'});
//     });
// }

// const tableData_create_get = (req, res) => {
//   const churchId = req.params.id;
//     res.render('tableDatas/create', {title: 'Create a New tableData', churchId});
// }

// const tableData_create_post = (req, res) => {
//   const tableData = new TableData(req.body);
//   tableData.church = req.body.churchId;
//   tableData.enteredBy = global.userId;
//   tableData.save()
//   .then((result) => {
//     res.redirect("/tableDatas/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const tableData_delete = async (req, res) => {
//  const id = req.params.id;
//   await TableData.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/tableData");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const tableData_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await TableData.findById(id)
//     .then(result => {
//       res.render('tableData/delete', {tableData: result, title: 'Delete tableData'});
//     })
//     .catch(err => console.log(err));
// }

// const tableData_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await TableData.findById(id)
//     .then(result => {
//       res.render('tableData/edit', {tableData: result, title: 'Edit tableData'});
//     })
//     .catch(err => console.log(err));
// }

// const tableData_edit = async (req, res) => {
// const id = req.params.id;
// const tableData = new TableData(req.body);
// await TableData.findById(id)
// .then(result => {
//   result.table = tableData.table;
//   result.row.data1 = tableData.row.data1;
//   result.row.data2 = tableData.row.data2;
//   result.row.data3 = tableData.row.data3;
//   result.row.data4 = tableData.row.data4;
//   result.row.data5 = tableData.row.data5;
//   result.row.data6 = tableData.row.data6;
//   result.row.data7 = tableData.row.data7;
//   result.row.data8 = tableData.rowle.data8;
//   result.row.data9 = tableData.row.data9;
//   result.row.data10 = tableData.row.data10;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/tableData');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     tableData_index,
//     tableData_details,
//     tableData_create_get,
//     tableData_create_post,
//     tableData_delete_get,
//     tableData_delete,
//     tableData_edit_get,
//     tableData_edit
// }
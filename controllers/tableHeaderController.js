//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const tableHeaderDb = require('../db/tableHeaderDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const tableHeader_index = async (req, res) => {
  const ministryId = req.params.id;
  const churchId = global.churchId;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM tableHeader WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('tableHeaders/index', { title: 'All tableHeaders', tableHeaders: result, churchId, ministryId })
        }
    });
    });
}

const tableHeader_details = (req, res) => {
    const tableHeaderId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM tableHeader WHERE tableHeaderId = ?', [tableHeaderId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("tableHeaders/details", { tableHeader: result[0], title: 'tableHeader Details'})
        }
    });
    });
}

const tableHeader_create_get_ministry = (req, res) => {
    const ministryId = req.params.id;
    const churchId = global.churchId;
    res.render('tableHeaders/createForMinistry', {title: 'Create a New tableHeader', churchId, ministryId});

}
const tableHeader_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
        if(err) throw err; 
        connection.query('SELECT * FROM ministry WHERE churchId = ? AND status = ?',[global.churchId, 'Active'], (err, ministries) => {
          connection.release();
          if(err){
            console.log('we have mysql error');
          }
          else
          {
            res.render('tableHeaders/create', {title: 'Create a New tableHeader', churchId, ministries});
          }
      });
      });
    
}

const tableHeader_create_post = async (req, res) => {
  const tableHeaderId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO tableHeader SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ?',
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
        res.redirect("tableHeaders/church/" + req.body.churchId);
      }
  });
  });
}

const tableHeader_delete = async (req, res) => {
 const tableHeaderId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM tableHeader WHERE tableHeaderId = ?', [tableHeaderId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/tableHeaders/church/" + global.churchId);
    }
});
});
}


const tableHeader_delete_get = async (req, res) => {
  const tableHeaderId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM tableHeader WHERE tableHeaderId = ?', [tableHeaderId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("tableHeaders/delete", { tableHeader: result[0], title: 'Delete tableHeader'})
      }
  });
});
}

const tableHeader_edit_get = async (req, res) => {
  const tableHeaderId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      if(err) throw err;
     connection.query('SELECT name FROM tableHeader WHERE category = ? ',['Status'], (err, status) => {
          _status = status;
      });
      connection.query('SELECT * FROM tableHeader WHERE tableHeaderId = ?', [tableHeaderId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("tableHeaders/edit", { tableHeader: result[0], title: 'Edit tableHeader', status: _status})
        }
    });
    });
  }

const tableHeader_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const tableHeaderId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE tableHeader SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE tableHeaderID = ?',
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
    tableHeaderId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/tableHeaders/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    tableHeader_index,
    tableHeader_details,
    tableHeader_create_get_ministry,
    tableHeader_create_get,
    tableHeader_create_post,
    tableHeader_delete_get,
    tableHeader_delete,
    tableHeader_edit_get,
    tableHeader_edit
}
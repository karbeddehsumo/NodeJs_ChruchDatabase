//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const constant_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM constant WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('constants/index', { title: 'All constants', constants: result, churchId: churchId })
        }
    });
    });
}

const constant_details = (req, res) => {
    const constantId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM constant WHERE constantId = ?', [constantId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("constants/details", { constant: result[0], title: 'constant Details'})
        }
    });
    });
}

const constant_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('constants/create', {title: 'Create a New constant', churchId});
}

const constant_create_post = async (req, res) => {
  const constantId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO constant SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ?',
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
        res.redirect("constants/church/" + req.body.churchId);
      }
  });
  });
}

const constant_delete = async (req, res) => {
 const constantId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM constant WHERE constantId = ?', [constantId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/constants/church/" + global.churchId);
    }
});
});
}


const constant_delete_get = async (req, res) => {
  const constantId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM constant WHERE constantId = ?', [constantId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("constants/delete", { constant: result[0], title: 'Delete Constant'})
      }
  });
});
}

const constant_edit_get = async (req, res) => {
  const constantId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      if(err) throw err;
     connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
          _status = status;
      });
      connection.query('SELECT * FROM constant WHERE constantId = ?', [constantId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("constants/edit", { constant: result[0], title: 'Edit Constant', status: _status})
        }
    });
    });
  }

const constant_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const constantId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE constant SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE constantID = ?',
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
    constantId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/constants/church/" + req.body.churchId);
    }
});
});
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
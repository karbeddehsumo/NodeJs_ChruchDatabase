// 

const moment = require('moment');
const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const bank_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM bank WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('banks/index', { title: 'All banks', banks: result, churchId: churchId })
        }
    });
    });
}

const bank_details = (req, res) => {
    const bankId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM bank WHERE bankId = ?', [bankId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("banks/details", { bank: result[0], title: 'bank Details', moment})
        }
    });
    });
}

const bank_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render("banks/create", {title: 'Add New Bank Account', churchId});
}

const bank_create_post = async (req, res) => {
  const bankId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO bank SET churchId = ?, accountName = ?, accountNumber = ?, shortAccountName = ?, description = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.accountName,
      req.body.accountNumber,
      req.body.shortAccountName,
      req.body.description,
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
        res.redirect("banks/church/" + req.body.churchId);
      }
  });
  });
}

const bank_delete = async (req, res) => {
 const bankId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM bank WHERE bankId = ?', [bankId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/banks/church/" + global.churchId);
    }
});
});
}


const bank_delete_get = async (req, res) => {
  const bankId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM bank WHERE bankId = ?', [bankId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("banks/delete", { bank: result[0], title: 'Delete bank'})
      }
  });
});
}

const bank_edit_get = async (req, res) => {
  const bankId = req.params.id;
    pool.getConnection((err, connection) => {
     connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
      connection.query('SELECT * FROM bank WHERE bankId = ?', [bankId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("banks/edit", { bank: result[0], title: 'Edit bank', status, moment})
        }
    });
    });
  });
  }

const bank_edit = async (req, res) => {
 const bankId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE bank SET  accountName = ?, accountNumber = ?, shortAccountName = ?, description = ?, isBudgeted = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE bankID = ?',
  [
    req.body.accountName,
    req.body.accountNumber,
    req.body.shortAccountName,
    req.body.description,
    req.body.isBudgeted,
    req.body.status,
    global.userId,
    new Date(),
    bankId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/banks/church/" + global.churchId);
    }
});
});
}
module.exports = {
    bank_index,
    bank_details,
    bank_create_get,
    bank_create_post,
    bank_delete_get,
    bank_delete,
    bank_edit_get,
    bank_edit
}
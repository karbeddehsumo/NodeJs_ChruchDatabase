
const moment = require('moment');
const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const fundDb = require('../db/fundDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const fund_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM fund WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('funds/index', { title: 'All funds', funds: result, churchId: churchId })
        }
    });
    });
}

const fund_details = (req, res) => {
    const fundId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM fund WHERE fundId = ?', [fundId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("funds/details", { fund: result[0], title: 'fund Details'})
        }
    });
    });
}

const fund_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      let _fundTypes;
      if(err) throw err;
     connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Fund Type'], (err, fundTypes) => {
          _fundTypes = fundTypes;
      });
      connection.query('SELECT accountName, bankId FROM bank WHERE churchId = ? ',[churchId], (err, banks) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("funds/create", { title: 'Add New fund', banks, fundTypes: _fundTypes, churchId})
        }
    });
   });
}

const fund_create_post = async (req, res) => {
  const churchId = req.body.churchId;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO fund SET churchId = ?, name = ?, typeId = ?, bankId = ?, description = ?, isBudgeted = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.name,
      req.body.typeId,
      req.body.bankId,
      req.body.description,
      req.body.isBudgeted,
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
        res.redirect("funds/church/" + churchId);
      }
  });
  });
}

const fund_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const fundId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM fund WHERE fundId = ?', [fundId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/funds/church/" + global.churchId);
    }
});
});
}


const fund_delete_get = async (req, res) => {
  const fundId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM fund WHERE fundId = ?', [fundId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("funds/delete", { fund: result[0], title: 'Delete fund'})
      }
  });
});
}

const fund_edit_get = async (req, res) => {
  const fundId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      let _fundTypes;
      let _banks;
      if(err) throw err;
     connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
          _status = status;
      });
      connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Fund Type'], (err, fundTypes) => {
        _fundTypes = fundTypes;
      });
      connection.query('SELECT accountName, bankId FROM bank WHERE churchId = ? ',[global.churchId], (err, banks) => {
          _banks = banks;
      });
      connection.query('SELECT * FROM fund WHERE fundId = ?', [fundId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("funds/edit", { fund: result[0], title: 'Edit fund', status: _status, fundTypes: _fundTypes, banks: _banks, moment})
        }
    });
    });
  }

const fund_edit = async (req, res) => {
  const churchId = req.body.churchId;
 const fundId = req.params.id;
 console.log('inside fund edit');
 console.log(req.body);
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE fund SET name = ?, typeId = ?, bankId = ?, description = ?, isBudgeted = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE fundID = ?',
  [
    req.body.name,
    req.body.typeId,
    req.body.bankId,
    req.body.description,
    req.body.isBudgeted,
    req.body.status,
    global.userId,
    new Date(),
    fundId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/funds/church/" + global.churchId);
    }
});
});
}

module.exports = {
    fund_index,
    fund_details,
    fund_create_get,
    fund_create_post,
    fund_delete_get,
    fund_delete,
    fund_edit_get,
    fund_edit
}







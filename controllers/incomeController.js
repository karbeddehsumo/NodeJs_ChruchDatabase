//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const incomeDb = require('../db/incomeDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const income_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT i.incomeId, i.cashAmount + i.checkAmount + i.coinAmount as total, f.name as fundType, i.incomeDate, i.cashAmount, i.checkAmount, i.coinAmount, i.comment FROM income as i LEFT JOIN fund as f ON i.fundId = f.fundId LEFT JOIN bank as b ON f.bankId = b.bankId LEFT JOIN constant as c ON f.typeID = c.constantId  WHERE i.churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('incomes/index', { title: 'All incomes', incomes: result, churchId: churchId })
        }
    });
    });
}

const income_details = (req, res) => {
    const incomeId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM income WHERE incomeId = ?', [incomeId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("incomes/details", { income: result[0], title: 'income Details'})
        }
    });
    });
}

const income_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Income', 'Income & Expense', 'Active'], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render('incomes/create', {funds: result, title: 'Create a New income', churchId});
        }
    });
    });
    
}

const income_create_post = async (req, res) => {
  const incomeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO income SET churchId = ?, fundId = ?, incomeDate = ?, cashAmount = ?, checkAmount = ?, coinAmount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.fundId,
      req.body.incomeDate,
      req.body.cashAmount,
      req.body.checkAmount,
      req.body.coinAmount,
      req.body.comment,
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
        res.redirect("incomes/church/" + req.body.churchId);
      }
  });
  });
}

const income_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const incomeId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM income WHERE incomeId = ?', [incomeId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/incomes/church/" + global.churchId);
    }
});
});
}


const income_delete_get = async (req, res) => {
  const incomeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM income WHERE incomeId = ?', [incomeId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("incomes/delete", { income: result[0], title: 'Delete income'})
      }
  });
});
}

const income_edit_get = async (req, res) => {
  const incomeId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
        connection.query('SELECT f.name, f.fundId FROM fund As f INNER JOIN constant As c ON f.typeId = c.constantId WHERE f.churchId = ? AND c.name in (?, ?)  ',[global.churchId, 'Income', 'Income & Expense'], (err, funds) => {
      connection.query('SELECT sum(cashAmount + checkAmount + coinAmount) as total, incomeId, fundId, churchId, incomeDate, cashAmount, checkAmount, coinAmount, comment, status, enteredBy, dateEntered FROM income WHERE incomeId = ?', [incomeId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("incomes/edit", { income: result[0], title: 'Edit income', funds})
        }
    });
    });
  });
  }

const income_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const incomeId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE income SET fundId = ?, incomeDate = ?, cashAmount = ?, checkAmount = ?, coinAmount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE incomeID = ?',
  [
    req.body.fundId,
    req.body.incomeDate,
    req.body.cashAmount,
    req.body.checkAmount,
    req.body.coinAmount,
    req.body.comment,
    req.body.status,
    global.userId,
    new Date(),
    incomeId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/incomes/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    income_index,
    income_details,
    income_create_get,
    income_create_post,
    income_delete_get,
    income_delete,
    income_edit_get,
    income_edit
}


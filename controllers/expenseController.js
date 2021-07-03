//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const expenseDb = require('../db/expenseDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const expense_index = async (req, res) => {
  const churchId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const result = await expenseDb.getAll(connection, churchId);
    //const balances = await connection.query('SELECT l.endBalance, l.endRevenue, l.bankBalanceId, b.accountName FROM bankBalance As l INNER JOIN bank As b ON b.bankId = l.bankId WHERE churchId = ?',[churchId]);
    res.render('expenses/index', { title: 'All expenses', expenses: result, churchId });

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

  //   pool.getConnection((err, connection) => {
  //     if(err) throw err; 
  //     connection.query('SELECT l.endBalance, l.endRevenue, l.bankBalanceId, b.accountName FROM bankBalance As l INNER JOIN bank As b ON b.bankId = l.bankId WHERE churchId = ?',[churchId], (err, bankBalances) => {
  //     connection.query('SELECT * FROM expense WHERE churchId = ?',[churchId], (err, result) => {
  //       connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //       }
  //       else
  //       {
  //           res.render('expenses/index', { title: 'All expenses', expenses: result, churchId: churchId, bankBalances })
  //       }
  //   });
  //   });
  // });
}

const expense_details = async (req, res) => {
    const expenseId = req.params.id;
    const connection = await pool.getConnection();
  try {
    const result = await expenseDb.getById(connection, expenseId);
      res.render("expenses/details", { expense: result, title: 'expense Details'});

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM expense WHERE expenseId = ?', [expenseId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("expenses/details", { expense: result[0], title: 'expense Details'})
    //     }
    // });
    // });
}

const expense_create_get = async (req, res) => {
    const churchId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const result = await connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active']);
      res.render('expenses/create', {funds: result[0], title: 'Create a New expense', churchId});
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active'], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render('expenses/create', {funds: result, title: 'Create a New expense', churchId});
    //     }
    // });
    // });
}

const expense_create_post = async (req, res) => {
  const expenseId = req.params.id;
  console.log('expense data');
  console.log(req.body);
  const connection = await pool.getConnection();
  try {
    const bills = await expenseDb._insert(connection, 
      req.body.churchId,
      req.body.fundId,
      req.body.amount,
      req.body.checkNumber,
      req.body.expenseDate,
      req.body.payee,
      req.body.comment,
      req.body.status,
      global.userId,
      new Date()
      );
      res.redirect("expenses/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO expense SET churchId = ?, fundId = ?, amount = ?, checkNumber = ?, expenseDate = ?, payee = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.fundId,
  //     req.body.amount,
  //     req.body.checkNumber,
  //     req.body.expenseDate,
  //     req.body.payee,
  //     req.body.comment,
  //     req.body.status,
  //     global.userId,
  //     new Date()
  //   ],
  //   (err, result) => {
  //     connection.release();
  //     if(err){
  //       console.log('we have mysql error');
  //       console.log(err);
  //     }
  //     else
  //     {
  //       res.redirect("expenses/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const expense_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const expenseId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM expense WHERE expenseId = ?', [expenseId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/expenses/church/" + global.churchId);
    }
});
});
}


const expense_delete_get = async (req, res) => {
  const expenseId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM expense WHERE expenseId = ?', [expenseId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("expenses/delete", { expense: result[0], title: 'Delete expense'})
      }
  });
});
}

const expense_edit_get = async (req, res) => {
  const expenseId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const result = await expenseDb.getById(connection, expenseId);
    const status = await constantDb.get(connection,'Status','Active');
    const fundList = await connection.query('SELECT f.name, f.fundId FROM fund As f INNER JOIN constant As c ON f.typeId = c.constantId WHERE f.churchId = ? AND c.name in (?, ?)  ',[global.churchId, 'Expense', 'Income & Expense']);
    res.render("expenses/edit", { expense: result, title: 'Edit expense', funds: fundList[0], status});

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

  //   pool.getConnection((err, connection) => {
  //     if(err) throw err;
  //     connection.query('SELECT f.name, f.fundId FROM fund As f INNER JOIN constant As c ON f.typeId = c.constantId WHERE f.churchId = ? AND c.name in (?, ?)  ',[global.churchId, 'Expense', 'Income & Expense'], (err, funds) => {
  //     connection.query('SELECT * FROM expense WHERE expenseId = ?', [expenseId], (err, result) => {
  //       connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //         console.log(err);
  //       }
  //       else
  //       {
  //         res.render("expenses/edit", { expense: result[0], title: 'Edit expense', funds})
  //       }
  //   });
  // });
  //   });
  }

const expense_edit = async (req, res) => {
 const expenseId = req.params.id;
 const connection = await pool.getConnection();
 try {
   const expense = await expenseDb._update(connection, 
     req.body.fundId,
     req.body.amount,
     req.body.checkNumber,
     req.body.expenseDate,
     req.body.payee,
     req.body.comment,
     req.body.status,
     global.userId,
     new Date(),
     expenseId
     );
     res.redirect("/expenses/church/" + req.body.churchId);
     
 } catch(err) {
  throw err;
 } finally {
   connection.release();
 }

// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE expense SET fundId = ?, amount = ?, checkNumber = ?, expenseDate = ?, payee = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE expenseID = ?',
//   [
//     req.body.fundId,
//     req.body.amount,
//     req.body.checkNumber,
//     req.body.expenseDate,
//     req.body.payee,
//     req.body.comment,
//     req.body.status,
//     global.userId,
//     new Date(),
//     expenseId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/expenses/church/" + req.body.churchId);
//     }
// });
// });
 }

module.exports = {
    expense_index,
    expense_details,
    expense_create_get,
    expense_create_post,
    expense_delete_get,
    expense_delete,
    expense_edit_get,
    expense_edit
}





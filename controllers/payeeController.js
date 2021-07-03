//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const payeeDb = require('../db/payeeDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const payee_index = async (req, res) => {
  const churchId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const result = await payeeDb.getAll(connection, global.churchId);
    res.render('payees/index', { title: 'All payees', payees: result, churchId });
  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT * FROM payee WHERE churchId = ?',[churchId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('payees/index', { title: 'All payees', payees: result, churchId: churchId })
    //     }
    // });
    // });
}

const payee_details = async (req, res) => {
    const payeeId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const result = await payeeDb.getById(connection, payeeId);
      res.render("payees/details", { payee: result, title: 'payee Details'});
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM payee WHERE churchId = ? AND payeeId = ?', [global.churchId, payeeId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("payees/details", { payee: result[0], title: 'payee Details'})
    //     }
    // });
    // });
}

const payee_create_get = async (req, res) => {
    const churchId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const frequencyList = await constantDb.get(connection,'Payee Frequency', 'Active');
      const payeeList = await constantDb.get(connection,'Payee Type', 'Active');
      const fundList = await connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[global.churchId, 'Expense', 'Income & Expense', 'Active']);
      res.render('payees/create', {title: 'Create a New payee', churchId, frequencies: frequencyList, types: payeeList, funds: fundList[0]});
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

//     pool.getConnection((err, connection) => {
//       if(err) throw err; 
//       connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Frequency', 'Active'], (err, frequencies) => {
//       connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Type', 'Active'], (err, types) => {
//       connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active'], (err, funds) => {
//         connection.release();
//         if(err){
//           console.log('we have mysql error');
//         }
//         else
//         {
//           res.render('payees/create', {title: 'Create a New payee', churchId, frequencies, types, funds});
//         }
//     });
//     });
//   });
// });
}

const payee_create_post = async (req, res) => {
  const payeeId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const payee = await payeeDb._insert(connection, 
      req.body.churchId,
      req.body.fundId,
      req.body.typeId,
      req.body.frequencyId,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.url,
      req.body.description,
      req.body.accountNumber,
      req.body.status,
      global.userId,
      new Date()
      );
      res.redirect("payees/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO payee SET churchId = ?, fundId = ?, typeId = ?, frequencyId = ?, name = ?, email = ?, phone = ?, url = ?, description = ?, accountNumber = ?, status = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.fundId,
  //     req.body.typeId,
  //     req.body.frequencyId,
  //     req.body.name,
  //     req.body.email,
  //     req.body.phone,
  //     req.body.url,
  //     req.body.description,
  //     req.body.accountNumber,
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
  //       res.redirect("payees/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const payee_delete = async (req, res) => {
 const payeeId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM payee WHERE payeeId = ?', [payeeId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/payees/church/" + global.churchId);
    }
});
});
}


const payee_delete_get = async (req, res) => {
  const payeeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM payee WHERE payeeId = ?', [payeeId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("payees/delete", { payee: result[0], title: 'Delete payee'})
      }
  });
});
}

const payee_edit_get = async (req, res) => {
  const payeeId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const statusList = await constantDb.get(connection,'Status','Active');
    const frequencyList = await constantDb.get(connection,'Payee Frequency', 'Active');
    const payeeTypes = await constantDb.get(connection,'Payee Type', 'Active');
    const fundList = await connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active']);
    const result = await payeeDb.getById(connection, payeeId);
    res.render("payees/edit", { payee: result, title: 'Edit Payee', funds: fundList[0], frequencies: frequencyList, types: payeeTypes, status: statusList});
  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
//     pool.getConnection((err, connection) => {
//       if(err) throw err;
//       connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Frequency', 'Active'], (err, frequencies) => {
//       connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Type', 'Active'], (err, types) => {
//       connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active'], (err, funds) => {  
//      connection.query('SELECT * FROM payee WHERE churchId = ? AND payeeId = ? ',[global.churchId, payeeId], (err, result) => {
//       connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {  
//       connection.release();
//         if(err){
//           console.log('we have mysql error');
//           console.log(err);
//         }
//         else
//         {
//           res.render("payees/edit", { payee: result[0], title: 'Edit payee', funds, frequencies, types, status});
//         }
//     });
//     });
//   });
// });
// });
// });
  }

const payee_edit = async (req, res) => {
 const payeeId = req.params.id;
 const connection = await pool.getConnection();
  try {
    const payee = await payeeDb._update(connection, 
      req.body.fundId,
      req.body.typeId,
      req.body.frequencyId,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.url,
      req.body.description,
      req.body.accountNumber,
      req.body.status,
      global.userId,
      new Date(),
      payeeId
      );
      res.redirect("/payees/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE payee SET fundId = ?, typeId = ?, frequencyId = ?, name = ?, email = ?, phone = ?, url = ?, description = ?, accountNumber = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE payeeID = ?',
//   [
//     req.body.fundId,
//     req.body.typeId,
//     req.body.frequencyId,
//     req.body.name,
//     req.body.email,
//     req.body.phone,
//     req.body.url,
//     req.body.description,
//     req.body.accountNumber,
//     req.body.status,
//     global.userId,
//     new Date(),
//     payeeId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/payees/church/" + req.body.churchId);
//     }
// });
// });
}

module.exports = {
    payee_index,
    payee_details,
    payee_create_get,
    payee_create_post,
    payee_delete_get,
    payee_delete,
    payee_edit_get,
    payee_edit
}


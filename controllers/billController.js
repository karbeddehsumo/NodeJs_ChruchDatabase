//app.get('*', checkUser); //put user values in res.locals
const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const billDb = require('../db/billDb');
const payeeDb = require('../db/payeeDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const bill_index = async (req, res) => {
  const churchId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const bills = await billDb.getAll(connection, global.churchId);
    res.render('bills/index', { title: 'All bills', bills, churchId });

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT * FROM bill WHERE churchId = ?',[churchId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('bills/index', { title: 'All bills', bills: result, churchId })
    //     }
    // });
    // });
}

const bill_details = async (req, res) => {
    const billId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const billing = await connection.query('SELECT * FROM bill AS b INNER JOIN payee AS p ON b.payeeId = p.payeeId WHERE billId = ?', [billId]);
      res.render("bills/details", { bill: billing[0][0], title: 'bill Details'})
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM bill AS b INNER JOIN payee AS p ON b.payeeId = p.payeeId WHERE billId = ?', [billId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("bills/details", { bill: result[0], title: 'bill Details'})
    //     }
    // });
    // });
}

const bill_create_get = async (req, res) => {
    const churchId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const payees = await payeeDb.getAll(connection, global.churchId);
      res.render('bills/create', {title: 'Create a New bill', churchId, payees});
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
    //  pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT * FROM payee WHERE churchId = ? AND status = ?',[churchId, 'Active'], (err, payees) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('bills/create', {title: 'Create a New bill', churchId, payees});
    //     }
    // });
    //  });
} 

const bill_create_post = async (req, res) => {
  const billId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const bills = await billDb._insert(connection, 
      req.body.churchId,
      req.body.payeeId,
      req.body.totalAmount,
      req.body.amountDue,
      req.body.dueDate,
      req.body.comment,
      req.body.status,
      global.userId,
      new Date()
      );
      res.redirect("bills/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO bill SET churchId = ?, payeeId = ?, totalAmount = ?, amountDue = ?, dueDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.payeeId,
  //     req.body.totalAmount,
  //     req.body.amountDue,
  //     req.body.dueDate,
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
  //       res.redirect("bills/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const bill_delete = async (req, res) => {
 const billId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM bill WHERE billId = ?', [billId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/bills/church/" + global.churchId);
    }
});
});
}


const bill_delete_get = async (req, res) => {
  const billId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM bill WHERE billId = ?', [billId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("bills/delete", { bill: result[0], title: 'Delete bill'})
      }
  });
});
}

const bill_edit_get = async (req, res) => {
  const billId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const status = await constantDb.get(connection, 'Status','Active');
    const payees = await payeeDb.getAll(connection, global.churchId);
    const bill = await billDb.getById(connection, billId);
    res.render("bills/edit", { bill, title: 'Edit bill', status, payees})

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //  connection.query('SELECT name FROM constant WHERE category = ?',['Status'], (err, status) => {
    //   connection.query('SELECT * FROM payee WHERE churchId = ? AND status = ?',[churchId, 'Active'], (err, payees) => {
    //   connection.query('SELECT * FROM bill WHERE churchId = ? AND billId = ?',[global.churchId, billId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("bills/edit", { bill: result[0], title: 'Edit bill', status, payees})
    //     }
    // });
    // });
    // });
    // });
  }

const bill_edit = async (req, res) => {
 const billId = req.params.id;
 const connection = await pool.getConnection();
  try {
    const bills = await billDb._update(connection, 
      req.body.payeeId,
      req.body.totalAmount,
      req.body.amountDue,
      req.body.dueDate,
      req.body.comment,
      req.body.status,
      global.userId,
      new Date(),
      billId
      );
      res.redirect("/bills/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE bill SET payeeId = ?, totalAmount = ?, amountDue = ?, dueDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE billID = ?',
//   [
//     req.body.payeeId,
//     req.body.totalAmount,
//     req.body.amountDue,
//     req.body.dueDate,
//     req.body.comment,
//     req.body.status,
//     global.userId,
//     new Date(),
//     billId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/bills/church/" + req.body.churchId);
//     }
// });
// });
}

module.exports = {
    bill_index,
    bill_details,
    bill_create_get,
    bill_create_post,
    bill_delete_get,
    bill_delete,
    bill_edit_get,
    bill_edit
}
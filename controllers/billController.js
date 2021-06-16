//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const bill_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM bill WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('bills/index', { title: 'All bills', bills: result, churchId })
        }
    });
    });
}

const bill_details = (req, res) => {
    const billId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM bill AS b INNER JOIN payee AS p ON b.payeeId = p.payeeId WHERE billId = ?', [billId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("bills/details", { bill: result[0], title: 'bill Details'})
        }
    });
    });
}

const bill_create_get = (req, res) => {
    const churchId = req.params.id;
     pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM payee WHERE churchId = ? AND status = ?',[churchId, 'Active'], (err, payees) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('bills/create', {title: 'Create a New bill', churchId, payees});
        }
    });
     });
} 

const bill_create_post = async (req, res) => {
  const billId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO bill SET churchId = ?, payeeId = ?, totalAmount = ?, amountDue = ?, dueDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.payeeId,
      req.body.totalAmount,
      req.body.amountDue,
      req.body.dueDate,
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
        res.redirect("bills/church/" + req.body.churchId);
      }
  });
  });
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
    pool.getConnection((err, connection) => {
      if(err) throw err;
     connection.query('SELECT name FROM constant WHERE category = ?',['Status'], (err, status) => {
      connection.query('SELECT * FROM payee WHERE churchId = ? AND status = ?',[churchId, 'Active'], (err, payees) => {
      connection.query('SELECT * FROM bill WHERE churchId = ? AND billId = ?',[global.churchId, billId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("bills/edit", { bill: result[0], title: 'Edit bill', status, payees})
        }
    });
    });
    });
    });
  }

const bill_edit = async (req, res) => {
 const billId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE bill SET payeeId = ?, totalAmount = ?, amountDue = ?, dueDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE billID = ?',
  [
    req.body.payeeId,
    req.body.totalAmount,
    req.body.amountDue,
    req.body.dueDate,
    req.body.comment,
    req.body.status,
    global.userId,
    new Date(),
    billId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/bills/church/" + req.body.churchId);
    }
});
});
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
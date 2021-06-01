//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
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
      connection.query('SELECT i.incomeId, i.cashAmount + i.checkAmount + i.coinAmount as total, f.name as fundType, i.incomeDate, i.cashAmount, i.checkAmount, i.coinAmount,i.checkNumber, i.comment FROM income as i LEFT JOIN fund as f ON i.fundId = f.fundId LEFT JOIN bank as b ON f.bankId = b.bankId LEFT JOIN constant as c ON f.typeID = c.constantId  WHERE i.churchId = ?',[churchId], (err, result) => {
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
      connection.query('SELECT * FROM fund WHERE churchId = ?', [churchId], (err, result) => {
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
    connection.query('INSERT INTO income SET churchId = ?, fundId = ?, incomeDate = ?, cashAmount = ?, checkAmount = ?, coinAmount = ?, checkNumber = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.fundId,
      req.body.incomeDate,
      req.body.cashAmount,
      req.body.checkAmount,
      req.body.coinAmount,
      req.body.checkNumber,
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
     connection.query('SELECT name FROM income WHERE category = ? ',['Status'], (err, status) => {
      connection.query('SELECT name, fundId FROM fund WHERE churchId = ? ',[global.churchId], (err, funds) => {
      connection.query('SELECT sum(cashAmount + checkAmount + coinAmount) as total, incomeId, fundId, churchId, incomeDate, cashAmount, checkAmount, coinAmount, checkNumber, comment, status, enteredBy, dateEntered FROM income WHERE incomeId = ?', [incomeId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("incomes/edit", { income: result[0], title: 'Edit income', status, funds})
        }
    });
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
  connection.query('UPDATE income SET fundId = ?, incomeDate = ?, cashAmount = ?, checkAmount = ?, coinAmount = ?, checkNumber = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE incomeID = ?',
  [
    req.body.fundId,
    req.body.incomeDate,
    req.body.cashAmount,
    req.body.checkAmount,
    req.body.coinAmount,
    req.body.checkNumber,
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

// const Fund = require('../models/fund');
// const Income = require('../models/income');
// const Church = require('../models/church');

// const income_index = async (req, res) => {
//     const churchId = req.params.id;
//     await Income.find({ church: churchId }).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('incomes/index', { title: 'All Incomes', incomes: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const income_details = async (req, res) => {
//     const id = req.params.id;
//     await Income.findById(id)
//      .then((result) => {
//       res.render("incomes/details", { income: result, title: 'Income Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'Income not found'});
//     });
// }

// const income_create_get = async (req, res) => {
//   const churchId = req.params.id;
//   const todayDate = new Date();
//   await Fund.find({ church: churchId, category: ['Income','Both']}).sort({ createdAt: -1 })
//   .then((result) => {
//     res.render('incomes/create', {title: 'Create a New income', churchId, funds: result, todayDate});
//   })
//   .catch((err) => {
//     res.status(404).render('404', {title: 'Income not found'});
//   });
  

// }

// const income_create_post = (req, res) => {
//   const income = new Income(req.body);
//   income.church = req.body.churchId;
//   income.enteredBy = global.userId;

//   income.save()
//   .then((result) => {
//     res.redirect("/incomes/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const income_delete = async (req, res) => {
//  const id = req.params.id;
//   await Income.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/incomes");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }
// const income_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Income.findById(id)
//     .then(result => {
//       res.render('incomes/delete', {income: result, title: 'Delete Income'});
//     })
//     .catch(err => console.log(err));
// }

// const income_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await Income.findById(id)
//     .then(result => {
//       res.render('incomes/edit', {income: result, title: 'Edit Income'});
//     })
//     .catch(err => console.log(err));
// }

// const income_edit = async (req, res) => {
// const id = req.params.id;
// const income = new Income(req.body);
// await Income.findById(id)
// .then(result => {
//   result.fundId = income.fundId;
//   result.statusId = income.statusId;
//   result.cashAmount = income.cashAmount;
//   result.checkAmount = income.checkAmount;
//   result.coinAmount = income.coinAmount;
//   result.incomeDate = income.incomeDate;
//   result.checkNumber = income.checkNumber;
//   result.comment = income.comment;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/incomes');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     income_index,
//     income_details,
//     income_create_get,
//     income_create_post,
//     income_delete_get,
//     income_delete,
//     income_edit_get,
//     income_edit
// }
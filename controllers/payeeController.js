//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const payee_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM payee WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('payees/index', { title: 'All payees', payees: result, churchId: churchId })
        }
    });
    });
}

const payee_details = (req, res) => {
    const payeeId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM payee WHERE churchId = ? AND payeeId = ?', [global.churchId, payeeId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("payees/details", { payee: result[0], title: 'payee Details'})
        }
    });
    });
}

const payee_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Frequency', 'Active'], (err, frequencies) => {
      connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Type', 'Active'], (err, types) => {
      connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active'], (err, funds) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
          res.render('payees/create', {title: 'Create a New payee', churchId, frequencies, types, funds});
        }
    });
    });
  });
});
}

const payee_create_post = async (req, res) => {
  const payeeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO payee SET churchId = ?, fundId = ?, typeId = ?, frequencyId = ?, name = ?, email = ?, phone = ?, url = ?, description = ?, accountNumber = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
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
    ],
    (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.redirect("payees/church/" + req.body.churchId);
      }
  });
  });
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
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Frequency', 'Active'], (err, frequencies) => {
      connection.query('SELECT * FROM constant WHERE category = ? AND status = ?',['Payee Type', 'Active'], (err, types) => {
      connection.query('SELECT f.fundId, f.name, b.shortAccountName FROM fund AS f INNER JOIN  constant AS c ON f.typeId = c.constantId INNER JOIN bank As b ON b.bankId = f.bankId WHERE f.churchId = ? AND Trim(c.name) in (?, ?) AND f.status = ?',[churchId, 'Expense', 'Income & Expense', 'Active'], (err, funds) => {  
     connection.query('SELECT * FROM payee WHERE churchId = ? AND payeeId = ? ',[global.churchId, payeeId], (err, result) => {
      connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {  
      connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("payees/edit", { payee: result[0], title: 'Edit payee', funds, frequencies, types, status});
        }
    });
    });
  });
});
});
});
  }

const payee_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const payeeId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE payee SET fundId = ?, typeId = ?, frequencyId = ?, name = ?, email = ?, phone = ?, url = ?, description = ?, accountNumber = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE payeeID = ?',
  [
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
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/payees/church/" + req.body.churchId);
    }
});
});
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

// const Payee = require('../models/payee');
// const Church = require('../models/church');
// const payee = require('../models/payee');
// const Fund = require('../models/fund');
// const { populate } = require('../models/church');

// const payee_index = async (req, res) => {
//     const churchId = req.params.id;
//     await Payee.find({ church: churchId }).sort({ createdAt: -1 })
//     .populate('fund','name _id)')
//     .populate('payee','name _id')
//     .then((result) => {
//       res.render('payees/index', { title: 'All payee', payees: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const payee_details = async (req, res) => {
//     const id = req.params.id;
//     await Payee.findById(id)
//     .populate('fund','name _id')
//      .then((result) => {
//       res.render("payees/details", { payee: result, title: 'payee Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'payee not found'});
//     });
// }

// const payee_create_get = async  (req, res) => {
//   const churchId = req.params.id;
//   const funds = await Fund.find({church: churchId},'_id name').sort({ name: 1 });
//   const types = await payee.find({church: churchId, category: 'Payee Type'},'_id category name value1').sort({ sort: -1 });
//   const frequencies = await payee.find({church: churchId, category: 'Payee Frequency'},'_id category name value1').sort({ sort: -1 });
//   res.render('payees/create', {title: 'Create a New payee', churchId, types, funds, frequencies});
// }

// const payee_create_post = (req, res) => {
//   const payee = new Payee(req.body);
//   payee.church = req.body.churchId;
//   payee.enteredBy = global.userId;
//   payee.save()
//   .then((result) => {
//     res.redirect("/payees/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const payee_delete = async (req, res) => {
//  const id = req.params.id;
//   await Payee.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/payee");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const payee_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Payee.findById(id)
//     .then(result => {
//       res.render('payee/delete', {payee: result, title: 'Delete payee'});
//     })
//     .catch(err => console.log(err));
// }

// const payee_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await Payee.findById(id)
//     .then(result => {
//       res.render('payee/edit', {payee: result, title: 'Edit payee'});
//     })
//     .catch(err => console.log(err));
// }

// const payee_edit = async (req, res) => {
// const id = req.params.id;
// const payee = new Payee(req.body);
// await Payee.findById(id)
// .then(result => {
//   result.church = payee.church;
//   result.fund = payee.fund;
//   result.payee = payee.payee;
//   result.phone = payee.phone;

//   result.url = payee.url;
//   result.fequency = payee.fequency;
//   result.description = payee.description;
//   result.payeeType = payee.payeeType;
//   result.status = payee.status;


//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/payee');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     payee_index,
//     payee_details,
//     payee_create_get,
//     payee_create_post,
//     payee_delete_get,
//     payee_delete,
//     payee_edit_get,
//     payee_edit
// }
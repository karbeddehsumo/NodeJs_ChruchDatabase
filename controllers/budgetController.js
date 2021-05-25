
const moment = require('moment');
const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const budget_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM budget WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('budgets/index', { title: 'All budgets', budgets: result, churchId: churchId })
        }
    });
    });
}

const budget_details = (req, res) => {
    const budgetId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM budget WHERE budgetId = ?', [budgetId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("budgets/details", { budget: result[0], title: 'budget Details'})
        }
    });
    });
}

const budget_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      let _access;
      let _venue;
      if(err) throw err;
     connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Access'], (err, access) => {
          _access = access;
      });
      connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Venue'], (err, venue) => {
        _venue = venue;
    });
      connection.query('SELECT * FROM ministry WHERE churchId = ? AND status = ?', [churchId, 'Active'], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("budgets/create", { ministries: result, title: 'Add New budget', access: _access, venues: _venue, churchId})
        }
    });
  });
}

const budget_create_post = async (req, res) => {
  const churchId = req.body.churchId;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO budget SET churchId = ?, title = ?, startDate = ?, endDate = ?, description = ?, url = ?, venue = ?, access = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.title,
      req.body.startDate,
      req.body.endDate,
      req.body.description,
      req.body.url,
      req.body.venue,
      req.body.access,
      req.body.ministry1,
      req.body.ministry2,
      req.body.ministry3,
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
        res.redirect("budgets/church/" + churchId);
      }
  });
  });
}

const budget_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const budgetId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM budget WHERE budgetId = ?', [budgetId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/budgets/church/" + global.churchId);
    }
});
});
}


const budget_delete_get = async (req, res) => {
  const budgetId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM budget WHERE budgetId = ?', [budgetId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("budgets/delete", { budget: result[0], title: 'Delete budget'})
      }
  });
});
}

const budget_edit_get = async (req, res) => {
  const budgetId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      let _venue;
      let _ministries;
      let _access;
      if(err) throw err;
     connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
          _status = status;
      });
      connection.query('SELECT name, constantId FROM constant WHERE category = ? and churchId = ? ',['Venue',global.churchId], (err, venue) => {
        _venue = venue;
      });
      connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Access'], (err, access) => {
          _access = access;
      });
      connection.query('SELECT name, ministryId FROM ministry WHERE churchId = ? AND status = ?',[global.churchId,'Active'], (err, ministries) => {
        _ministries = ministries;
      });
      connection.query('SELECT * FROM budget WHERE budgetId = ?', [budgetId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          console.log('Inside budget edit');
          console.log(_ministries);
          res.render("budgets/edit", { budget: result[0], title: 'Edit budget', status: _status, venues: _venue, access: _access, ministries: _ministries, moment})
        }
    });
    });
  }

const budget_edit = async (req, res) => {
  const churchId = req.body.churchId;
 const budgetId = req.params.id;
 console.log('inside budget edit');
 console.log(req.body);
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE budget SET title = ?, startDate = ?, endDate = ?, description = ?, url = ?, venue = ?, access = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE budgetID = ?',
  [
    req.body.title,
    req.body.startDate,
    req.body.endDate,
    req.body.description,
    req.body.url,
    req.body.venue,
    req.body.access,
    req.body.ministry1,
    req.body.ministry2,
    req.body.ministry3,
    req.body.status,
    global.userId,
    new Date(),
    budgetId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/budgets/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    budget_index,
    budget_details,
    budget_create_get,
    budget_create_post,
    budget_delete_get,
    budget_delete,
    budget_edit_get,
    budget_edit
}







// const Budget = require('../models/budget');
// const Church = require('../models/church');
// const Constant = require('../models/constant');
// const Fund = require('../models/fund');

// const budget_index = async (req, res) => {
//     const churchId = req.params.id;
//     await Budget.find({ church: churchId }).sort({ createdAt: -1 })
//     .populate('fund','name _id')
//     .then((result) => {
//       console.log('budget data here');
//       console.log(result);
//       res.render('budgets/index', { title: 'All budget', budgets: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const budget_details = async (req, res) => {
//     const id = req.params.id;
//     await Budget.findById(id)
//     .populate('fund','name _id')
//      .then((result) => {
//        console.log('Here is the budget item');
//        console.log(result);
//       res.render("budgets/details", { budget: result, title: 'budget Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'budget not found'});
//     });
// }

// const budget_create_get = async (req, res) => {
//   const churchId = req.params.id;
//   const fundType = req.params.type;
//   let year = new Date().getFullYear();
//   var budgetYear = [year-1,year,year+1]
//   await Fund.find({ church: churchId, category: [fundType,'Both']}).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('budgets/create', {title: 'Create a New budget', churchId, funds: result, fundType, budgetYear })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const budget_create_post = (req, res) => {
//   const budget = new Budget(req.body);
//   budget.church = req.body.churchId;
//   budget.enteredBy = global.userId;
//   budget.save()
//   .then((result) => {
//     res.redirect("/budgets/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const budget_delete = async (req, res) => {
//  const id = req.params.id;
//   await Budget.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/budgets");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const budget_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Budget.findById(id)
//     .polupate('fund', 'name')
//     .then(result => {
//       console.log('here is the fund pop');
//       console.log(result);
//       res.render('budgets/delete', {budget: result, title: 'Delete budget'});
//     })
//     .catch(err => console.log(err));
// }

// const budget_edit_get = async (req, res) => {
//   const id = req.params.id;
//   const budget = await Budget.findById(id);
//   const status = await Constant.find({category: 'Status'}, '_id category name value1').sort({ sort: 1}); 
//   const funds =  await Fund.find({ church: budget.church, category: [budget.type, 'Both']}).sort({ createdAt: -1 });
//     await Budget.findById(id)
//     .populate('fund', 'name _id')
//     .then(result => {
//       const title = 'Edit ' + result.type + ' Budget';
      
//       res.render('budgets/edit', {budget: result, funds, title, PermissionStatus});
//     })
//     .catch(err => console.log(err));
// }

// const budget_edit = async (req, res) => {
// const id = req.params.id;
// const budget = new Budget(req.body);
// await Budget.findById(id)
// .then(result => {
//   result.church = budget.church;
//   result.fund = budget.fund;
//   result.year = budget.year;
//   result.amount = budget.amount;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/budgets/' + id);
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     budget_index,
//     budget_details,
//     budget_create_get,
//     budget_create_post,
//     budget_delete_get,
//     budget_delete,
//     budget_edit_get,
//     budget_edit
// }
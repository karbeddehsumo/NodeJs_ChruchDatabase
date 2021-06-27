
const moment = require('moment');
const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const budgetDb = require('../db/budgetDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const budget_index = async (req, res) => {
  const churchId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const result = await connection.query('SELECT b.budgetId, b.year, b.amount, c.name as type, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ?',[churchId]);
    res.render('budgets/index', { title: 'All budgets', budgets: result[0], churchId });

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT b.budgetId, b.year, b.amount, c.name as type, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ?',[churchId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('budgets/index', { title: 'All budgets', budgets: result, churchId: churchId })
    //     }
    // });
    // });
}

const budget_details = async (req, res) => {
    const budgetId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const result = await connection.query('SELECT b.budgetId, b.year, b.amount, c.name as type, f.typeId, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ? AND b.budgetId  = ?', [global.churchId, budgetId]);
      global.budgetFundType = result[0][0].type;
      global.budgetFundTypeId = result[0][0].typeId;
      res.render("budgets/details", { budget: result[0][0], title: 'budget Details'})
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT b.budgetId, b.year, b.amount, c.name as type, f.typeId, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ? AND b.budgetId  = ?', [global.churchId, budgetId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       global.budgetFundType = result[0].type;
    //       global.budgetFundTypeId = result[0].typeId;
    //       res.render("budgets/details", { budget: result[0], title: 'budget Details'})
    //     }
    // });
    // });
}

const budget_create_get = async (req, res) => {
    const churchId = req.params.id;
    const fundType = req.params.type;
    let year = new Date().getFullYear();
    var budgetYear = [year-1,year,year+1]
  
    const connection = await pool.getConnection();
    try {
      const fund = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', fundType]);
      const both = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', 'Income & Expense']);
      const fundlist = await connection.query('SELECT name, fundId FROM fund WHERE churchId = ? AND typeId in (?, ?) AND status = ?',[churchId, both[0][0].constantId, fund[0][0].constantId, 'Active'])
      res.render('budgets/create', {title: 'Create a New budget', churchId, funds: fundlist[0], fundType, budgetYear,fundTypeId: fund[0][0].constantId  });
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

//     pool.getConnection((err, connection) => {
//       if(err) throw err;
//      connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', fundType], (err, fund) => {
//          connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', 'Income/Expense'], (err, both) => {
//       connection.query('SELECT name, fundId FROM fund WHERE churchId = ? AND typeId in (?, ?) AND status = ?',[churchId, both[0].constantId, fund[0].constantId, 'Active'], (err, result) => {
//         connection.release();
//         if(err){
//           console.log('we have mysql error');
//           console.log(err);
//         }
//         else
//         {
//             res.render('budgets/create', {title: 'Create a New budget', churchId, funds: result, fundType, budgetYear,fundTypeId: fund[0].constantId  })
//         }
//     });
//   });
//   });
// });
}

const budget_create_post = async (req, res) => {
  const churchId = req.body.churchId;
  const connection = await pool.getConnection();
  try {
    const bills = await budgetDb._insert(connection, 
      req.body.churchId,
      req.body.year,
      req.body.typeId,
      req.body.fundId,
      req.body.amount,
      req.body.comment,
      req.body.status,
      global.userId,
      new Date()
      );
      res.redirect("budgets/church/" + churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO budget SET churchId = ?, year = ?, typeId = ?, fundId = ?, amount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.year,
  //     req.body.typeId,
  //     req.body.fundId,
  //     req.body.amount,
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
  //       res.redirect("budgets/church/" + churchId);
  //     }
  // });
  // });
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
    const fundType = global.budgetFundType; //req.params.type;
    let year = new Date().getFullYear();
    var budgetYear = [year-1,year,year+1];

    const connection = await pool.getConnection();
 
    const fundTypes = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', global.budgetFundType]);
    const both = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', 'Income & Expense']);
    const fundList = await connection.query('SELECT name, fundId FROM fund WHERE churchId = ? AND typeId in (?, ?) AND status = ?',[churchId, both[0][0].constantId, fundTypes[0][0].constantId, 'Active'])

    const status = await constantDb.get(connection, 'Status','Active');
    
    //const both = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', 'Income & Expense']);
    const result = await connection.query('SELECT b.comment, b.typeId, b.churchId, b.status, b.budgetId, b.year, b.amount, c.name as type, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ? AND b.budgetId = ?',[global.churchId, budgetId]);
    console.log('Inside budget edit get');
    console.log(fundList[0][0]);
    console.log(fundTypes[0]);
    
    res.render("budgets/edit", { budget: result[0][0], title: 'Edit budget', status, funds: fundList[0], budgetYear,fundTypeId: fundTypes[0][0].constantId});

    // const status = await constantDb.get(connection, 'Status','Active');
    // const fund = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', fundType]);
    // const both = await connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', 'Income & Expense']);
    // const fundlist = await connection.query('SELECT name, fundId FROM fund WHERE churchId = ? AND typeId in (?, ?) AND status = ?',[churchId, both[0][0].constantId, fund[0][0].constantId, 'Active'])
    // const result = await connection.query('SELECT b.comment, b.typeId, b.churchId, b.status, b.budgetId, b.year, b.amount, c.name as type, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ? AND b.budgetId = ?',[global.churchId, budgetId]);
 
    // res.render('budgets/edit', {budget: result[0][0], title: 'Edit budget', churchId, funds: fundlist[0], fundType, budgetYear,fundTypeId: fund[0][0].constantId  });

//     pool.getConnection((err, connection) => {
//       let _fundTypeId;
//       let _both;
//       let _status;
//       let _funds;
//       if(err) throw err;
//       connection.query('SELECT fundId, name FROM fund WHERE churchId = ? AND typeId = ?',[global.churchId, global.budgetFundTypeId], (err, fund) => {
//         _funds = fund;
//       connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
//         _status = status;
//      connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', global.budgetFundType], (err, fund) => {
//          _fundTypeId = fund[0].constantId;
//          connection.query('SELECT constantId FROM constant WHERE category = ? and name = ?',['Fund Type', 'Income/Expense'], (err, both) => {
//            _both = both[0].constantId;
//       connection.query('SELECT b.comment, b.typeId, b.churchId, b.status, b.budgetId, b.year, b.amount, c.name as type, f.name as fund FROM budget as b inner join fund as f ON b.fundId = f.fundId inner join constant as c on b.typeId = c.constantId WHERE b.churchId = ? AND b.budgetId = ?',[global.churchId, budgetId], (err, result) => {
//         connection.release();
//         if(err){
//           console.log('we have mysql error');
//           console.log(err);
//         }
//         else
//         {
//             res.render("budgets/edit", { budget: result[0], title: 'Edit budget', status: _status, funds: _funds, fundType, budgetYear,fundTypeId: _fundTypeId})
//         }
//       });
//     });
//   });
//   });
// });
// });
  }

const budget_edit = async (req, res) => {
const churchId = req.body.churchId;
 const budgetId = req.params.id;
 const connection = await pool.getConnection();
  try {
    const bills = await budgetDb._update(connection, 
      req.body.year,
      req.body.typeId,
      req.body.fundId,
      req.body.amount,
      req.body.comment,
      req.body.status,
      global.userId,
      new Date(),
      budgetId
      );
      res.redirect("/budgets/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE budget SET year = ?, typeId = ?, fundId = ?, amount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE budgetID = ?',
//   [
//     req.body.year,
//     req.body.typeId,
//     req.body.fundId,
//     req.body.amount,
//     req.body.comment,
//     req.body.status,
//     global.userId,
//     new Date(),
//     budgetId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/budgets/church/" + req.body.churchId);
//     }
// });
// });
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








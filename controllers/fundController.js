
const moment = require('moment');
const mysql = require('mysql');
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






// const Fund = require('../models/fund');
// const Bank = require('../models/bank');
// const Church = require('../models/church');

// const fund_index = async (req, res) => {
//     const churchId = req.params.id;
//     const banks = await Bank.findById(churchId);
//     await Fund.find({ church: churchId }).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('funds/index', { title: 'All fund', funds: result, churchId, banks })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const fund_details = async (req, res) => {
//     const id = req.params.id;
//     await Fund.findById(id)
//      .then((result) => {
//       res.render("fund/details", { fund: result, title: 'Fund Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'Fund not found'});
//     });
// }

// const fund_create_get = async (req, res) => {
//     const churchId = req.params.id;
//     await Bank.find({ church: churchId }).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('funds/create', {title: 'Create a New Fund', churchId, banks: result});
//     })
//     .catch((err) => {
//       res.status(404).rednder('404', {title: 'Banks not found'});
//     })
// }

// const fund_create_post = (req, res) => {
//   const fund = new Fund(req.body);
//   fund.church = req.body.churchId;
//   fund.enteredBy = global.userId;
//   fund.save()
//   .then((result) => {
//     res.redirect("/funds/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const fund_delete = async (req, res) => {
//  const id = req.params.id;
//   await Fund.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/fund");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }
// const fund_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Fund.findById(id)
//     .then(result => {
//       res.render('fund/delete', {fund: result, title: 'Delete Fund'});
//     })
//     .catch(err => console.log(err));
// }

// const fund_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await Fund.findById(id)
//     .then(result => {
//       res.render('fund/edit', {fund: result, title: 'Edit fund'});
//     })
//     .catch(err => console.log(err));
// }

// const fund_edit = async (req, res) => {
// const id = req.params.id;
// const fund = new Fund(req.body);
// await Fund.findById(id)
// .then(result => {
//   result.church = fund.church;
//   result.name = fund.name;
//   result.category = fund.category;
//   result.bank = fund.bank;
//   result.description = fund.description;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/fund');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     fund_index,
//     fund_details,
//     fund_create_get,
//     fund_create_post,
//     fund_delete_get,
//     fund_delete,
//     fund_edit_get,
//     fund_edit
// }
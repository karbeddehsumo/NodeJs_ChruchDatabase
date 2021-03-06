//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const contributionDb = require('../db/contributionDb');
const memberDb = require('../db/memberDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const contribution_index = async (req, res) => {
  const churchId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const result = await memberDb.getAll(connection, churchId);
    const contributions = await connection.query('SELECT c.contributionId, c.amount, c.contributionDate, t.name AS fundType, m.lastName, m.firstName, m.middleName, m.memberId  FROM contribution AS c INNER JOIN member AS m ON c.memberId = m.memberId INNER JOIN constant AS t ON c.typeId = t.constantId WHERE c.churchId = ?',[global.churchId]);
    res.render('contributions/index', { title: 'All contributions', members: result, churchId: churchId, contributionList: contributions[0] });

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

  //   pool.getConnection((err, connection) => {
  //     if(err) throw err; 
  //     connection.query('SELECT * FROM member WHERE churchId = ? AND status = ?',[churchId, 'Active'], (err, result) => {
  //       connection.query('SELECT c.contributionId, c.amount, c.contributionDate, t.name AS fundType, m.lastName, m.firstName, m.middleName, m.memberId  FROM contribution AS c INNER JOIN member AS m ON c.memberId = m.memberId INNER JOIN constant AS t ON c.typeId = t.constantId WHERE c.churchId = ?',[global.churchId], (err, contributionList) => {       
  //       connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //       }
  //       else
  //       {
  //           res.render('contributions/index', { title: 'All contributions', members: result, churchId: churchId, contributionList })
  //       }
  //   });
  //   });
  // });
}

const contribution_details = async (req, res) => {
    const contributionId = req.params.id;
    const connection = await pool.getConnection();
  try {
    const result = await contributionDb.getById(connection, contributionId);
    res.render("contributions/details", { contribution: result, title: 'contribution Details'});

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("contributions/details", { contribution: result[0], title: 'contribution Details'})
    //     }
    // });
    // });
}

const contribution_create_get = async (req, res) => {
    const memberId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const member = await memberDb.getById(connection, memberId);
      const types = await connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type']);
      res.render('contributions/create', { title: 'Add contribution for', contributionTypes: types[0], churchId: global.churchId, member });
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
  //   pool.getConnection((err, connection) => {
  //     if(err) throw err; 
  //     connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, contributionTypes) => {
  //        connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //       }
  //       else
  //       {
  //           res.render('contributions/create', { title: 'Create a New contribution', contributionTypes, churchId: global.churchId, memberId })
  //       }
  //   });
  // });
}

const contribution_create_post = async (req, res) => {

  const connection = await pool.getConnection();
  try {
    const bills = await contributionDb._insert(connection, 
      req.body.churchId,
      req.body.memberId,
      req.body.amount,
      req.body.typeId,
      req.body.checkNumber,
      req.body.contributionDate,
      req.body.comment,
      global.userId,
      new Date()
      );
      res.redirect("contributions/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO contribution SET churchId = ?, memberId = ?, amount = ?, typeId = ?, checkNumber = ?, contributionDate = ?, comment = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.memberId,
  //     req.body.amount,
  //     req.body.typeId,
  //     req.body.checkNumber,
  //     req.body.contributionDate,
  //     req.body.comment,
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
  //       res.redirect("contributions/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const contribution_delete = async (req, res) => {
 const contributionId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/contributions/church/" + global.churchId);
    }
});
});
}


const contribution_delete_get = async (req, res) => {
  const contributionId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("contributions/delete", { contribution: result[0], title: 'Delete contribution'})
      }
  });
});
}

const contribution_edit_get = async (req, res) => {
  const contributionId = req.params.id;
  const connection = await pool.getConnection();
    try {
      const result = await contributionDb.getById(connection, contributionId);
      const types = await connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type']);
      res.render("contributions/edit", { contribution: result, title: 'Edit contribution', contributionTypes: types[0]})
  
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

  //   pool.getConnection((err, connection) => {
  //     if(err) throw err;
  //    connection.query('SELECT * FROM contribution WHERE contributionId = ? ',[contributionId], (err, result) => {
  //     connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, contributionTypes) => {
  //       connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //         console.log(err);
  //       }
  //       else
  //       {
  //         res.render("contributions/edit", { contribution: result[0], title: 'Edit contribution', contributionTypes})
  //       }
  //   });
  //   });
  // });
  }

const contribution_edit = async (req, res) => {
 const contributionId = req.params.id;
 const connection = await pool.getConnection();
  try {
    const bills = await contributionDb._update(connection, 
      req.body.churchId,
      req.body.memberId,
      req.body.amount,
      req.body.typeId,
      req.body.checkNumber,
      req.body.contributionDate,
      req.body.comment,
      global.userId,
      new Date(),
      contributionId
      );
      res.redirect("/contributions/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE contribution SET memberId = ?, amount = ?, typeId = ?, checkNumber = ?, contributionDate = ?, comment = ?, enteredBy = ?, dateEntered = ? WHERE contributionID = ?',
//   [
//       req.body.memberId,
//       req.body.amount,
//       req.body.typeId,
//       req.body.checkNumber,
//       req.body.contributionDate,
//       req.body.comment,
//       global.userId,
//       new Date(),
//     contributionId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/contributions/church/" + req.body.churchId);
//     }
// });
// });
}

module.exports = {
    contribution_index,
    contribution_details,
    contribution_create_get,
    contribution_create_post,
    contribution_delete_get,
    contribution_delete,
    contribution_edit_get,
    contribution_edit
}


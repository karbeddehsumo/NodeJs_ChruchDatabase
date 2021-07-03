//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const pledgeDb = require('../db/pledgeDb');
const memberDb = require('../db/memberDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const pledge_index = async (req, res) => {
  const churchId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const result = await connection.query('SELECT p.pledgeId, p.amount, p.year, m.firstName, m.lastName, m.middleName, c.name AS frequency, t.name as fund FROM pledge AS p INNER JOIN member AS m ON p.memberId = m.memberId INNER JOIN constant as c ON p.frequencyId = c.constantId INNER JOIN constant AS t ON p.fundId = t.constantId WHERE p.churchId = ?',[global.churchId]);
    res.render('pledges/index', { title: 'All pledges', pledges: result[0], churchId });
  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT p.pledgeId, p.amount, p.year, m.firstName, m.lastName, m.middleName, c.name AS frequency, t.name as fund FROM pledge AS p INNER JOIN member AS m ON p.memberId = m.memberId INNER JOIN constant as c ON p.frequencyId = c.constantId INNER JOIN constant AS t ON p.fundId = t.constantId WHERE p.churchId = ?',[churchId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('pledges/index', { title: 'All pledges', pledges: result, churchId })
    //     }
    // });
    // });
}

const pledge_details = async (req, res) => {
    const pledgeId = req.params.id;
    const connection = await pool.getConnection();
  try {
    const result = await pledgeDb.getById(connection, pledgeId);
    res.render("pledges/details", { pledge: result, title: 'pledge Details'});
  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }

    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM pledge WHERE pledgeId = ?', [pledgeId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("pledges/details", { pledge: result[0], title: 'pledge Details'})
    //     }
    // });
    // });
}

const pledge_create_get = async (req, res) => {
    const churchId = req.params.id;
    let year = new Date().getFullYear();
    var pledgeYear = [year-1,year,year+1]
    const connection = await pool.getConnection();
    try {
      const memberList = await memberDb.getAll(connection, global.churchId);
      const memberContributionList = await constantDb.get(connection,'Member Contribution Type', 'Active');
      const pledgeFrequencyList = await constantDb.get(connection,'Pledge Frequency', 'Active');
      res.render('pledges/create', {title: 'Create a New pledge', churchId, members: memberList, frequencies: pledgeFrequencyList, funds: memberContributionList, pledgeYear});
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

    //     pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT * FROM member WHERE churchId = ? AND status = ?',[global.churchId,'Active'], (err, members) => {
    //   connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, funds) => {
    //   connection.query('SELECT * FROM constant WHERE category = ?',[ 'Pledge Frequency'], (err, frequencies) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('pledges/create', {title: 'Create a New pledge', churchId, members, frequencies, funds, pledgeYear});
    //     }
    // });
    // });
    // });
    // });
}

const pledge_create_post = async (req, res) => {
  const pledgeId = req.params.id;
  const connection = await pool.getConnection();
  try {
    const pledge = await pledgeDb._insert(connection, 
      req.body.churchId,
      req.body.memberId,
      req.body.fundId,
      req.body.amount,
      req.body.year,
      req.body.frequencyId,
      global.userId,
      new Date()
      );
      res.redirect("pledges/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }


  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO pledge SET churchId = ?, memberId = ?, fundId = ?, amount = ?, year = ?, frequencyId = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.memberId,
  //     req.body.fundId,
  //     req.body.amount,
  //     req.body.year,
  //     req.body.frequencyId,
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
  //       res.redirect("pledges/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const pledge_delete = async (req, res) => {
 const pledgeId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM pledge WHERE pledgeId = ?', [pledgeId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/pledges/church/" + global.churchId);
    }
});
});
}


const pledge_delete_get = async (req, res) => {
  const pledgeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM pledge WHERE pledgeId = ?', [pledgeId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("pledges/delete", { pledge: result[0], title: 'Delete pledge'})
      }
  });
});
}

const pledge_edit_get = async (req, res) => {
  const pledgeId = req.params.id;
     let year = new Date().getFullYear();
    var pledgeYear = [year-1,year,year+1]

    const connection = await pool.getConnection();
    try {
      const memberList = await memberDb.getAll(connection, global.churchId);
      const memberContributionList = await constantDb.get(connection,'Member Contribution Type', 'Active');
      const pledgeFrequencyList = await constantDb.get(connection,'Pledge Frequency', 'Active');
      const result = await pledgeDb.getById(connection, pledgeId);
      res.render('pledges/edit', {pledge: result, churchId, members: memberList, frequencies: pledgeFrequencyList, funds: memberContributionList, pledgeYear});
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }

    //     pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT * FROM pledge WHERE churchId = ? AND pledgeId = ?',[global.churchId, pledgeId], (err, result) => {
    //   connection.query('SELECT * FROM member WHERE churchId = ? AND status = ?',[global.churchId,'Active'], (err, members) => {
    //   connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, funds) => {
    //   connection.query('SELECT * FROM constant WHERE category = ?',[ 'Pledge Frequency'], (err, frequencies) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('pledges/edit', {pledge: result[0], churchId, members, frequencies, funds, pledgeYear});
    //     }
    // });
    // });
    // });
    // });
    // });
  }

const pledge_edit = async (req, res) => {
 const pledgeId = req.params.id;
 const connection = await pool.getConnection();
  try {
    const pledge = await pledgeDb._update(connection, 
      req.body.memberId,
      req.body.fundId,
      req.body.amount,
      req.body.year,
      req.body.frequencyId,
      global.userId,
      new Date(),
      pledgeId
      );
      res.redirect("/pledges/church/" + req.body.churchId);

  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE pledge SET memberId = ?, fundId = ?, amount = ?, year = ?, frequencyId = ?, enteredBy = ?, dateEntered = ? WHERE pledgeID = ?',
//   [
//     req.body.memberId,
//     req.body.fundId,
//     req.body.amount,
//     req.body.year,
//     req.body.frequencyId,
//     global.userId,
//     new Date(),
//     pledgeId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/pledges/church/" + req.body.churchId);
//     }
// });
// });
}

module.exports = {
    pledge_index,
    pledge_details,
    pledge_create_get,
    pledge_create_post,
    pledge_delete_get,
    pledge_delete,
    pledge_edit_get,
    pledge_edit
}






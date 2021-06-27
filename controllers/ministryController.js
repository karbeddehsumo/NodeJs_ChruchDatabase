//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const ministryDb = require('../db/ministryDb');
const constantDb = require('../db/constantDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const ministry_index = async (req, res) => {
  const connection = await pool.getConnection();
   try {
    const churchId = req.params.id;
     const result = await ministryDb.getAll(connection, global.churchId);
     res.render('ministries/index', { title: 'All ministries', ministries: result, churchId });
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }
}

const ministry_details = async (req, res) => {
    const ministryId = req.params.id;
    const connection = await pool.getConnection();
    try {
      const result = await ministryDb.getById(connection, ministryId);
      res.render("ministries/details", { ministry: result, title: 'ministry Details'});
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM ministry WHERE ministryId = ?', [ministryId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("ministries/details", { ministry: result[0], title: 'ministry Details'})
    //     }
    // });
    // });
}

const ministry_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('ministries/create', {title: 'Create a New ministry', churchId});
    
}

const ministry_create_post = async (req, res) => {
  const ministryId = req.params.id;
  const connection = await pool.getConnection();
    try {
      const result = await ministryDb._insert(connection, 
      req.body.churchId,
      req.body.name,
      req.body.description,
      req.body.contact,
      req.body.email,
      req.body.phone,
      req.body.missionStatement,
      req.body.status,
      global.userId,
      new Date()
        );
        res.redirect("ministries/church/" + req.body.churchId);
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO ministry SET churchId = ?, name = ?, description = ?, contact = ?, email = ?, phone = ?, missionStatement = ?, status = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.name,
  //     req.body.description,
  //     req.body.contact,
  //     req.body.email,
  //     req.body.phone,
  //     req.body.missionStatement,
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
  //       res.redirect("ministries/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const ministry_delete = async (req, res) => {
 const ministryId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM ministry WHERE ministryId = ?', [ministryId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/ministries/church/" + global.churchId);
    }
});
});
}


const ministry_delete_get = async (req, res) => {
  const ministryId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM ministry WHERE ministryId = ?', [ministryId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("ministries/delete", { ministry: result[0], title: 'Delete ministry'})
      }
  });
});
}

const ministry_edit_get = async (req, res) => {
  const ministryId = req.params.id;
  const connection = await pool.getConnection();
    try {
      const result = await ministryDb.getById(connection, ministryId);
      const allMinistries = await ministryDb.getAll(connection,global.churchId);
      const status = await constantDb.get(connection,'Status', 'Active');

      res.render("ministries/edit", { ministry: result, title: 'Edit ministry', status, parentMinistries: allMinistries});
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
    // pool.getConnection((err, connection) => {
    //   let _status;
    //   let _allMinistries;
    //   if(err) throw err;
    //  connection.query('SELECT name FROM ministry WHERE churchId = ? ',[global.churchId], (err, allMinistries) => {
    //     _allMinistries = allMinistries;
    //   });
    //   connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
    //     _status = status;
    //   });
    //   connection.query('SELECT * FROM ministry WHERE ministryId = ?', [ministryId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       console.log("inside ministries");
    //       console.log(result);
    //       res.render("ministries/edit", { ministry: result[0], title: 'Edit ministry', status: _status, parentMinistries: _allMinistries})
    //     }
    // });
    // });
  }

const ministry_edit = async (req, res) => {
 const ministryId = req.params.id;
 const connection = await pool.getConnection();
    try {
      const result = await ministryDb._update(connection, 
      req.body.parentMinistryId,
      req.body.name,
      req.body.description,
      req.body.contact,
      req.body.email,
      req.body.phone,
      req.body.missionStatement,
      req.body.status,
      global.userId,
      new Date(),
      ministryId
        );
        res.redirect("/ministries/church/" + req.body.churchId);
    } catch(err) {
     throw err;
    } finally {
      connection.release();
    }
// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE ministry SET parentMinistryId = ?, name = ?, description = ?, contact = ?, email = ?, phone = ?, missionStatement = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE ministryID = ?',
//   [
//       req.body.parentMinistryId,
//       req.body.name,
//       req.body.description,
//       req.body.contact,
//       req.body.email,
//       req.body.phone,
//       req.body.missionStatement,
//       req.body.status,
//       global.userId,
//       Date.now(),
//       ministryId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/ministries/church/" + req.body.churchId);
//     }
// });
// });
}

module.exports = {
    ministry_index,
    ministry_details,
    ministry_create_get,
    ministry_create_post,
    ministry_delete_get,
    ministry_delete,
    ministry_edit_get,
    ministry_edit
}




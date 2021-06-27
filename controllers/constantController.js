//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const constant_index = async (req, res) => {
  const connection = await pool.getConnection();
   try {
    const churchId = req.params.id;
     const result = await constantDb.getAll(connection, global.churchId);
     res.render('constants/index', { title: 'All constants', constants: result, churchId: churchId });
  
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }
}

const constant_details = async (req, res) => {
    
    const connection = await pool.getConnection();
   try {
     const constantId = req.params.id;
     const result = await constantDb.getById(connection, constantId);
     res.render("constants/details", { constant: result, title: 'constant Details'})
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }
}

const constant_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('constants/create', {title: 'Create a New constant', churchId});
}

const constant_create_post = async (req, res) => {
  const connection = await pool.getConnection();
  try {
   const constantId = req.params.id;
    const result = await constantDb._insert(connection, 
      req.body.churchId,
      req.body.category,
      req.body.name,
      req.body.value1,
      req.body.value2,
      req.body.value3,
      req.body.sort,
      req.body.status,
      global.userId,
      new Date()
      );
      res.redirect("constants/church/" + req.body.churchId); 
  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
}

const constant_delete = async (req, res) => {
 const constantId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM constant WHERE constantId = ?', [constantId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/constants/church/" + global.churchId);
    }
});
});
}


const constant_delete_get = async (req, res) => {
  const constantId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM constant WHERE constantId = ?', [constantId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("constants/delete", { constant: result[0], title: 'Delete Constant'})
      }
  });
});
}

const constant_edit_get = async (req, res) => {
  
  const connection = await pool.getConnection();
  try {
    const constantId = req.params.id;
    const status = await constantDb.get(connection,'Status', 'Active');
    const result = await constantDb.getById(connection, constantId);
    res.render("constants/edit", { constant: result, title: 'Edit Constant', status});
 
  } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
  }

const constant_edit = async (req, res) => {
 
 const connection = await pool.getConnection();
 try {
  const constantId = req.params.id;
   const result = await constantDb._update(connection, 
     req.body.category,
     req.body.name,
     req.body.value1,
     req.body.value2,
     req.body.value3,
     req.body.sort,
     req.body.status,
     global.userId,
     new Date(),
     constantId
     );
     res.redirect("/constants/church/" + req.body.churchId);
 } catch(err) {
  throw err;
 } finally {
   connection.release();
 }
}

module.exports = {
    constant_index,
    constant_details,
    constant_create_get,
    constant_create_post,
    constant_delete_get,
    constant_delete,
    constant_edit_get,
    constant_edit
}
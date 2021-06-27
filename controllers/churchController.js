const moment = require('moment');
const mysql = require('mysql2/promise');
const churchDb = require('../db/churchDb');
const constantDb = require('../db/constantDb');

const pool = mysql.createPool({
  host:  process.env.MYSQL_HOST,
  database: process.env.MYSQL_DBNAME,
  user:  process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
});


const church_index = async (req, res) => {
  const connection = await pool.getConnection();
  try{
    const churchId = req.params.id;
    const result = await churchDb.getAllParents(connection);
    res.render('churches/index', { title: 'All churches', churches: result, churchId: churchId })
  } catch(err){
    throw err;
  } finally {
    connection.release();
  }
}

const church_details = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const churchId = req.params.id;
    const branches = await churchDb.getByParentId(connection, churchId);
    const result = await churchDb.getById(connection, churchId);
    global.churchId = result.churchId;
    global.churchName = result.name;
    res.render("churches/details", { church: result, title: 'church Details', branches});
  } catch(err){
  throw err;
} finally {
  connection.release();
}
}

const church_create_get = (req, res) => {
  const churchId = 0;
  res.render('churches/create', {title: 'Create a New church', churchId});
}

const church_create_post = async (req, res) => {
//const churchId = req.params.id;
const connection = await pool.getConnection();
  try { 
    const result = await churchDb._insert(connection, 
      0,
      req.body.name,
      req.body.tagName,
      req.body.title,
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.founded,
      req.body.phone,
      req.body.email,
      req.body.motto,
      req.body.vision,
      req.body.country,
      req.body.status,
      global.userId,
      Date.now()
      );
      res.redirect("churches/" + result.insertId);
  } catch(err){
    throw err;
  } finally {
    connection.release(); 
  }
}

const church_delete = async (req, res) => {
console.log('Inside delete');
console.log(req.params.id);
const churchId = req.params.id;
pool.getConnection((err, connection) => {
if(err) throw err;
connection.query('DELETE FROM church WHERE churchId = ?', [churchId], (err, result) => {
  connection.release();
  if(err){
    console.log('we have mysql error');
    console.log(err);
  }
  else
  {
    res.redirect("/churches/church/" + global.churchId);
  }
});
});
}


const church_delete_get = async (req, res) => {
const churchId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('SELECT * FROM church WHERE churchId = ?', [churchId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.render("churches/delete", { church: result[0], title: 'Delete church', moment})
    }
});
});
}

const church_edit_get = async (req, res) => {

const connection = await pool.getConnection();
try{
  const churchId = req.params.id;
  const status = await constantDb.get(connection,'Status', 'Active');
  const result = await churchDb.getById(connection, churchId);
  res.render("churches/edit", { church: result, title: 'Edit church', status, moment});
} catch(err){
  throw err;
} finally {
  connection.release();
}

//   pool.getConnection((err, connection) => {
//     if(err) throw err;
//    connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
//     connection.query('SELECT * FROM church WHERE churchId = ?', [churchId], (err, result) => {
//       connection.release();
//       if(err){
//         console.log('we have mysql error');
//         console.log(err);
//       }
//       else
//       {
//         res.render("churches/edit", { church: result[0], title: 'Edit church', status, moment})
//       }
//   });
//   });
// });
}

const church_edit = async (req, res) => {
const churchId = req.params.id;
const connection = await pool.getConnection();
    try {
      
      const result = await churchDb._update(connection, 
        req.body.parentChurchId,
        req.body.name,
        req.body.tagName,
        req.body.title,
        req.body.address1,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.founded,
        req.body.phone,
        req.body.email,
        req.body.motto,
        req.body.vision,
        req.body.country,
        req.body.status,
        global.userId,
        Date.now(),
        churchId
        );
        res.redirect("/churches/" + req.body.churchId);
    } catch(err){
      throw err;
    } finally {
      connection.release(); 
    }
// pool.getConnection((err, connection) => {
// if(err) throw err;
// connection.query('UPDATE church SET parentChurchId = ?, title = ?, name = ?, tagName = ?, founded = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, phone = ?, email = ?, vision = ?, motto = ?,  status = ?, enteredBy = ?, dateEntered = ? WHERE churchID = ?',
// [
//   req.body.parentChurchId,
//   req.body.title,
//   req.body.name,
//   req.body.tagName,
//   req.body.founded,
//   req.body.address1,
//   req.body.address2,
//   req.body.city,
//   req.body.state,
//   req.body.zipcode,
//   req.body.country,
//   req.body.phone,
//   req.body.email,
//   req.body.vision,
//   req.body.motto,
//   req.body.status,
//   global.userId,
//   Date.now(),
//   churchId
// ],
// (err, result) => {
//   connection.release();
//   if(err){
//     console.log('we have mysql error');
//     console.log(err);
//   }
//   else
//   {
//     res.redirect("/churches/" + req.body.churchId);
//   }
// });
// });
}

 const church_tagname_get = async (req, res) => {
const tagName = req.params.name;
pool.getConnection((err, connection) => {
  if(err) throw err; 
  connection.query('SELECT * FROM church WHERE status = ? AND tagName = ?',['Active',tagName], (err, result) => { 
  connection.release();
    if(err){
      console.log('we have mysql error');
    }
    else
    {
      let id = result[0].churchId;
      res.redirect(req.baseUrl + '/' + id); //, { title: 'All Churches', churches: result })
    }
});
});
   }
  
   const church_branch_create_get = async (req, res) => {
     const churchId = req.params.id;
     res.render('Churches/createBranch', {title: 'Create a New Church Branch', parentChurchId: churchId}); 
   }
  
   const church_createBranch_post = async (req, res) => {

    const connection = await pool.getConnection();
    try {
      
      const result = await churchDb._insert(connection, 
        req.body.parentChurchId,
        req.body.name,
        req.body.tagName,
        req.body.title,
        req.body.address1,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.founded,
        req.body.phone,
        req.body.email,
        req.body.motto,
        req.body.vision,   
        req.body.country,
        req.body.status,
        global.userId,
        Date.now()
        );
        res.redirect("/churches/" + req.body.parentChurchId);
    } catch(err){
      throw err;
    } finally {
      connection.release(); 
    }
      }
  

module.exports = {
    church_index,
    church_details,
    church_create_get,
    church_create_post,
    church_delete_get,
    church_delete,
    church_edit_get,
    church_edit,
    church_branch_create_get,
    church_createBranch_post,
    church_tagname_get
}
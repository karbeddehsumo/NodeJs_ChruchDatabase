const moment = require('moment');
const mysql = require('mysql');
const pool = mysql.createPool({
  host:  process.env.MYSQL_HOST,
  database: process.env.MYSQL_DBNAME,
  user:  process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
});


const church_index = async (req, res) => {
const churchId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('SELECT * FROM church WHERE status = ? AND parentChurchId = ?',['Active',0], (err, result) => { 
    connection.release();
      if(err){
        console.log('we have mysql error');
      }
      else
      {
          res.render('churches/index', { title: 'All churches', churches: result, churchId: churchId })
      }
  });
  });
}

const church_details = (req, res) => {
  const churchId = req.params.id;
  let branches;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT name, city, churchId FROM church WHERE parentChurchId = ? ',[churchId], (err, _branches) => {
      branches = _branches;
   });
    connection.query('SELECT * FROM church WHERE churchId = ?', [churchId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {  
          global.churchId = result[0].churchId;
          global.churchName = result[0].name;
        res.render("churches/details", { church: result[0], title: 'church Details', branches})
      }
  });
  });
}

const church_create_get = (req, res) => {
  const churchId = 0;
  res.render('churches/create', {title: 'Create a New church', churchId});
}

const church_create_post = async (req, res) => {
//const churchId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err; 
  connection.query('INSERT INTO church SET parentChurchId = ?, title = ?, name = ?, tagName = ?, founded = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, phone = ?, email = ?, vision = ?, motto = ?,  status = ?, enteredBy = ?, dateEntered = ?',
  [
    0,
  req.body.title,
  req.body.name,
  req.body.tagName,
  req.body.founded,
  req.body.address1,
  req.body.address2,
  req.body.city,
  req.body.state,
  req.body.zipcode,
  req.body.country,
  req.body.phone,
  req.body.email,
  req.body.vision,
  req.body.motto,
  req.body.status,
  global.userId,
  Date.now()
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("churches/" + result.insertId);
    }
});
});
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
const churchId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
   connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
    connection.query('SELECT * FROM church WHERE churchId = ?', [churchId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("churches/edit", { church: result[0], title: 'Edit church', status, moment})
      }
  });
  });
});
}

const church_edit = async (req, res) => {
const churchId = req.params.id;
pool.getConnection((err, connection) => {
if(err) throw err;
connection.query('UPDATE church SET parentChurchId = ?, title = ?, name = ?, tagName = ?, founded = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, phone = ?, email = ?, vision = ?, motto = ?,  status = ?, enteredBy = ?, dateEntered = ? WHERE churchID = ?',
[
  req.body.parentChurchId,
  req.body.title,
  req.body.name,
  req.body.tagName,
  req.body.founded,
  req.body.address1,
  req.body.address2,
  req.body.city,
  req.body.state,
  req.body.zipcode,
  req.body.country,
  req.body.phone,
  req.body.email,
  req.body.vision,
  req.body.motto,
  req.body.status,
  global.userId,
  Date.now(),
  churchId
],
(err, result) => {
  connection.release();
  if(err){
    console.log('we have mysql error');
    console.log(err);
  }
  else
  {
    res.redirect("/churches/" + req.body.churchId);
  }
});
});
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
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('INSERT INTO church SET parentChurchId = ?, title = ?, name = ?, tagName = ?, founded = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, phone = ?, email = ?, vision = ?, motto = ?,  status = ?, enteredBy = ?, dateEntered = ?',
      [
        req.body.parentChurchId,
        req.body.title,
        req.body.name,
        req.body.tagName,
        req.body.founded,
        req.body.address1,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.country,
        req.body.phone,
        req.body.email,
        req.body.vision,
        req.body.motto,
        req.body.status,
        global.userId,
        Date.now(),
        churchId
      ],
      (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.redirect("/churches/" + req.body.parentChurchId);
        }
    });
    });
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
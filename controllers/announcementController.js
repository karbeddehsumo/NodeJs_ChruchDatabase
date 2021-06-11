//app.get('*', checkUser); //put user values in res.locals
const moment = require('moment');
const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const announcement_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM announcement WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('announcements/index', { title: 'All announcements', announcements: result, churchId: churchId })
        }
    });
    });
}

const announcement_details = (req, res) => {
    const announcementId = req.params.id;
    console.log('Announcement details');
    console.log(announcementId);
     pool.getConnection((err, connection) => {
      if(err) throw err;
       connection.query('SELECT * FROM announcement WHERE announcementId = ?', [announcementId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("announcements/details", { announcement: result[0], title: 'Announcement Details', moment})
        }
    });
    });
}

const announcement_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
     connection.query('SELECT name FROM constant WHERE category = ? ',['Access'], (err, access) => {
      connection.query('SELECT * FROM ministry WHERE churchId = ?', [churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("announcements/create", { ministries: result, title: 'Add New Announcement', access: _access, churchId})
        }
    });
  });
});
}

const announcement_create_post = async (req, res) => {
  const announcementId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO announcement SET churchId = ?, title = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, startDate = ?, endDate = ?, message = ?, access = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.title,
      req.body.ministry1,
      req.body.ministry2,
      req.body.ministry3,
      req.body.startDate,
      req.body.endDate,
      req.body.message,
      req.body.access,
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
        res.redirect("announcements/church/" + req.body.churchId);
      }
  });
  });
}

const announcement_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const announcementId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM announcement WHERE announcementId = ?', [announcementId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/announcements/church/" + global.churchId);
    }
});
});
}


const announcement_delete_get = async (req, res) => {
  const announcementId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM announcement WHERE announcementId = ?', [announcementId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("announcements/delete", { announcement: result[0], title: 'Delete announcement'})
      }
  });
});
}

const announcement_edit_get = async (req, res) => {
  const announcementId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
       connection.query('SELECT name FROM ministry WHERE churchId = ? ',[global.churchId], (err, allMinistries) => {
     connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
      connection.query('SELECT name FROM constant WHERE category = ? ',['Access'], (err, access) => {
      connection.query('SELECT * FROM announcement WHERE announcementId = ?', [announcementId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("announcements/edit", { announcement: result[0], title: 'Edit announcement', status, access, ministries, moment})
        }
    });
    });
   });
    });
    });
  }

const announcement_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
  const announcementId = req.params.id;
  pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE announcement SET  title = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, startDate = ?, endDate = ?, message = ?, access = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE announcementID = ?',
  [
      req.body.title,
      req.body.ministry1,
      req.body.ministry2,
      req.body.ministry3,
      req.body.startDate,
      req.body.endDate,
      req.body.message,
      req.body.access,
      req.body.status,
      global.userId,
      new Date(),
      announcementId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/announcements/church/" + global.churchId);
    }
});
});
}

module.exports = {
    announcement_index,
    announcement_details,
    announcement_create_get,
    announcement_create_post,
    announcement_delete_get,
    announcement_delete,
    announcement_edit_get,
    announcement_edit
}



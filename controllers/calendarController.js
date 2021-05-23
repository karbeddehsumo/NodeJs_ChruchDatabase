//app.get('*', checkUser); //put user values in res.locals
const moment = require('moment');
const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const calendar_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM calendar WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('calendars/index', { title: 'All calendars', calendars: result, churchId: churchId })
        }
    });
    });
}

const calendar_details = (req, res) => {
    const calendarId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM calendar WHERE calendarId = ?', [calendarId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("calendars/details", { calendar: result[0], title: 'calendar Details'})
        }
    });
    });
}

const calendar_create_get = (req, res) => {
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
          res.render("calendars/create", { ministries: result, title: 'Add New Calendar', access: _access, venues: _venue, churchId})
        }
    });
  });
}

const calendar_create_post = async (req, res) => {
  const churchId = req.body.churchId;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO calendar SET churchId = ?, title = ?, startDate = ?, endDate = ?, description = ?, url = ?, venue = ?, access = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, status = ?, enteredBy = ?, dateEntered = ?',
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
        res.redirect("calendars/church/" + churchId);
      }
  });
  });
}

const calendar_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const calendarId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM calendar WHERE calendarId = ?', [calendarId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/calendars/church/" + global.churchId);
    }
});
});
}


const calendar_delete_get = async (req, res) => {
  const calendarId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM calendar WHERE calendarId = ?', [calendarId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("calendars/delete", { calendar: result[0], title: 'Delete calendar'})
      }
  });
});
}

const calendar_edit_get = async (req, res) => {
  const calendarId = req.params.id;
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
      connection.query('SELECT * FROM calendar WHERE calendarId = ?', [calendarId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          console.log('Inside calendar edit');
          console.log(_ministries);
          res.render("calendars/edit", { calendar: result[0], title: 'Edit calendar', status: _status, venues: _venue, access: _access, ministries: _ministries, moment})
        }
    });
    });
  }

const calendar_edit = async (req, res) => {
  const churchId = req.body.churchId;
 const calendarId = req.params.id;
 console.log('inside calendar edit');
 console.log(req.body);
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE calendar SET title = ?, startDate = ?, endDate = ?, description = ?, url = ?, venue = ?, access = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE calendarID = ?',
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
    calendarId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/calendars/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    calendar_index,
    calendar_details,
    calendar_create_get,
    calendar_create_post,
    calendar_delete_get,
    calendar_delete,
    calendar_edit_get,
    calendar_edit
}





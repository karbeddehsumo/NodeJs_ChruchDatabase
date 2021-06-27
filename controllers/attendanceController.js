//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const attendanceDb = require('../db/attendanceDb');
const calendarDb = require('../db/calendarDb');
const memberDb = require('../db/memberDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const attendance_index = async (req, res) => {
  const calendarId = req.params.id;
  const connection = await pool.getConnection();
   try {
     const result = await connection.query('SELECT m.lastName, m.firstName, m.middleName, c.title, c.startDate, a.roll FROM attendance AS a INNER JOIN calendar as c ON a.calendarId = c.calendarId INNER JOIN member AS m ON a.memberID = m.memberID WHERE a.calendarId = ?',[calendarId])
     res.render('attendances/index', { title: 'All attendances', attendances: result, churchId: churchId }); 
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err; 
    //   connection.query('SELECT m.lastName, m.firstName, m.middleName, c.title, c.startDate, a.roll FROM attendance AS a INNER JOIN calendar as c ON a.calendarId = c.calendarId INNER JOIN member AS m ON a.memberID = m.memberID WHERE a.calendarId = ?',[calendarId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //     }
    //     else
    //     {
    //         res.render('attendances/index', { title: 'All attendances', attendances: result, churchId: churchId })
    //     }
    // });
    // });
}

const attendance_details = async (req, res) => {
    const attendanceId = req.params.id;
    const connection = await pool.getConnection();
   try {
     const result = await attendanceDb.getById(connection, attendanceId);
     res.render("attendances/details", { attendance: result, title: 'attendance Details'});
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }
    // pool.getConnection((err, connection) => {
    //   if(err) throw err;
    //   connection.query('SELECT * FROM attendance WHERE attendanceId = ?', [attendanceId], (err, result) => {
    //     connection.release();
    //     if(err){
    //       console.log('we have mysql error');
    //       console.log(err);
    //     }
    //     else
    //     {
    //       res.render("attendances/details", { attendance: result[0], title: 'attendance Details'})
    //     }
    // });
    // });
}

const attendance_create_get = async (req, res) => {
    const calendarId = req.params.id;
    const connection = await pool.getConnection();
   try {
     const calendar = await calendarDb.getById(connection, calendarId);
     const memberList = await connection.query('SELECT * FROM member WHERE churchId = ? ORDER BY lastName, firstName, middleName',[global.churchId]);
     const attendees = await connection.query('SELECT m.lastName, m.firstName, m.middleName, c.title, c.startDate, a.roll, a.attendanceId FROM attendance AS a INNER JOIN calendar as c ON a.calendarId = c.calendarId INNER JOIN member AS m ON a.memberID = m.memberID WHERE a.calendarId = ?',[calendarId]);
     res.render('attendances/create', {title: 'Create a New attendance', churchId: global.churchId, calendar: calendar, memberList, attendees});
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }
  //   pool.getConnection((err, connection) => {
  //     if(err) throw err; 
  //     connection.query('SELECT * FROM calendar WHERE churchId = ? AND calendarId = ?',[global.churchId, calendarId], (err, calendar) => {
  //       connection.query('SELECT * FROM member WHERE churchId = ? ORDER BY lastName, firstName, middleName',[churchId], (err, memberList) => {
  //         connection.query('SELECT m.lastName, m.firstName, m.middleName, c.title, c.startDate, a.roll, a.attendanceId FROM attendance AS a INNER JOIN calendar as c ON a.calendarId = c.calendarId INNER JOIN member AS m ON a.memberID = m.memberID WHERE a.calendarId = ?',[calendarId], (err, attendees) => {
  //         connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //       }
  //       else
  //       {
  //         res.render('attendances/create', {title: 'Create a New attendance', churchId: global.churchId, calendar: calendar[0], memberList, attendees});
  //       }
  //   });
  //   });
  // });
  // });
    
}

const attendance_create_post = async (req, res) => {
  const attendanceId = req.params.id;
  let rollCall = 0;
  if (req.body.roll) rollCall = 1;
  const connection = await pool.getConnection();
  try {
    await attendanceDb._insert(connection, 
      req.body.churchId,
      req.body.calendarId,
      req.body.memberId,
      rollCall,
      global.userId,
      new Date()
      );
      res.redirect("attendances/church/" + req.body.churchId);
    } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
  // pool.getConnection((err, connection) => {
  //   if(err) throw err; 
  //   connection.query('INSERT INTO attendance SET churchId = ?, calendarId = ?, memberId = ?, roll = ?, enteredBy = ?, dateEntered = ?',
  //   [
  //     req.body.churchId,
  //     req.body.calendarId,
  //     req.body.memberId,
  //     rollCall,
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
  //       res.redirect("attendances/church/" + req.body.churchId);
  //     }
  // });
  // });
}

const attendance_delete = async (req, res) => {
 const attendanceId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM attendance WHERE attendanceId = ?', [attendanceId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/attendances/church/" + global.churchId);
    }
});
});
}


const attendance_delete_get = async (req, res) => {
  const attendanceId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM attendance WHERE attendanceId = ?', [attendanceId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("attendances/delete", { attendance: result[0], title: 'Delete attendance'})
      }
  });
});
}

const attendance_edit_get = async (req, res) => {
  const attendanceId = req.params.id;
  const connection = await pool.getConnection();
   try {
    const memberList = await connection.query('SELECT * FROM member WHERE churchId = ? ORDER BY lastName, firstName, middleName',[churchId]);
    const result = await connection.query('SELECT m.memberId, m.lastName, m.firstName, m.middleName, c.calendarId, c.title, c.startDate, a.roll, a.attendanceId FROM attendance AS a INNER JOIN calendar as c ON a.calendarId = c.calendarId INNER JOIN member AS m ON a.memberID = m.memberID WHERE a.attendanceId = ?',[attendanceId]);
    res.render("attendances/edit", { attendance: result, title: 'Edit attendance', memberList})
   } catch(err) {
    throw err;
   } finally {
     connection.release();
   }

  //   pool.getConnection((err, connection) => {
  //     if(err) throw err;
  //     connection.query('SELECT * FROM member WHERE churchId = ? ORDER BY lastName, firstName, middleName',[churchId], (err, memberList) => {
  //       connection.query('SELECT m.memberId, m.lastName, m.firstName, m.middleName, c.calendarId, c.title, c.startDate, a.roll, a.attendanceId FROM attendance AS a INNER JOIN calendar as c ON a.calendarId = c.calendarId INNER JOIN member AS m ON a.memberID = m.memberID WHERE a.attendanceId = ?',[attendanceId], (err, result) => {
  //       connection.release();
  //       if(err){
  //         console.log('we have mysql error');
  //         console.log(err);
  //       }
  //       else
  //       {
  //         res.render("attendances/edit", { attendance: result[0], title: 'Edit attendance', memberList})
  //       }
  //   });
  //   });
  // });
  }

const attendance_edit = async (req, res) => {
  let rollCall = 0;
  if (req.body.roll) rollCall = 1;
 const attendanceId = req.params.id;
 const connection = await pool.getConnection();
  try {
    await attendanceDb._update(connection, 
      req.body.calendarId,
      req.body.memberId,
      rollCall,
      global.userId,
      new Date(),
      attendanceId
      );
      res.redirect("/attendances/create/" + req.body.calendarId);
    } catch(err) {
   throw err;
  } finally {
    connection.release();
  }
// pool.getConnection((err, connection) => {
//   if(err) throw err;
//   connection.query('UPDATE attendance SET calendarId = ?, memberId = ?, roll = ?,  enteredBy = ?, dateEntered = ? WHERE attendanceID = ?',
//   [
//     req.body.calendarId,
//       req.body.memberId,
//       rollCall,
//       global.userId,
//       new Date(),
//     attendanceId
//   ],
//   (err, result) => {
//     connection.release();
//     if(err){
//       console.log('we have mysql error');
//       console.log(err);
//     }
//     else
//     {
//       res.redirect("/attendances/create/" + req.body.calendarId);
//     }
// });
// });
}

module.exports = {
    attendance_index,
    attendance_details,
    attendance_create_get,
    attendance_create_post,
    attendance_delete_get,
    attendance_delete,
    attendance_edit_get,
    attendance_edit
}




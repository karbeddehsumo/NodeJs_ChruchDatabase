//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const ministry_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM ministry WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('ministries/index', { title: 'All ministries', ministries: result, churchId })
        }
    });
    });
}

const ministry_details = (req, res) => {
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
          res.render("ministries/details", { ministry: result[0], title: 'ministry Details'})
        }
    });
    });
}

const ministry_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('ministries/create', {title: 'Create a New ministry', churchId});
}

const ministry_create_post = async (req, res) => {
  const ministryId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO ministry SET churchId = ?, parentMinistryId = ?, name = ?, description = ?, contact = ?, email = ?, phone = ?, missionStatement = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.parentMinistryId,
      req.body.name,
      req.body.description,
      req.body.contact,
      req.body.email,
      req.body.phone,
      req.body.missionStatement,
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
        res.redirect("ministries/church/" + ministryId);
      }
  });
  });
}

const ministry_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
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
    pool.getConnection((err, connection) => {
      let _status;
      let _allMinistries;
      if(err) throw err;
     connection.query('SELECT name FROM ministry WHERE churchId = ? ',[global.churchId], (err, allMinistries) => {
        _allMinistries = allMinistries;
      });
      connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
        _status = status;
      });
      connection.query('SELECT * FROM ministry WHERE ministryId = ?', [ministryId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          console.log("inside ministries");
          console.log(result);
          res.render("ministries/edit", { ministry: result[0], title: 'Edit ministry', status: _status, parentMinistries: _allMinistries})
        }
    });
    });
  }

const ministry_edit = async (req, res) => {
  console.log('Inside edit ministry edit');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const ministryId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE ministry SET parentMinistryId = ?, name = ?, description = ?, contact = ?, email = ?, phone = ?, missionStatement = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE ministryID = ?',
  [
      req.body.parentMinistryId,
      req.body.name,
      req.body.description,
      req.body.contact,
      req.body.email,
      req.body.phone,
      req.body.missionStatement,
      req.body.status,
      global.userId,
      Date.now(),
      ministryId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/ministries/church/" + req.body.churchId);
    }
});
});
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



// const Ministry = require('../models/ministry');
// const Church = require('../models/church');

// const ministry_index = async (req, res) => {
//     const churchId = req.params.id;
//     await Ministry.find({ church: churchId }).sort({ createdAt: -1 })
//     .then((result) => {
//       console.log('Here are the list of ministries');
//       console.log(result);
//       res.render('ministries/index', { title: 'All ministry', ministries: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const ministry_details = async (req, res) => {
//     const id = req.params.id;
//     await Ministry.findById(id)
//      .then((result) => {
//       res.render("ministries/details", { ministry: result, title: 'ministry Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'ministry not found'});
//     });
// }

// const ministry_create_get = (req, res) => {
//   const churchId = req.params.id;
//     res.render('ministries/create', {title: 'Create a New ministry', churchId});
// }

// const ministry_create_post = (req, res) => {
//   const ministry = new Ministry(req.body);
//   ministry.church = req.body.churchId;
//   ministry.enteredBy = global.userId;
//   ministry.save()
//   .then((result) => {
//     res.redirect("/ministries/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const ministry_delete = async (req, res) => {
//  const id = req.params.id;
//   await Ministry.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/ministries");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const ministry_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Ministry.findById(id)
//     .then(result => {
//       res.render('ministries/delete', {ministry: result, title: 'Delete ministry'});
//     })
//     .catch(err => console.log(err));
// }

// const ministry_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await Ministry.findById(id)
//     .then(result => {
//       res.render('ministries/edit', {ministry: result, title: 'Edit Ministry'});
//     })
//     .catch(err => console.log(err));
// }

// const ministry_edit = async (req, res) => {
// const id = req.params.id;
// const ministry = new Ministry(req.body);
// await Ministry.findById(id)
// .then(result => {
//   result.church = ministry.church;
//   result.parentMinistry = ministry.parentMinistry;
//   result.ministryName = ministry.ministryName;
//   result.description = ministry.description;

//   result.contact = ministry.contact;
//   result.email = ministry.email;
//   result.phone = ministry.phone;

//   result.missionStatement = ministry.missionStatement;

//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect("/ministries/church/" + req.body.churchId);
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     ministry_index,
//     ministry_details,
//     ministry_create_get,
//     ministry_create_post,
//     ministry_delete_get,
//     ministry_delete,
//     ministry_edit_get,
//     ministry_edit
// }
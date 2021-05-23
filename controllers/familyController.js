//app.get('*', checkUser); //put user values in res.locals
const moment = require('moment');
const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const family_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM family WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('families/index', { title: 'All families', families: result, churchId: churchId })
        }
    });
    });
}

const family_details = (req, res) => {
    const familyId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM family WHERE familyId = ?', [familyId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("families/details", { family: result[0], title: 'family Details'})
        }
    });
    });
}

const family_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render("families/create", { title: 'Add New family', churchId})
}

const family_create_post = async (req, res) => {
  const churchId = req.body.churchId;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO family SET churchId = ?, familyName = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.familyName,
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.country,
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
        res.redirect("families/church/" + churchId);
      }
  });
  });
}

const family_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const familyId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM family WHERE familyId = ?', [familyId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/families/church/" + global.churchId);
    }
});
});
}


const family_delete_get = async (req, res) => {
  const familyId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM family WHERE familyId = ?', [familyId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("families/delete", { family: result[0], title: 'Delete family'})
      }
  });
});
}

const family_edit_get = async (req, res) => {
  const familyId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM family WHERE familyId = ? AND churchId = ?', [familyId, global.churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("families/edit", { family: result[0], title: 'Edit family', familyId})
        }
    });
    });
  }

const family_edit = async (req, res) => {
  const churchId = req.body.churchId;
 const familyId = req.params.id;
 console.log('inside family edit');
 console.log(req.body);
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE family SET familyName = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, enteredBy = ?, dateEntered = ? WHERE familyID = ?',
  [
      req.body.familyName,
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.country,
      global.userId,
      new Date(),
    familyId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/families/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    family_index,
    family_details,
    family_create_get,
    family_create_post,
    family_delete_get,
    family_delete,
    family_edit_get,
    family_edit
}






// const Family = require('../models/family');

// const family_index = async (req, res) => {
//     const id = req.params.id;
//     await Family.find({ church: id }).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('families/index', { title: 'All families', families: result, church: id })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const family_details = async (req, res) => {
//     const id = req.params.id;
//     await Family.findById(id)
//      .then((result) => {
//       res.render("families/details", { family: result, title: 'family Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'family not found'});
//     });
// }

// const family_create_get = (req, res) => {
//     const churchId = req.params.id;
//     res.render('families/create', {title: 'Create a New family', churchId});
// }

// const family_create_post = async (req, res) => {
//   const family = new Family(req.body);
//   family.church = req.body.churchId;
//   family.enteredBy = global.userId;
//   family.familyMembers = [];

//   family.save()
//   .then((result) => {
//     res.redirect("/families/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const family_delete = async (req, res) => {
//  const id = req.params.id;
//  await Family.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/families");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }
// const family_delete_get = async (req, res) => {
//   const id = req.params.id;
//   await Family.findById(id)
//     .then(result => {
//       res.render('families/delete', {family: result, title: 'Delete family'});
//     })
//     .catch(err => console.log(err));
// }

// const family_edit_get = async (req, res) => {
//   const id = req.params.id;
//   await Family.findById(id)
//     .then(result => {
//       res.render('families/edit', {family: result, title: 'Edit family'});
//     })
//     .catch(err => console.log(err));
// }

// const family_edit = async (req, res) => {
// const id = req.params.id;
// const family = new Family(req.body);
// await Family.findById(id)
// .then(result => {
//   result.familyName = family.firstName;
//   result.familyPatriots = family.familyPatriots
//   result.address1 = family.address1;
//   result.address2 = family.address2;
//   result.city = family.city;
//   result.state = family.state;
//   result.zip = family.zip;
//   result.country = family.country;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/families');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     family_index,
//     family_details,
//     family_create_get,
//     family_create_post,
//     family_delete_get,
//     family_delete,
//     family_edit_get,
//     family_edit
// }
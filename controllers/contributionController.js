//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const contribution_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM contribution WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('contributions/index', { title: 'All contributions', contributions: result, churchId: churchId })
        }
    });
    });
}

const contribution_details = (req, res) => {
    const contributionId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("contributions/details", { contribution: result[0], title: 'contribution Details'})
        }
    });
    });
}

const contribution_create_get = (req, res) => {
    const churchId = req.params.id;
    res.render('contributions/create', {title: 'Create a New contribution', churchId});
}

const contribution_create_post = async (req, res) => {
  const contributionId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO contribution SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
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
    ],
    (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.redirect("contributions/church/" + req.body.churchId);
      }
  });
  });
}

const contribution_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const contributionId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/contributions/church/" + global.churchId);
    }
});
});
}


const contribution_delete_get = async (req, res) => {
  const contributionId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("contributions/delete", { contribution: result[0], title: 'Delete contribution'})
      }
  });
});
}

const contribution_edit_get = async (req, res) => {
  const contributionId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      if(err) throw err;
     connection.query('SELECT name FROM contribution WHERE category = ? ',['Status'], (err, status) => {
          _status = status;
      });
      connection.query('SELECT * FROM contribution WHERE contributionId = ?', [contributionId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("contributions/edit", { contribution: result[0], title: 'Edit contribution', status: _status})
        }
    });
    });
  }

const contribution_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const contributionId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE contribution SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE contributionID = ?',
  [
    req.body.churchId,
    req.body.category,
    req.body.name,
    req.body.value1,
    req.body.value2,
    req.body.value3,
    req.body.sort,
    req.body.status,
    global.userId,
    Date.now(),
    contributionId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/contributions/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    contribution_index,
    contribution_details,
    contribution_create_get,
    contribution_create_post,
    contribution_delete_get,
    contribution_delete,
    contribution_edit_get,
    contribution_edit
}

// const contribution = require('../models/contribution');
// const contribution = require('../models/contribution');
// const Member = require('../models/member');
// const Church = require('../models/church');
// const moment = require('moment');

// //app.get('*', checkUser); //put user values in res.locals
// const contribution_index = async (req, res) => {
//      const id = req.params.id;
//      const members = await Member.find({ church: id});
//      const contributionTypes = await contribution.find({church: global.churchId, category: 'contribution type'},'_id category name value1').sort({ name: -1 });

//     await contribution.find({ church: id}).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('contributions/index', { title: 'All contributions', contributions: result, members, contributionTypes })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const contribution_details = (req, res) => {
//     const id = req.params.id;
//     contribution.findById(id)
//      .then((result) => {
//       res.render("contributions/details", { contribution: result, title: 'contribution Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'contribution not found'});
//     });
// }

// const contribution_create_get = async (req, res) => {
//     const memberId = req.params.id;
//     const contributionTypes = await contribution.find( {category: "Member contribution"} );
//     res.render('contributions/create', {title: 'Add contribution', contributionTypes, memberId});
// }


// const contribution_create_post = async (req, res) => {
//   console.log('contribution data');
//   console.log(req.body);

//   const memberId = req.body.memberId;
//   const member = await Member.findById(memberId);
//   const contribution = new contribution(req.body);
//   contribution.enteredBy = global.userId;
//   contribution.church = member.church;

//   contribution.status = "Active";
//   contribution.save()
//   .then((result) => {
//     res.redirect("/contributions/create/" + member._Id);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const contribution_delete = (req, res) => {
//  const id = req.params.id;
//  contribution.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/contributions");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }
// const contribution_delete_get = async (req, res) => {
//   const id = req.params.id;
//   await contribution.findById(id)
//     .then(result => {
//       res.render('contributions/delete', {contribution: result, title: 'Delete contribution'});
//     })
//     .catch(err => console.log(err));
// }

// const contribution_edit_get = async (req, res) => {
//   const id = req.params.id;
//   await contribution.findById(id)
//     .then(result => {
//       res.render('contributions/edit', {contribution: result, title: 'Edit contribution', moment});
//     })
//     .catch(err => console.log(err));
// }

// const contribution_edit = async (req, res) => {
// const id = req.params.id;
// const contribution = new contribution(req.body);
// console.log(contribution);
// await contribution.findById(id)
// .then(result => {
//   result.category = contribution.category;
//   result.name = contribution.name;
//   result.value1 = contribution.value1;
//   result.value2 = contribution.value2;
//   result.value3 = contribution.value3;
//   result.sort = contribution.sort;
//   result.status = contribution.status;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/contributions');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     contribution_index,
//     contribution_details,
//     contribution_create_get,
//     contribution_create_post,
//     contribution_delete_get,
//     contribution_delete,
//     contribution_edit_get,
//     contribution_edit
// }
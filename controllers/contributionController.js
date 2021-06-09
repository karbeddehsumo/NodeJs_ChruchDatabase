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
      connection.query('SELECT * FROM member WHERE churchId = ? AND status = ?',[churchId, 'Active'], (err, result) => {
        connection.query('SELECT c.contributionId, c.amount, c.contributionDate, t.name AS fundType, m.lastName, m.firstName, m.middleName, m.memberId  FROM contribution AS c INNER JOIN member AS m ON c.memberId = m.memberId INNER JOIN constant AS t ON c.typeId = t.constantId WHERE c.churchId = ?',[global.churchId], (err, contributionList) => {       
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('contributions/index', { title: 'All contributions', members: result, churchId: churchId, contributionList })
        }
    });
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
    const memberId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, contributionTypes) => {
         connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('contributions/create', { title: 'Create a New contribution', contributionTypes, churchId: global.churchId, memberId })
        }
    });
  });
}

const contribution_create_post = async (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO contribution SET churchId = ?, memberId = ?, amount = ?, typeId = ?, checkNumber = ?, contributionDate = ?, comment = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.memberId,
      req.body.amount,
      req.body.typeId,
      req.body.checkNumber,
      req.body.contributionDate,
      req.body.comment,
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
      if(err) throw err;
     connection.query('SELECT * FROM contribution WHERE contributionId = ? ',[contributionId], (err, result) => {
      connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, contributionTypes) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("contributions/edit", { contribution: result[0], title: 'Edit contribution', contributionTypes})
        }
    });
    });
  });
  }

const contribution_edit = async (req, res) => {
 const contributionId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE contribution SET memberId = ?, amount = ?, typeId = ?, checkNumber = ?, contributionDate = ?, comment = ?, enteredBy = ?, dateEntered = ? WHERE contributionID = ?',
  [
      req.body.memberId,
      req.body.amount,
      req.body.typeId,
      req.body.checkNumber,
      req.body.contributionDate,
      req.body.comment,
      global.userId,
      new Date(),
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
//app.get('*', checkUser); //put user values in res.locals
const moment = require('moment');
const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const member_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM member WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('members/index', { title: 'All members', members: result, churchId: churchId })
        }
    });
    });
}

const member_details = (req, res) => {
    const memberId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM member WHERE memberId = ?', [memberId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("members/details", { member: result[0], title: 'member Details'})
        }
    });
    });
}

const member_create_get = (req, res) => {
    const familyId = req.params.id;
    pool.getConnection((err, connection) => {
      let _churchTitles;
      let _contactTypes;
      if(err) throw err;
     connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Church Title'], (err, churchTitles) => {
          _churchTitles = churchTitles;
      });
      connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Contact Type'], (err, contactTypes) => {
        _contactTypes = contactTypes;
    });
      connection.query('SELECT familyName FROM family WHERE familyId = ?', [familyId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("members/create", { familyName: result[0].familyName, churchTitles: _churchTitles, contactTypes: _contactTypes, familyId, churchId: global.churchId})
        }
    });
  });
}

const member_create_post = async (req, res) => {
  const churchId = req.body.churchId;
  console.log('Inside member create');
  console.log(req.body);
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO member SET churchId = ?, familyId = ?, firstName = ?, lastName = ?, middleName = ?, dob = ?, gender = ?, phone = ?, email = ?, membershipDate = ?, title = ?, contactType = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.familyId,
      req.body.firstName,
      req.body.lastName,
      req.body.middleName,
      req.body.dob,
      req.body.gender,
      req.body.phone,
      req.body.email,
      req.body.membershipDate,
      req.body.title,
      req.body.contactType,
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
        res.redirect("families/church/" + req.body.churchId);
      }
  });
  });
}

const member_delete = async (req, res) => {
  console.log('Inside delete');
  console.log(req.params.id);
 const memberId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM member WHERE memberId = ?', [memberId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/members/church/" + global.churchId);
    }
});
});
}


const member_delete_get = async (req, res) => {
  const memberId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM member WHERE memberId = ?', [memberId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("members/delete", { member: result[0], title: 'Delete member'})
      }
  });
});
}

const member_edit_get = async (req, res) => {
  const memberId = req.params.id;
    pool.getConnection((err, connection) => {
      let _churchTitles;
      let _contactTypes;
      let _status;
      if(err) throw err;
      connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Status'], (err, status) => {
        _status = status;
    });
     connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Church Title'], (err, churchTitles) => {
          _churchTitles = churchTitles;
      });
      connection.query('SELECT name, constantId FROM constant WHERE category = ? ',['Contact Type'], (err, contactTypes) => {
        _contactTypes = contactTypes;
    });
      connection.query('SELECT * FROM member WHERE memberId = ?', [memberId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("members/edit", { member: result[0], title: 'Edit member', status: _status, churchTitles: _churchTitles, contactTypes: _contactTypes, churchId: global.churchId, moment})
        }
    });
    });
  }

const member_edit = async (req, res) => {
  const churchId = req.body.churchId;
 const memberId = req.params.id;
 console.log('inside member edit');
 console.log(req.body);
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE member SET familyId = ?, firstName = ?, lastName = ?, middleName = ?, dob = ?, gender = ?, phone = ?, email = ?, membershipDate = ?, title = ?, contactType = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE memberID = ?',
  [
    req.body.familyId,
    req.body.firstName,
    req.body.lastName,
    req.body.middleName,
    req.body.dob,
    req.body.gender,
    req.body.phone,
    req.body.email,
    req.body.membershipDate,
    req.body.title,
    req.body.contactType,
    req.body.status,
    global.userId,
    new Date(),
    memberId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/members/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    member_index,
    member_details,
    member_create_get,
    member_create_post,
    member_delete_get,
    member_delete,
    member_edit_get,
    member_edit
}






// const Member = require('../models/member');
// const Constant = require('../models/constant');
// const Family = require('../models/family');
// const Church = require('../models/church');

// const member_index = async (req, res) => {
//   const id = req.params.id;  
//   await Member.find({ church: id }).sort({ createdAt: -1 })
//     .populate('church', '_id name')
//     .then((result) => {
//       res.render('members/index', { title: 'All members', members: result, churchId: id })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const member_details =  async(req, res) => {
//     const id = req.params.id;
//     await Member.findById(id)
//      .then((result) => {
//       res.render("members/details", { member: result, title: 'member Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'member not found'});
//     });
// }

// const member_create_get = async (req, res) => {
//     const familyId = req.params.id;
//     const family = await Family.findById(familyId);
//     const subTitle = 'Add a member to ' + family.familyName +  ' Family (' + family.familyPatriots + ')';
//     const churchTitles = await Constant.find( {category: "Church Title" } );
//     const contactTypes = await Constant.find( {category: "Member Contact Type"} );
//     res.render('members/create', {title: 'Create a New member', familyId, churchTitles, contactTypes, subTitle});
// }

// const member_create_post = async (req, res) => {
//   const member = new Member(req.body);
//   const family = await Family.findById(req.body.familyId);
//   member.family = req.body.familyId;
//   member.church = family.church;
//   member.enteredBy = global.userId;
//   member.save()
//   .then((result) => {
//     family.familyMembers.push(member._id);
//     family.save();
//     res.redirect("/members/church/" + family.church);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const member_delete = async (req, res) => {
//  const id = req.params.id;
//   await Member.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/members");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }
// const member_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Member.findById(id)
//     .then(result => {
//       res.render('members/delete', {member: result, title: 'Delete member'});
//     })
//     .catch(err => console.log(err));
// }

// const member_edit_get = async (req, res) => {
//   const id = req.params.id;
//   const churchTitles = await Constant.find( {category: "Church Title" } );
//   const contactTypes = await Constant.find( {category: "Member Contact Type"} );
//     Member.findById(id)
//     .then(result => {
//       res.render('members/edit', {member: result, title: 'Edit member', churchTitles, contactTypes});
//     })
//     .catch(err => console.log(err));
// }

// const member_edit = async (req, res) => {
// const id = req.params.id;
// const member = new Member(req.body);
// await Member.findById(id)
// .then(result => {
//   result.familyId = member.familyId;
//   result.statusId = member.statusId;
//   result.firstName = member.firstName;
//   result.lastName = member.lastName;
//   result.middleName = member.middleName;
//   result.dob = member.dob;
//   result.gender = member.gender;
//   result.phone = member.phone;
//   result.email = member.email;
//   result.membershipDate = member.membershipDate;
//   result.title = member.title;
//   result.contactType = member.contactType;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/members');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     member_index,
//     member_details,
//     member_create_get,
//     member_create_post,
//     member_delete_get,
//     member_delete,
//     member_edit_get,
//     member_edit
// }
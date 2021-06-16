//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const pledge_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT p.pledgeId, p.amount, p.year, m.firstName, m.lastName, m.middleName, c.name AS frequency, t.name as fund FROM pledge AS p INNER JOIN member AS m ON p.memberId = m.memberId INNER JOIN constant as c ON p.frequencyId = c.constantId INNER JOIN constant AS t ON p.fundId = t.constantId WHERE p.churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('pledges/index', { title: 'All pledges', pledges: result, churchId })
        }
    });
    });
}

const pledge_details = (req, res) => {
    const pledgeId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM pledge WHERE pledgeId = ?', [pledgeId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("pledges/details", { pledge: result[0], title: 'pledge Details'})
        }
    });
    });
}

const pledge_create_get = (req, res) => {
    const churchId = req.params.id;
    let year = new Date().getFullYear();
    var pledgeYear = [year-1,year,year+1]
        pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM member WHERE churchId = ? AND status = ?',[global.churchId,'Active'], (err, members) => {
      connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, funds) => {
      connection.query('SELECT * FROM constant WHERE category = ?',[ 'Pledge Frequency'], (err, frequencies) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('pledges/create', {title: 'Create a New pledge', churchId, members, frequencies, funds, pledgeYear});
        }
    });
    });
    });
    });
}

const pledge_create_post = async (req, res) => {
  const pledgeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO pledge SET churchId = ?, memberId = ?, fundId = ?, amount = ?, year = ?, frequencyId = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.memberId,
      req.body.fundId,
      req.body.amount,
      req.body.year,
      req.body.frequencyId,
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
        res.redirect("pledges/church/" + req.body.churchId);
      }
  });
  });
}

const pledge_delete = async (req, res) => {
 const pledgeId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM pledge WHERE pledgeId = ?', [pledgeId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/pledges/church/" + global.churchId);
    }
});
});
}


const pledge_delete_get = async (req, res) => {
  const pledgeId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM pledge WHERE pledgeId = ?', [pledgeId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("pledges/delete", { pledge: result[0], title: 'Delete pledge'})
      }
  });
});
}

const pledge_edit_get = async (req, res) => {
  const pledgeId = req.params.id;
     let year = new Date().getFullYear();
    var pledgeYear = [year-1,year,year+1]
        pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM pledge WHERE churchId = ? AND pledgeId = ?',[global.churchId, pledgeId], (err, result) => {
      connection.query('SELECT * FROM member WHERE churchId = ? AND status = ?',[global.churchId,'Active'], (err, members) => {
      connection.query('SELECT * FROM constant WHERE churchId = ? AND category = ?',[global.churchId, 'Member Contribution Type'], (err, funds) => {
      connection.query('SELECT * FROM constant WHERE category = ?',[ 'Pledge Frequency'], (err, frequencies) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('pledges/edit', {pledge: result[0], churchId, members, frequencies, funds, pledgeYear});
        }
    });
    });
    });
    });
    });
  }

const pledge_edit = async (req, res) => {
 const pledgeId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE pledge SET memberId = ?, fundId = ?, amount = ?, year = ?, frequencyId = ?, enteredBy = ?, dateEntered = ? WHERE pledgeID = ?',
  [
    req.body.memberId,
    req.body.fundId,
    req.body.amount,
    req.body.year,
    req.body.frequencyId,
    global.userId,
    new Date(),
    pledgeId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/pledges/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    pledge_index,
    pledge_details,
    pledge_create_get,
    pledge_create_post,
    pledge_delete_get,
    pledge_delete,
    pledge_edit_get,
    pledge_edit
}





// const Pledge = require('../models/pledge');
// const Church = require('../models/church');
// const Member = require('../models/member');
// const Fund = require('../models/fund');
// const pledge = require('../models/pledge');

// const pledge_index = async (req, res) => {
//     const churchId = req.params.id;
//     await Pledge.find({ church: churchId }).sort({ createdAt: -1 })
//     .populate('member','firstName lastName _id')
//     .populate('fund','name _id')
//     .then((result) => {
//       res.render('pledges/index', { title: 'All pledge', pledges: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const pledge_details = async (req, res) => {
//     const id = req.params.id;
//     await Pledge.findById(id)
//     .populate('member','firstName lastName _id')
//     .populate('fund','name _id')
//      .then((result) => {
//       res.render("pledges/details", { pledge: result, title: 'pledge Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'pledge not found'});
//     });
// }

// const pledge_create_get = async (req, res) => {
//   const churchId = req.params.id;
//   let year = new Date().getFullYear();
//   var pledgeYear = [year-1,year,year+1]
//   const members = await Member.find({church: churchId},'_id firstName lastName').sort({ sort: -1 });
//   const frequencies = await pledge.find({church: churchId, category: 'Payee Frequency'},'_id category name value1').sort({ sort: -1 });
//   const funds = await Fund.find({church: churchId},'_id name').sort({ name: 1 });

//     res.render('pledges/create', {title: 'Create a New pledge', churchId, members, frequencies, funds, pledgeYear});
// }

// const pledge_create_post = (req, res) => {
//   const pledge = new Pledge(req.body);
//   pledge.church = req.body.churchId;
//   pledge.enteredBy = global.userId;
//   pledge.save()
//   .then((result) => {
//     res.redirect("/pledges/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const pledge_delete = async (req, res) => {
//  const id = req.params.id;
//   await Pledge.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/pledge");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const pledge_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Pledge.findById(id)
//     .then(result => {
//       res.render('pledge/delete', {pledge: result, title: 'Delete pledge'});
//     })
//     .catch(err => console.log(err));
// }

// const pledge_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await Pledge.findById(id)
//     .then(result => {
//       res.render('pledge/edit', {pledge: result, title: 'Edit pledge'});
//     })
//     .catch(err => console.log(err));
// }

// const pledge_edit = async (req, res) => {
// const id = req.params.id;
// const pledge = new Pledge(req.body);
// await Pledge.findById(id)
// .then(result => {
//   result.church = pledge.church;
//   result.member = pledge.member;
//   result.frequency = pledge.frequency;
//   result.amount = pledge.amount;
//   result.year = pledge.year;
//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/pledge');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     pledge_index,
//     pledge_details,
//     pledge_create_get,
//     pledge_create_post,
//     pledge_delete_get,
//     pledge_delete,
//     pledge_edit_get,
//     pledge_edit
// }
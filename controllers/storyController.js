//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql2/promise');
const constantDb = require('../db/constantDb');
const storyDb = require('../db/storyDb');

  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const story_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM story WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('stories/index', { title: 'All stories', stories: result, churchId: churchId })
        }
    });
    });
}

const story_details = (req, res) => {
    const storyId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM story WHERE storyId = ?', [storyId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("stories/details", { story: result[0], title: 'story Details'})
        }
    });
    });
}

const story_create_get_for_ministry = (req, res) => {
  const ministryId = req.params.id;
  const churchId = global.churchId;
  res.render('stories/createForMinistry', {title: 'Create a New story', churchId, ministryId});
}
const story_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM ministry WHERE churchId = ? AND status = ?', [churchId, 'Active'], (err, ministries) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
          res.render('stories/create', {title: 'Create a New story', churchId, ministries});
        }
    });
    });   
}

const story_create_post = async (req, res) => {
  const storyId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO story SET churchId = ?, ministryId = ?, title = ?, subTitle = ?, intro = ?, story = ?, publishedStartDate = ?, publishedEndDate = ?, author = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.ministryId,
      req.body.title,
      req.body.subTitle,
      req.body.intro,
      req.body.story,
      req.body.publishedStartDate,
      req.body.publishedEndDate,
      req.body.author,
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
        res.redirect("stories/church/" + req.body.churchId);
      }
  });
  });
}

const story_delete = async (req, res) => {
 const storyId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM story WHERE storyId = ?', [storyId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/stories/church/" + global.churchId);
    }
});
});
}


const story_delete_get = async (req, res) => {
  const storyId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM story WHERE storyId = ?', [storyId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("stories/delete", { story: result[0], title: 'Delete story'})
      }
  });
});
}

const story_edit_get = async (req, res) => {
  const storyId = req.params.id;
    pool.getConnection((err, connection) => {
      let _status;
      if(err) throw err;
     connection.query('SELECT name FROM constant WHERE category = ? ',['Status'], (err, status) => {
      connection.query('SELECT * FROM ministry WHERE churchId = ? AND status = ?', [global.churchId, 'Active'], (err, ministries) => {
      connection.query('SELECT * FROM story WHERE churchId = ? AND storyId = ?', [global.churchId, storyId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("stories/edit", { story: result[0], title: 'Edit story', status, ministries})
        }
    });
    });
  });
});
  }

const story_edit = async (req, res) => {
 const storyId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE story SET ministryId = ?, title = ?, subTitle = ?, intro = ?, story = ?, publishedStartDate = ?, publishedEndDate = ?, author = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE storyID = ?',
  [
    req.body.ministryId,
    req.body.title,
    req.body.subTitle,
    req.body.intro,
    req.body.story,
    req.body.publishedStartDate,
    req.body.publishedEndDate,
    req.body.author,
    req.body.status,
    global.userId,
    new Date(),
    storyId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/stories/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    story_index,
    story_details,
    story_create_get,
    story_create_post,
    story_delete_get,
    story_create_get_for_ministry,
    story_delete,
    story_edit_get,
    story_edit
}

// const Story = require('../models/story');
// const Church = require('../models/church');
// const Ministry = require('../models/ministry');

// const story_index = async (req, res) => {
//     const churchId = req.params.id;  
//      await Story.find({ church: churchId }).sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('stories/index', { title: 'All story', stories: result, churchId })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// const story_details = async (req, res) => {
//     const id = req.params.id;
//     await Story.findById(id)
//      .then((result) => {
//       res.render("stories/details", { story: result, title: 'story Details'})
//     })
//     .catch((err) => {
//       res.status(404).render('404', {title: 'story not found'});
//     });
// }

// const story_create_get = async (req, res) => {
//   const churchId = req.params.id;
//   const ministries = await Ministry.find({church: churchId},'_id name').sort({ name: 1 });
//     res.render('stories/create', {title: 'Create a New story', churchId, ministries});
// }

// const story_create_post = (req, res) => {
//   const story = new Story(req.body);
//   story.church = req.body.churchId;
//   story.enteredBy = global.userId;
//   story.save()
//   .then((result) => {
//     res.redirect("/stories/church/" + req.body.churchId);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const story_delete = async (req, res) => {
//  const id = req.params.id;
//   await Story.findByIdAndDelete(id)
//   .then((result) => {
//     res.redirect("/stories");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

// const story_delete_get = async (req, res) => {
//   const id = req.params.id;
//     await Story.findById(id)
//     .then(result => {
//       res.render('stories/delete', {story: result, title: 'Delete story'});
//     })
//     .catch(err => console.log(err));
// }

// const story_edit_get = async (req, res) => {
//   const id = req.params.id;
//     await Story.findById(id)
//     .then(result => {
//       res.render('stories/edit', {story: result, title: 'Edit story'});
//     })
//     .catch(err => console.log(err));
// }

// const story_edit = async (req, res) => {
// const id = req.params.id;
// const story = new Story(req.body);
// await Story.findById(id)
// .then(result => {
//   result.church = story.church;
//   result.ministry = story.ministry;
//   result.title = story.title;
//   result.subTitle = story.subTitle;

//   result.intro = story.intro;
//   result.story = story.story;
//   result.publishStartDate = story.publishStartDate;

//   result.publishEndDate = story.publishEndDate;
//   result.author = story.author;
//   result.picture = story.picture;
//   result.status = story.status;

//   result.enteredBy = global.userId;
//   result.save();
//   res.redirect('/stories');
// })
// .catch(err => console.log(err));
  
// }

// module.exports = {
//     story_index,
//     story_details,
//     story_create_get,
//     story_create_post,
//     story_delete_get,
//     story_delete,
//     story_edit_get,
//     story_edit
// }
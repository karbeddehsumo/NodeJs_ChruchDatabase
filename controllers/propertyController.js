
//app.get('*', checkUser); //put user values in res.locals

const mysql = require('mysql');
  const pool = mysql.createPool({
    host:  process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user:  process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  });


const property_index = async (req, res) => {
  const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM property WHERE churchId = ?',[churchId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
            res.render('properties/index', { title: 'All properties', properties: result, churchId: churchId })
        }
    });
    });
}

const property_details = (req, res) => {
    const propertyId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM property WHERE propertyId = ?', [propertyId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("properties/details", { property: result[0], title: 'property Details'})
        }
    });
    });
}

const property_create_get = (req, res) => {
    const churchId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err; 
      connection.query('SELECT * FROM constant WHERE category = ?',['Property Condition'], (err, conditions) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
        }
        else
        {
          res.render('properties/create', {title: 'Create a New property', churchId, conditions});
        }
    });
    });
    
}

const property_create_post = async (req, res) => {
  const propertyId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err; 
    connection.query('INSERT INTO property SET churchId = ?, pictureId = ?, title = ?, purchaseDate = ?, value = ?, quantity = ?, description = ?, location = ?, assignedTo = ?, assignedDate = ?, conditionType = ?, tagNumber = ?, lastInventoryDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?',
    [
      req.body.churchId,
      req.body.pictureId,
      req.body.title,
      req.body.purchaseDate,
      req.body.value,
      req.body.quantity,
      req.body.description,
      req.body.location,
      req.body.assignedTo,
      req.body.assignedDate,
      req.body.conditionType,
      req.body.tagNumber,
      req.body.lastInventoryDate,
      req.body.comment,
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
        res.redirect("properties/church/" + req.body.churchId);
      }
  });
  });
}

const property_delete = async (req, res) => {
 const propertyId = req.params.id;
 pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('DELETE FROM property WHERE propertyId = ?', [propertyId], (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/properties/church/" + global.churchId);
    }
});
});
}


const property_delete_get = async (req, res) => {
  const propertyId = req.params.id;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query('SELECT * FROM property WHERE propertyId = ?', [propertyId], (err, result) => {
      connection.release();
      if(err){
        console.log('we have mysql error');
        console.log(err);
      }
      else
      {
        res.render("properties/delete", { property: result[0], title: 'Delete property'})
      }
  });
});
}

const property_edit_get = async (req, res) => {
  const propertyId = req.params.id;
    pool.getConnection((err, connection) => {
      if(err) throw err;
     connection.query('SELECT constantId, name FROM constant WHERE category = ? ',['Status'], (err, status) => {
      connection.query('SELECT constantId, name FROM constant WHERE category = ? ',['Property Condition'], (err, conditions) => {
      connection.query('SELECT * FROM property WHERE churchId = ? AND propertyId = ?', [global.churchId, propertyId], (err, result) => {
        connection.release();
        if(err){
          console.log('we have mysql error');
          console.log(err);
        }
        else
        {
          res.render("properties/edit", { property: result[0], title: 'Edit property', status, conditions})
        }
    });
    });
  });
  });
  }

const property_edit = async (req, res) => {
  console.log('Inside edit constatn');
  console.log(req.body);
  console.log('params');
  console.log(req.params.id);
 const propertyId = req.params.id;
pool.getConnection((err, connection) => {
  if(err) throw err;
  connection.query('UPDATE property SET pictureId = ?, title = ?, purchaseDate = ?, value = ?, quantity = ?, description = ?, location = ?, assignedTo = ?, assignedDate = ?, conditionType = ?, tagNumber = ?, lastInventoryDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE propertyID = ?',
  [
    req.body.pictureId,
    req.body.title,
    req.body.purchaseDate,
    req.body.value,
    req.body.quantity,
    req.body.description,
    req.body.location,
    req.body.assignedTo,
    req.body.assignedDate,
    req.body.conditionType,
    req.body.tagNumber,
    req.body.lastInventoryDate,
    req.body.comment,
    req.body.status,
    global.userId,
    new Date(),
    propertyId
  ],
  (err, result) => {
    connection.release();
    if(err){
      console.log('we have mysql error');
      console.log(err);
    }
    else
    {
      res.redirect("/properties/church/" + req.body.churchId);
    }
});
});
}

module.exports = {
    property_index,
    property_details,
    property_create_get,
    property_create_post,
    property_delete_get,
    property_delete,
    property_edit_get,
    property_edit
}


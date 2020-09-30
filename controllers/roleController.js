const Role = require('../models/role');
const User = require('../models/user');
const Constant = require('../models/constant');

const role_index = (req, res) => {
    Role.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('roles/index', { title: 'All roles', roles: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const role_details = (req, res) => {
    const id = req.params.id;
    Role.findById(id)
     .then((result) => {
      res.render("roles/details", { role: result, title: 'role Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'role not found'});
    });
}

const role_create_get = async (req, res) => {
    const users = await User.find();
    const roleTypes = await Constant.find( {category: "Role" } );
    res.render('roles/create', {title: 'Create a New role', users, roleTypes});
}

const role_create_post = (req, res) => {
  const role = new Role(req.body);
  console.log('Here is the role data');
  console.log(role);
  role.save()
  .then((result) => {
    res.redirect("/roles");
  })
  .catch((err) => {
    console.log(err);
  });
}

const role_delete = (req, res) => {
 const id = req.params.id;
 Role.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/roles");
  })
  .catch((err) => {
    console.log(err);
  });
}
const role_delete_get = (req, res) => {
  const id = req.params.id;
  Role.findById(id)
    .then(result => {
      res.render('roles/delete', {role: result, title: 'Delete role'});
    })
    .catch(err => console.log(err));
}

const role_edit_get = (req, res) => {
  const id = req.params.id;
    Role.findById(id)
    .then(result => {
      res.render('roles/edit', {role: result, title: 'Edit role'});
    })
    .catch(err => console.log(err));
}

const role_edit = async (req, res) => {
const id = req.params.id;
const role = new Role(req.body);
Role.findById(id)
.then(result => {
  result.userId = role.userId;
  result.roleId = role.roleId;
  result.save();
  res.redirect('/roles');
})
.catch(err => console.log(err));
  
}

module.exports = {
    role_index,
    role_details,
    role_create_get,
    role_create_post,
    role_delete_get,
    role_delete,
    role_edit_get,
    role_edit
}
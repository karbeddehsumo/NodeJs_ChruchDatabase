const Role = require('../models/user'); //User model
const Constant = require('../models/constant');

const role_index = async (req, res) => {
    await Role.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('roles/index', { title: 'All roles', roles: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const role_details = async (req, res) => {
    const id = req.params.id;
    await Role.findById(id)
     .then((result) => {
      res.render("roles/details", { role: result, title: 'role Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'role not found'});
    });
}

const role_create_get = async (req, res) => {
    const user = await Role.findById({_id: req.params.id});
    const roleTypes = await Constant.find( {category: "Role" } );
    res.render('roles/create', {title: 'Create a New role', user, roleTypes});
}

const role_create_post = async (req, res) => {
  const userId = req.body.id;
  const roleName = req.body.roleName;
  const user = await Role.findById({_id: req.body.id});
  //const count = user.roles.length + 1;
  user.roles[0] = roleName;
  //user.roles.push(roleName);
  await user.save()
  .then((result) => {
    res.redirect("/roles");
  })
  .catch((err) => {
    console.log(err);
  });
}

const role_delete = async (req, res) => {
 const id = req.params.id;
 await Role.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/roles");
  })
  .catch((err) => {
    console.log(err);
  });
}
const role_delete_get = async (req, res) => {
  const id = req.params.id;
  await Role.findById(id)
    .then(result => {
      res.render('roles/delete', {role: result, title: 'Delete role'});
    })
    .catch(err => console.log(err));
}

const role_edit_get = async (req, res) => {
    const user = await Role.findById({_id: req.params.id});
    const roleTypes = await Constant.find( {category: "Role" } );
    res.render('roles/edit', {title: 'Create a New role', user, roleTypes});
}

const role_edit = async (req, res) => {
const id = req.params.id;
console.log(id);
console.log(req.body.roleName);
const roleName = req.body.roleName;

await Role.findById(id)
.then(result => {
  result.userId = id;
  result.roles.push(roleName);
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
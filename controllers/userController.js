const User = require('../models/user');

const user_index = async (req, res) => {
    const id = req.params.id;
    await User.find({ church: id }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('users/index', { title: 'All users', users: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const user_details = async (req, res) => {
    const id = req.params.id;
    await User.findById(id)
     .then((result) => {
      res.render("users/details", { user: result, title: 'user Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'user not found'});
    });
}

const user_create_get = (req, res) => {
    res.render('users/create', {title: 'Create a New user'});
}

const user_create_post = (req, res) => {
  const user = new User(req.body);
  
  user.save()
  .then((result) => {
    res.redirect("/users");
  })
  .catch((err) => {
    console.log(err);
  });
}

const user_delete = async (req, res) => {
 const id = req.params.id;
  await User.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/users");
  })
  .catch((err) => {
    console.log(err);
  });
}
const user_delete_get = async (req, res) => {
  const id = req.params.id;
    await User.findById(id)
    .then(result => {
      res.render('users/delete', {user: result, title: 'Delete user'});
    })
    .catch(err => console.log(err));
}

const user_edit_get = async (req, res) => {
  const id = req.params.id;
    await User.findById(id)
    .then(result => {
      res.render('users/edit', {user: result, title: 'Edit user'});
    })
    .catch(err => console.log(err));
}

const user_edit = async (req, res) => {
const id = req.params.id;
const user = new User(req.body);
await User.findById(id)
.then(result => {
  result.userName = user.userName;
  result.password = user.password;
  result.confirmPassword = user.confirmPassword;
  result.email = user.email;
  result.securityQuestion = user.securityQuestion;
  result.securityAnswer = user.securityAnswer;
  result.securityKey = user.securityKey;
  result.save();
  res.redirect('/users');
})
.catch(err => console.log(err));
  
}

module.exports = {
    user_index,
    user_details,
    user_create_get,
    user_create_post,
    user_delete_get,
    user_delete,
    user_edit_get,
    user_edit
}
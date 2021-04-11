const Friend = require('../models/friend');
const Church = require('../models/church');

const friend_index = async (req, res) => {
    const churchId = req.params.id;
     const churchName = global.churchName;
    await Friend.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('friends/index', { title: 'All friend', friends: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const friend_details = async (req, res) => {
    const id = req.params.id;
    await Friend.findById(id)
     .then((result) => {
      res.render("friend/details", { friend: result, title: 'friend Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'friend not found'});
    });
}

const friend_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('friends/create', {title: 'Create a New friend', churchId});
}

const friend_create_post = (req, res) => {
  const friend = new Friend(req.body);
  friend.church = req.body.churchId;
  friend.enteredBy = global.userId;
  friend.save()
  .then((result) => {
    res.redirect("/friends/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const friend_delete = async (req, res) => {
 const id = req.params.id;
  await Friend.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/friend");
  })
  .catch((err) => {
    console.log(err);
  });
}

const friend_delete_get = async (req, res) => {
  const id = req.params.id;
    await Friend.findById(id)
    .then(result => {
      res.render('friend/delete', {friend: result, title: 'Delete friend'});
    })
    .catch(err => console.log(err));
}

const friend_edit_get = async (req, res) => {
  const id = req.params.id;
    await Friend.findById(id)
    .then(result => {
      res.render('friend/edit', {friend: result, title: 'Edit friend'});
    })
    .catch(err => console.log(err));
}

const friend_edit = async (req, res) => {
const id = req.params.id;
const friend = new Friend(req.body);
await Friend.findById(id)
.then(result => {
  result.church = friend.church;
  result.lastName = friend.lastName;
  result.firstName = friend.firstName;
  result.title = friend.title;

  result.address1 = friend.address1;
  result.address2 = friend.address2;
  result.city = friend.city;
  result.state = friend.state;
  result.zip = friend.zip;
  result.phone = friend.phone;

  result.email = friend.email;
  result.status = friend.status;
  result.lastVisit = friend.lastVisit;
  result.offering = friend.offering;

  result.enteredBy = friend.enteredBy;
  result.save();
  res.redirect('/friend');
})
.catch(err => console.log(err));
  
}

module.exports = {
    friend_index,
    friend_details,
    friend_create_get,
    friend_create_post,
    friend_delete_get,
    friend_delete,
    friend_edit_get,
    friend_edit
}
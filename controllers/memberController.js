const Member = require('../models/member');
const Constant = require('../models/constant');
const Family = require('../models/family');

const member_index = (req, res) => {
    Member.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('members/index', { title: 'All members', members: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const member_details = (req, res) => {
    const id = req.params.id;
    Member.findById(id)
     .then((result) => {
      res.render("members/details", { member: result, title: 'member Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'member not found'});
    });
}

const member_create_get = async (req, res) => {
    const familyId = req.params.id;
    const family = await Family.findById(familyId);
    const subTitle = 'Add a member to ' + family.familyName +  ' Family (' + family.familyPatriots + ')';
    const churchTitles = await Constant.find( {category: "Church Title" } );
    const contactTypes = await Constant.find( {category: "Member Contact Type"} );
    res.render('members/create', {title: 'Create a New member', familyId, churchTitles, contactTypes, subTitle});
}

const member_create_post = (req, res) => {
  const member = new Member(req.body);
  console.log(req.body);
  member.save()
  .then((result) => {
    res.redirect("/members");
  })
  .catch((err) => {
    console.log(err);
  });
}

const member_delete = (req, res) => {
 const id = req.params.id;
  Member.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/members");
  })
  .catch((err) => {
    console.log(err);
  });
}
const member_delete_get = (req, res) => {
  const id = req.params.id;
    Member.findById(id)
    .then(result => {
      res.render('members/delete', {member: result, title: 'Delete member'});
    })
    .catch(err => console.log(err));
}

const member_edit_get = async (req, res) => {
  const id = req.params.id;
  const churchTitles = await Constant.find( {category: "Church Title" } );
  const contactTypes = await Constant.find( {category: "Member Contact Type"} );
    Member.findById(id)
    .then(result => {
      res.render('members/edit', {member: result, title: 'Edit member', churchTitles, contactTypes});
    })
    .catch(err => console.log(err));
}

const member_edit = async (req, res) => {
const id = req.params.id;
const member = new Member(req.body);
Member.findById(id)
.then(result => {
  result.familyId = member.familyId;
  result.statusId = member.statusId;
  result.firstName = member.firstName;
  result.lastName = member.lastName;
  result.middleName = member.middleName;
  result.dob = member.dob;
  result.gender = member.gender;
  result.phone = member.phone;
  result.email = member.email;
  result.membershipDate = member.membershipDate;
  result.title = member.title;
  result.contactType = member.contactType;
  result.enteredBy = member.enteredBy;
  result.save();
  res.redirect('/members');
})
.catch(err => console.log(err));
  
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
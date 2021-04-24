const Contribution = require('../models/contribution');
const Constant = require('../models/constant');
const Member = require('../models/member');
const Church = require('../models/church');

//app.get('*', checkUser); //put user values in res.locals
const contribution_index = async (req, res) => {
     const id = req.params.id;
     const members = await Member.find({ church: id});
    await Contribution.find({ church: id}).sort({ createdAt: -1 })
    .then((result) => {
      res.render('contributions/index', { title: 'All contributions', contributions: result, members })
    })
    .catch((err) => {
      console.log(err)
    })
}

const contribution_details = (req, res) => {
    const id = req.params.id;
    Contribution.findById(id)
     .then((result) => {
      res.render("contributions/details", { contribution: result, title: 'contribution Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'contribution not found'});
    });
}

const contribution_create_get = async (req, res) => {
    const memberId = req.params.id;
    const contributionTypes = await Constant.find( {category: "Member Contribution"} );
    res.render('contributions/create', {title: 'Add contribution', contributionTypes, memberId});
}


const contribution_create_post = async (req, res) => {
  console.log('contribution data');
  console.log(req.body);

  const memberId = req.body.memberId;
  const member = await Member.findById(memberId);
  const contribution = new Contribution(req.body);
  contribution.enteredBy = global.userId;
  contribution.church = member.church;

  contribution.status = "Active";
  contribution.save()
  .then((result) => {
    res.redirect("/contributions/create/" + member._Id);
  })
  .catch((err) => {
    console.log(err);
  });
}

const contribution_delete = (req, res) => {
 const id = req.params.id;
 Contribution.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/contributions");
  })
  .catch((err) => {
    console.log(err);
  });
}
const contribution_delete_get = async (req, res) => {
  const id = req.params.id;
  await Contribution.findById(id)
    .then(result => {
      res.render('contributions/delete', {contribution: result, title: 'Delete contribution'});
    })
    .catch(err => console.log(err));
}

const contribution_edit_get = async (req, res) => {
  const id = req.params.id;
  await Contribution.findById(id)
    .then(result => {
      res.render('contributions/edit', {contribution: result, title: 'Edit contribution'});
    })
    .catch(err => console.log(err));
}

const contribution_edit = async (req, res) => {
const id = req.params.id;
const contribution = new Contribution(req.body);
console.log(contribution);
await contribution.findById(id)
.then(result => {
  result.category = contribution.category;
  result.name = contribution.name;
  result.value1 = contribution.value1;
  result.value2 = contribution.value2;
  result.value3 = contribution.value3;
  result.sort = contribution.sort;
  result.status = contribution.status;
  result.enteredBy = contribution.enteredBy;
  result.save();
  res.redirect('/contributions');
})
.catch(err => console.log(err));
  
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
const Church = require('../models/church');

const church_index = async (req, res) => {
    const id = req.params.id;
    await Church.find({ parentChurch: id }).sort({ createdAt: -1 })
    .populate('branchChurches', 'name _id')
    .then((result) => {
      res.render('churches/index', { title: 'All Churches', churches: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const church_tagname_get = async (req, res) => {
  const tagName = req.params.name;
  await Church.find({ tagName: tagName }).sort({ createdAt: -1 })
  .populate('branchChurches', 'name _id')
  .then((result) => {
    let id = '';
    result.forEach(one => {
     id = one._id;
    });
    res.redirect(req.baseUrl + '/' + id); //, { title: 'All Churches', churches: result })
  })
  .catch((err) => {
   res.status(404).render('404', {title: 'Church not found'});
  });
}

const church_details = async (req, res) => {
    const id = req.params.id;
    await Church.findById(id)
     .then((result) => {
       global.churchName = result.name;
       global.churchId = result._id;
      res.render("churches/details", { church: result, title: 'Church Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Church not found'});
    });
}



const church_branch_create_get = async (req, res) => {
  const churchId = req.params.id;
   await Church.findById(churchId)
   .populate('branchChurches', 'name city _id') //church branches
   .then((result) => {
     res.render('Churches/createBranch', {title: 'Create a New Church Branch', parentId: churchId,result});
   })
   .catch((err) => {
    res.status(404).render('404', {title: 'Church not found'});
   });

  
}

const church_createBranch_post = async (req, res) => {
  const church = new Church(req.body);
  const parentChurch = await Church.findById(req.body.parentChurch);
 
  church.save()
  .then((result) => {
    parentChurch.branchChurches.push(church._id);
    parentChurch.save();
    res.redirect("/churches");
  })
  .catch((err) => {
    console.log(err);
  });
}

const church_create_get = (req, res) => {
    res.render('Churches/create', {title: 'Create a New Church'});
}


const church_create_post = (req, res) => {
  const church = new Church(req.body);
  church.enteredBy = global.userId;
  church.save()
  .then((result) => {
    res.redirect("/churches");
  })
  .catch((err) => {
    console.log(err);
  });
}

const church_delete = async (req, res) => {
 const id = req.params.id;
  await Church.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/churches");
  })
  .catch((err) => {
    console.log(err);
  });
}
const church_delete_get = async (req, res) => {
  const id = req.params.id;
    await Church.findById(id)
    .then(result => {
      res.render('churches/delete', {church: result, title: 'Delete Church'});
    })
    .catch(err => console.log(err));
}

const church_edit_get = async (req, res) => {
  const id = req.params.id;
    await Church.findById(id)
    .then(result => {
      res.render('churches/edit', {church: result, title: 'Edit Church'});
    })
    .catch(err => console.log(err));
}

const church_edit = async (req, res) => {
const id = req.params.id;
const church = new Church(req.body);
await Church.findById(id)
.then(result => {
  result.title = church.title;
  result.name = church.name;
  result.founded = church.founded;
  result.address1 = church.address1;
  result.address2 = church.address2;
  result.city = church.city;
  result.state = church.state;
  result.country = church.country;
  result.phone = church.phone;
  result.email = church.email;
  result.parent = church.parent;
  result.picture = church.picture;
  result.enteredBy = global.userId;
  result.save();
  res.redirect('/churches');
})
.catch(err => console.log(err));
  
}

module.exports = {
    church_index,
    church_details,
    church_create_get,
    church_create_post,
    church_delete_get,
    church_delete,
    church_edit_get,
    church_edit,
    church_branch_create_get,
    church_createBranch_post,
    church_tagname_get
}
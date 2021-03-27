const Story = require('../models/story');
const Church = require('../models/church');

const story_index = async (req, res) => {
    const churchId = req.params.id;
    const church = await Church.findById(churchId);
     const churchName = church.name;
    await Story.find({ Church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('storys/index', { title: 'All story', storys: result, churchId, churchName })
    })
    .catch((err) => {
      console.log(err)
    })
}

const story_details = async (req, res) => {
    const id = req.params.id;
    await Story.findById(id)
     .then((result) => {
      res.render("story/details", { story: result, title: 'story Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'story not found'});
    });
}

const story_create_get = (req, res) => {
  const churchId = req.params.id;
    res.render('storys/create', {title: 'Create a New story', churchId});
}

const story_create_post = (req, res) => {
  const story = new Story(req.body);
  story.church = req.body.churchId;

  story.save()
  .then((result) => {
    res.redirect("/storys/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const story_delete = async (req, res) => {
 const id = req.params.id;
  await Story.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/story");
  })
  .catch((err) => {
    console.log(err);
  });
}

const story_delete_get = async (req, res) => {
  const id = req.params.id;
    await Story.findById(id)
    .then(result => {
      res.render('story/delete', {story: result, title: 'Delete story'});
    })
    .catch(err => console.log(err));
}

const story_edit_get = async (req, res) => {
  const id = req.params.id;
    await Story.findById(id)
    .then(result => {
      res.render('story/edit', {story: result, title: 'Edit story'});
    })
    .catch(err => console.log(err));
}

const story_edit = async (req, res) => {
const id = req.params.id;
const story = new Story(req.body);
await Story.findById(id)
.then(result => {
  result.church = story.church;
  result.ministry = story.ministry;
  result.title = story.title;
  result.subTitle = story.subTitle;

  result.intro = story.intro;
  result.story = story.story;
  result.publishStartDate = story.publishStartDate;

  result.publishEndDate = story.publishEndDate;
  result.author = story.author;
  result.picture = story.picture;
  result.status = story.status;

  result.enteredBy = story.enteredBy;
  result.save();
  res.redirect('/story');
})
.catch(err => console.log(err));
  
}

module.exports = {
    story_index,
    story_details,
    story_create_get,
    story_create_post,
    story_delete_get,
    story_delete,
    story_edit_get,
    story_edit
}
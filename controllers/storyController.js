const Story = require('../models/story');
const Church = require('../models/church');
const Ministry = require('../models/ministry');

const story_index = async (req, res) => {
    const churchId = req.params.id;  
     await Story.find({ church: churchId }).sort({ createdAt: -1 })
    .then((result) => {
      res.render('stories/index', { title: 'All story', stories: result, churchId })
    })
    .catch((err) => {
      console.log(err)
    })
}

const story_details = async (req, res) => {
    const id = req.params.id;
    await Story.findById(id)
     .then((result) => {
      res.render("stories/details", { story: result, title: 'story Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'story not found'});
    });
}

const story_create_get = async (req, res) => {
  const churchId = req.params.id;
  const ministries = await Ministry.find({church: churchId},'_id name').sort({ name: 1 });
    res.render('stories/create', {title: 'Create a New story', churchId, ministries});
}

const story_create_post = (req, res) => {
  const story = new Story(req.body);
  story.church = req.body.churchId;
  story.enteredBy = global.userId;
  story.save()
  .then((result) => {
    res.redirect("/stories/church/" + req.body.churchId);
  })
  .catch((err) => {
    console.log(err);
  });
}

const story_delete = async (req, res) => {
 const id = req.params.id;
  await Story.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/stories");
  })
  .catch((err) => {
    console.log(err);
  });
}

const story_delete_get = async (req, res) => {
  const id = req.params.id;
    await Story.findById(id)
    .then(result => {
      res.render('stories/delete', {story: result, title: 'Delete story'});
    })
    .catch(err => console.log(err));
}

const story_edit_get = async (req, res) => {
  const id = req.params.id;
    await Story.findById(id)
    .then(result => {
      res.render('stories/edit', {story: result, title: 'Edit story'});
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
  res.redirect('/stories');
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
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
     Blog.findById(id)
     .then((result) => {
      res.render("blogs/details", { blog: result, title: 'Blog Details'})
    })
    .catch((err) => {
      res.status(404).render('404', {title: 'Blog not foune'});
    });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create a New Blog'});
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  
  blog.save()
  .then((result) => {
    res.redirect("/blogs");
  })
  .catch((err) => {
    console.log(err);
  });
}

const blog_delete = (req, res) => {
 const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result) => {
    res.redirect("/blogs");
  })
  .catch((err) => {
    console.log(err);
  });
}
const blog_delete_get = (req, res) => {
  const id = req.params.id;
    Blog.findById(id)
    .then(result => {
      res.render('blogs/delete', {blog: result, title: 'Delete Blog'});
    })
    .catch(err => console.log(err));
}

const blog_edit_get = (req, res) => {
  const id = req.params.id;
    Blog.findById(id)
    .then(result => {
      res.render('blogs/edit', {blog: result, title: 'Edit Blog'});
    })
    .catch(err => console.log(err));
}

const blog_edit = async (req, res) => {
const id = req.params.id;
const blog = new Blog(req.body);
Blog.findById(id)
.then(result => {
  result.title = blog.title;
  result.snippet = blog.snippet;
  result.body = blog.body;
  result.save();
  res.redirect('/blogs');
})
.catch(err => console.log(err));
  
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete_get,
    blog_delete,
    blog_edit_get,
    blog_edit
}
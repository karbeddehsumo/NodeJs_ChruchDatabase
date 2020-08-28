const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/user');

const { render } = require('ejs');
const methodOverride = require('method-override');


const announcementRoutes = require('./routes/announcementRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const churchRoutes = require('./routes/churchRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const dbURI = 'mongodb://gfumbah:John316love@ds133113.mlab.com:33113/churchdatabase'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//Register view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(express.static('public')); //folder name to hold static files to make them accessible
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());


app.get('/', (req, res) => {
    res.redirect('/blogs');  
});

// app.get('/login', (req, res) => {
//   res.render('login.ejs')
// });

// app.post('/login', (req, res) => {

// });

// app.get('/signup', (req, res) => {
  
// });

// app.post('/register', async (req, res, next) => {
//   try{
//     const user = new User(req.body);
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     if(user.password.compareTo(user.conformPassword)) return res.status(404).send('Passwords mismatch.');
//    // const emailExist = await User.findOne({email: req.body.email});
//     console.log('after is exist');
//     //if(emailExist) return res.status(400).send('Email already exists.');
//     console.log('after exist error message');
//     user.password = hashedPassword;
//     await user.save()
//     .then((result) => {
//       res.redirect('/login');
//     })
//     .catch((err) => {
//       res.redirect('/register');
//     });
//   } catch {

//   }
//   next
// });

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

  //Blog Routes
  app.use('/announcements',announcementRoutes);
  app.use('/attendances', attendanceRoutes);
  app.use('/blogs', blogRoutes);
  app.use('/churches', churchRoutes);
  app.use('/expenses',expenseRoutes);
  app.use('/incomes', incomeRoutes);
  app.use('/members', memberRoutes);
  app.use('/users', userRoutes);
  app.use(authRoutes);
  
  


  //404 page
  app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
  })
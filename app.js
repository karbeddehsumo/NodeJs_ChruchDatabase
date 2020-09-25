const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser }  = require('./middleware/authMiddleware');

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

const dbURI = 'mongodb+srv://gfumbah:zorzor1964@cluster0.ssjpy.mongodb.net/ChurchDB';
               
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
app.use(cookieParser());

app.get('/', (req, res) => {
    res.redirect('/churches');  
});


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//must be authenticated to access the landing page
app.get('/welcome', requireAuth, (req, res) => res.render('welcome'));

  //Blog Routes
  app.get('*', checkUser);
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
  });


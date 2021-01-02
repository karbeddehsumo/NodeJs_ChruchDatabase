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
const authRoutes = require('./routes/authRoutes');
const bankRoutes = require('./routes/bankRoutes');
const bankBalanceRoutes = require('./routes/bankBalanceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const churchRoutes = require('./routes/churchRoutes');
const constantRoutes = require('./routes/constantRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const familyRoutes = require('./routes/familyRoutes');
const fundRoutes = require('./routes/fundRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const memberRoutes = require('./routes/memberRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');


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
app.use(cookieParser());  //middlewae to add user data to res.locals

app.get('*', checkUser);
app.get('/', (req, res) => {
    res.render('welcome', {title: 'welcome'});  
});

app.get('/home', (req, res) => {
  res.render('home', {title: 'home'});  
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//must be authenticated to access the landing page
app.get('/welcome', requireAuth, (req, res) => res.render('welcome'));

  //Blog Routes
  //app.get('*', checkUser);
  app.use('/announcements',announcementRoutes);
  app.use('/attendances', attendanceRoutes);
  app.use('./banks', bankRoutes);
  app.use('./bankBalances', bankBalanceRoutes);
  app.use('/blogs', blogRoutes);
  app.use('/churches', churchRoutes);
  app.use('/constants', constantRoutes);
  app.use('/contributions', contributionRoutes);
  app.use('/expenses', expenseRoutes);
  app.use('/families', familyRoutes);
  app.use('./funds', fundRoutes);
  app.use('/incomes', incomeRoutes);
  app.use('/members', memberRoutes);
  app.use('/roles', roleRoutes);
  app.use('/users', userRoutes);
  app.use(authRoutes);
  

  //404 page
  app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
  });


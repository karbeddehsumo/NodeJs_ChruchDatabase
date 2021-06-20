require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser }  = require('./middleware/authMiddleware');
const mysql = require('mysql');

const User = require('./models/user');

const { render } = require('ejs');
const methodOverride = require('method-override');


const announcementRoutes = require('./routes/announcementRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes');
const bankRoutes = require('./routes/bankRoutes');
const billRoutes = require('./routes/billRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const blogRoutes = require('./routes/blogRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const churchRoutes = require('./routes/churchRoutes');
const constantRoutes = require('./routes/constantRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const eventRoutes = require('./routes/eventRoutes');
const familyRoutes = require('./routes/familyRoutes');
const fundRoutes = require('./routes/fundRoutes');
const goalRoutes = require('./routes/goalRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const memberRoutes = require('./routes/memberRoutes');
const ministryRoutes = require('./routes/ministryRoutes');
const payeeRoutes = require('./routes/payeeRoutes');
const pledgeRoutes = require('./routes/pledgeRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const roleRoutes = require('./routes/roleRoutes');
const staffRoutes = require('./routes/staffRoutes');
const storyRoutes = require('./routes/storyRoutes');
const tableHeaderRoutes = require('./routes/tableHeaderRoutes');
const tableDataRoutes = require('./routes/tableDataRoutes');
const userRoutes = require('./routes/userRoutes');
const visitorRoutes = require('./routes/visitorRoutes');



const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ssjpy.mongodb.net/${process.env.DB_DATABASENAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
//mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(3000))
 .catch((err) => console.log(err));


//  //connection pool
//  const pool = mysql.createPool({
//     //connection-limit: 100
//     host:  process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DBNAME,
//     user:  process.env.MYSQL_USERNAME,
//     password: process.env.MYSQL_PASSWORD
//  });

//  //connect to mysql db
//  pool.getConnection((err, connection) => {
//    if(err) throw err; //not connected
//    console.log('Connected to MySQL @ ' + connection.threadId);
//  })

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
  app.use('/bills', billRoutes);
  app.use('/banks', bankRoutes);
  app.use('/blogs', blogRoutes);
  app.use('/budgets', budgetRoutes);
  app.use('/calendars', calendarRoutes);
  app.use('/churches', churchRoutes);
  app.use('/constants', constantRoutes);
  app.use('/contributions', contributionRoutes);
  app.use('/expenses', expenseRoutes);
  app.use('/events', eventRoutes);
  app.use('/families', familyRoutes);
  app.use('/funds', fundRoutes);
  app.use('/goals', goalRoutes);
  app.use('/incomes', incomeRoutes);
  app.use('/members', memberRoutes);
  app.use('/ministries', ministryRoutes);
  app.use('/payees', payeeRoutes);
  app.use('/pledges', pledgeRoutes);
  app.use('/properties', propertyRoutes);
  app.use('/roles', roleRoutes);
  app.use('/staffs', staffRoutes);
  app.use('/stories', storyRoutes);
  app.use('/tableHeaders', tableHeaderRoutes);
  app.use('/tableData', tableDataRoutes);
  app.use('/users', userRoutes);
  app.use('/visitors', visitorRoutes);
  app.use(authRoutes);
  

  //404 page
  app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
  });


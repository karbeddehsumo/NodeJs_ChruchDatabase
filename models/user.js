const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
email: {
 type: String,
 required: [true,'Please enter an email'],
 unique: true,
 lowercase: true,
 validate: [isEmail, 'Please enter a valid email']
},
password: {
  type: String,
  required: [true,'Please enter a password'],
  minlength: [6, 'Minimum password length is 6 characters']
}
});

//fire a function after doc saved to db
// userSchema.post('save', function (doc, next) {
//   next();
// });

//fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
userSchema.statics.login = async function(email, password) {
  

  const user = await this.findOne({ email });

  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error('Incorrect password');
  } 
  throw Error('Incorrect email');
};

const User = mongoose.model('user', userSchema);
module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
userId: {
 type: String,
 //required: [true]
},
roleId: {
  type: String,
 // required: [true]
}
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;

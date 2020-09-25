const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
userId: {
 type: String,
 required
},
roleId: {
  type: String,
  required
}
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  church: {type: Schema.Types.ObjectId, ref: 'church'},
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  roles:{type: Schema.Types.ObjectId, ref: 'constant'},
  enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;

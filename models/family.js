const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  church: { type: Schema.Types.ObjectId, ref: 'church'},
  familyName: {
      type: String,
      required: [true, 'Enter family name']
  },
  familyPatriots: {
    type: String,
    required: [true, 'Enter the names of the family patriot(s)']
  },
  familyMembers:[{ type: Schema.Types.ObjectId, ref: 'member'}],
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamp: true});

const Family = mongoose.model('family', familySchema);
module.exports = Family;

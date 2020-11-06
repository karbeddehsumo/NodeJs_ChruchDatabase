const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  familyName: {
      type: String,
      required: [true, 'Enter family name']
  },
  familyLabel: {
    type: String,
    required: [true, 'Enter the family label']
  },
  address1: {
      type: String
  },
  address2: {
      type: String
  },
  city: {
      type: String
  },
  state: {
    type: String
  },
  zip: {
      type: String
  },
  country: {
      type: String
  }
});

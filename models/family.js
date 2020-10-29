const mongoose = require('mongoose');
const Schema = mongoose.schema;

const familySchema = new Schema({
  familyName: {
      type: string,
      required: [True, 'Enter family name']
  },
  address1: {
      type: string
  },
  address2: {
      type: string
  },
  city: {
      type: string
  },
  state: {
    type: string
  },
  zip: {
      type: string
  },
  country: {
      type: string
  }
});

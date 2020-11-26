const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constantSchema = new Schema({
  church: { type: Schema.Types.ObjectId, ref: 'church'},
category: {
 type: String,
 required: [true,'Please enter a category'],
 lowercase: true
},
name: {
  type: String,
  required: [true,'Please enter category name']
},

value1: {
    type: String,
    required: [true,'Please enter value1']
  },

  value2: {
    type: String,
    required: [false]
  },

  value3: {
    type: String,
    required: [false]
  },

  sort: {
    type: Number,
    required: [false]
  },
  
  status: {
    type: String,
    required: [true,'Please enter the status']
  },

  enteredBy: { type: Schema.Types.ObjectId, ref: 'user'},


}, {timestamp: true});

const Constant = mongoose.model('constant', constantSchema);
module.exports = Constant;

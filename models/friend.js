const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    firstName: String,
    lastName: String,
    title: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
    phone: String,
    email: String,
    status: String,
    lastVisit: [{program: String, date:Date}],
    offering: [{amount:Number, date:Date}]

}, {timestamps: true});
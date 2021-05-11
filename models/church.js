const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const churchSchema = new Schema({
    branchChurches: [{ type: Schema.Types.ObjectId, ref: 'church'}],
    parentChurch: { type: Schema.Types.ObjectId, ref: 'church'},
    ministries: [{ type: Schema.Types.ObjectId, ref: 'ministry'}],

    title: String,
    name: {
        type: String,
        required: [true, 'Enter the name.']
    },
    tagName: String,
    founded: {
        type: Date,
        default: Date.now ,
        required: [true, 'Enter the year founded.']
    },
    address1: String,
    address2: String,
    city: {
        type: String,
        required: [true, 'Enter the city.']
    },
    state: String,
    zipcode: String,
    country: {
        type: String,
        required: [true, 'Enter the country.']
    },
    phone: {
        type: String,
        required: [true, 'Enter the phone.']
    },
    email: {
        type: String,
        required: [true, 'Enter the email.']
    },
    pictures: [{ type: Schema.Types.ObjectId, ref: 'picture'}],
    vision:  String,
    status: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Church = mongoose.model('church', churchSchema);

module.exports = Church;
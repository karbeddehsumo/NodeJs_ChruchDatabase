const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const churchSchema = new Schema({
    branchChurches: [{ type: Schema.Types.ObjectId, ref: 'church'}],
    parentChurch: { type: Schema.Types.ObjectId, ref: 'church'},
    title: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'Enter the name.']
    },
    founded: {
        type: Date,
        default: Date.now ,
        required: [true, 'Enter the year founded.']
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'Enter the city.']
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
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
    moto:  String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Church = mongoose.model('Church', churchSchema);

module.exports = Church;
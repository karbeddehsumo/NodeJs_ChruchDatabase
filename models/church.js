const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const churchSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    title: {
        type: String,
        required: [true, 'Enter the title.']
    },
    name: {
        type: String,
        required: [true, 'Enter the name.']
    },
    founded: {
        type: String,
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
    Phone: {
        type: String,
        required: [true, 'Enter the phone.']
    },
    email: {
        type: String,
        required: [true, 'Enter the email.']
    },
    parent: {
        type: String
    },
    pictures: { type: Schema.Types.ObjectId, ref: 'picture'},
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Church = mongoose.model('Church', churchSchema);

module.exports = Church;
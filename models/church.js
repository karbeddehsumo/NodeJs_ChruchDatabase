const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const churchSchema = new Schema({
    title: joi.string(),
    name: joi.string().required().label('Church name is required.'),
    founded: joi.date().default(Date()).required().label('Date founded is required.'),
    address1: joi.string().required().label('Address1 is required.'),
    address2: joi.string(),
    city: joi.string().required().label('City is required'),
    state: joi.string(),
    zipcode: joi.string(),
    country: joi.string().required().label('Country is required.'),
    Phone: joi.string().regex(/^(\(\d{3}\) |\d{3}-)\d{3}-\d{4}$/).default('111-222-3333'),
    email: joi.string().email().lowercase(),
    parent: joi.string(),
    picture: joi.string(),
    enteredBy: joi.string().required()
}, { timestamps: true});

const Church = mongoose.model('Church', churchSchema);

module.exports = Church;
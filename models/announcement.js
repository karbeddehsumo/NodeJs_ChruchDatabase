const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const announcementSchema = new Schema({
    churdId: joi.string().required(),
    ministryId: joi.string().required(),
    documentId: joi.string().required(),
    title: joi.string().required().label('Title is required.'),
    beginDate: joi.date().default(Date()).required().label('Begin date is required.'),
    endDate: joi.date().default(Date()).required().label('End date is required.'),
    message: joi.string().required().label('Message is required.'),
    statusId: joi.string().required(),
    enteredBy: joi.string().required()
},{timestamps: true});

const Announcement = mongoose.model('announcement', announcementSchema);
module.exports = Announcement;
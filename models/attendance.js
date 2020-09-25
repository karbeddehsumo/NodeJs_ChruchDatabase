const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const attendanceSchema = new Schema({
    churdId: joi.string().required(),
    memberId: joi.string().required(),
    calendarId: joi.string().required(),
    rollCall: joi.boolean().default(true).required().label('Enter the roll.'),
    enteredBy: joi.string().required()
},{timestamps: true});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
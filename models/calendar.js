const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church' },
    ministries: [{ type: Schema.Types.ObjectId, ref: 'ministry' }],
    title: String,
    startDate: Date,
    endDate: Date,
    agendaURL: String,
    description: String,
    venue: String,
    access: String,
    approvePublicAcces: { type: Boolean, default: false },
    picture: String,
    status: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user' }
}, {timestamp: true});

const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;
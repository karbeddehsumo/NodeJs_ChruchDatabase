const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church' },
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry' },
    title: String,
    startDate: Date,
    endDate: Date,
    startTime: String,
    endTime: String,
    agendaURL: String,
    description: String,
    location: String,
    access: String,
    picture: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user' }
}, {timestamp: true});

const Calendar = mongoose.model('bank', calendarSchema);
module.exports = Calendar;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const meetingSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    title: String,
    meetingDate: Date,
    startTime: String,
    endTime: String,
    agenda: [{String}],
    minutes: string,
    status: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Meeting = mongoose.model('meeting', meetingSchema);
module.exports = Meeting;
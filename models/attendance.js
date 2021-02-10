const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    meeting: { type: Schema.Types.ObjectId, ref: 'meeting'},
    event: { type: Schema.Types.ObjectId, ref: 'event'},
    rollCall: {
        type: Boolean,
        required: [true, 'Enter the roll']
    },
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true});

const Attendance = mongoose.model('attendance', attendanceSchema);
module.exports = Attendance;
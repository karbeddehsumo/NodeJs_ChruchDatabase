const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    calendar: { type: Schema.Types.ObjectId, ref: 'calendar'},
    rollCall: {
        type: Boolean,
        required: [true, 'Enter the roll']
    },
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
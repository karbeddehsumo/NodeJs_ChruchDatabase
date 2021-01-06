const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    document: { type: Schema.Types.ObjectId, ref: 'document'},
    title: {
        type: String,
        required: [true, 'Please enter title']
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Please enter start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please enter end date']
    },
    message: {
        type: String,
        required: [true, 'Please enter message']
    },
    status: { type: Schema.Types.ObjectId, ref: 'constant'},
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
},{timestamps: true});

const Announcement = mongoose.model('announcement', announcementSchema);
module.exports = Announcement;
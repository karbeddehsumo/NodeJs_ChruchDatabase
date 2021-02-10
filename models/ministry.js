
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ministrySchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    parentMinistry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    ministryName: String,
    description: String,
    contact: String,
    email: String,
    phone: String,
    missionStatement: String,
    picture: { type: Schema.Types.ObjectId, ref: 'picture'},
    video: { type: Schema.Types.ObjectId, ref: 'video'},
    members: [{ type: Schema.Types.ObjectId, ref: 'member'}],
    events: [{ type: Schema.Types.ObjectId, ref: 'event'}],
    goals: [{ type: Schema.Types.ObjectId, ref: 'goal'}],
    meetings: [{ type: Schema.Types.ObjectId, ref: 'meeting'}],
    calendars: [{ type: Schema.Types.ObjectId, ref: 'calendar'}]
},{timestamps: true});

const Ministry = mongoose.model('ministry', ministrySchema);
module.exports = Ministry;
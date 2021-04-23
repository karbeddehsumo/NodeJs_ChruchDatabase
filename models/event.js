const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    calendar: { type: Schema.Types.ObjectId, ref: 'calendar'},
    budget: [{item: String, cost: Number}],
    missionStatement: String,
    picture: [{ type: Schema.Types.ObjectId, ref: 'picture'}],
    video: [{ type: Schema.Types.ObjectId, ref: 'video'}],
    announcement: { type: Schema.Types.ObjectId, ref: 'announcement'},
    attendance: { type: Schema.Types.ObjectId, ref: 'attendance'},
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
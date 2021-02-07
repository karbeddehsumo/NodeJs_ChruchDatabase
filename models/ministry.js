
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
    ministryGoals: [{year: Number, goals:[{
        goal: String, schedule: [{task: String, assignTo: String, StartDate: Date, endDate: Date, comment: String}]
    }]}],
    meetings: [{meetingDate: Date, startTime: String, endTime: String, agenda: [{String}]}],
    calendar: { type: Schema.Types.ObjectId, ref: 'calendar'},
},{timestamps: true});
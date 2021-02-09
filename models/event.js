const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    title: String,
    beginDate: { type: Schema.Types.ObjectId, ref: 'calendar'},
    endDate: { type: Schema.Types.ObjectId, ref: 'calendar'},
    startTime: String,
    endTime: String,
    budget: [{item: String, cost: Number}],
    missionStatement: String,
    picture: { type: String},
    video: { type: String},
}, {timestamps: true});
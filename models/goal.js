const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const goalSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    year: Number,
    goal: String,
    schedule: [{
        task: String, 
        assignedTo: String, 
        StartDate: Date, 
        endDate: Date, 
        status: String,
        comment: String
    }],
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Goal = mongoose.model('goal', goalSchema);
module.exports = Goal;

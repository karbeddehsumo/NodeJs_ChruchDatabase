const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    firstName: String,
    lastName: String,
    middleName: String,
    title: String,
    department: String,
    jobDescription: String,
    supervisor: String,
    picture: String,
    status: String,
    dateHired: Date,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Staff = mongoose.model('staff', staffSchema);
module.exports = Staff;
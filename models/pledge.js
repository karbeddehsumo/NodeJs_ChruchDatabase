const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pledgeSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    member: { type: Schema.Types.ObjectId, ref: 'member'},
    fund: { type: Schema.Types.ObjectId, ref: 'fund'},
    frequency: String,
    amount: Number,
    year: Number,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Pledge = mongoose.model('pledge', pledgeSchema);
module.exports = Pledge;
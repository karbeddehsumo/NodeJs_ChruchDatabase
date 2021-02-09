const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fundSchema = new Schema({  
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    name: String,
    category: String,
    bank: { type: Schema.Types.ObjectId, ref: 'bank' },
    description: String,
    isBudgeted: Boolean,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamp: true });

const Fund = mongoose.model('fund', fundSchema);
module.exports = Fund; 
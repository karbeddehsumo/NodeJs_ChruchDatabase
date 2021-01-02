const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church' },
    accountName: { type: String },
    accountNumber: { type: String },
    description: { type: String },
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user' }
}, {timestamp: true});

const Bank = mongoose.model('bank', bankSchema);
module.export = Bank;
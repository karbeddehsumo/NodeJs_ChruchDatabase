const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tableSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church' },
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    title: String,
    field1: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field2: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field3: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field4: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field5: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field6: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field7: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field8: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field9: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    field10: {
        title: String,
        dataType: String,
        status: { type: bool, default: false}
    },
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Table = mongoose.model('table', tableSchema);
module.exports = Table;
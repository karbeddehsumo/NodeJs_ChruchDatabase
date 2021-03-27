const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tableDataSchema = new Schema({
    table: { type: Schema.Types.ObjectId, ref: 'table' },
    row: [{
    data1: String,
    data2: String,
    data3: String,
    data4: String,
    data5: String,
    data6: String,
    data7: String,
    data8: String,
    data9: String,
    data10: String,
    }]
}, { timestamps: true});

const TableData = mongoose.model('tableData', tableDataSchema);
module.exports = TableData;
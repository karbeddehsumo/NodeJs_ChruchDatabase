const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankBalanceSchema = new Schema({
  church: { type: Schema.Types.ObjectId, ref: 'church' },
  bank: { type: Schema.Types.ObjectId, ref: 'bank' },
  beginDate: { type: Date },
  endDate: { type: Date },

  beginBalance: Number,
  endBalance: Number,
  income: { type: Schema.Types.ObjectId, ref: 'income' },
  expense: { type: Schema.Types.ObjectId, ref: 'expense' },
  revenueAmount: Number
  
}, { timestamp: true });

const BankBalance = mongoose.model('bankBalance', bankBalanceSchema);
module.exports = BankBalance;

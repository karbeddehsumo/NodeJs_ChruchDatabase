const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankBalance = new Schema({
  church: { type: Schema.Types.ObjectId, ref: 'church' },
  bank: { type: Schema.Types.ObjectId, ref: 'bank' },
  beginningDate: { type: date },
  endDate: { type: date },

  beginningBalance: { type: Number },
  endingBalance: { type: Number },
  income: { type: Schema.Types.ObjectId, ref: 'income' },
  expense: { type: Schema.Tyoes.ObjectId, ref: 'expense' },
  revenueAmount: { type: Number }
  
}, { timestamp: true });

const BankBalance = mongoose.model('bankBalance', bankBalanceSchema);
module.exports = BankBalance;

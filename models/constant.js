
 const get = async function get(con, name, status) {
    const results = await con.query(`SELECT * FROM constant WHERE caegory = ? AND status = ?`,[name, status]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from posts WHERE id = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('Post with this id was not found');
  }
  return result[0][0];
}

const getAll = async function get(con, churchId) {
  const results = await con.query(`SELECT * FROM constant WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered) {
   const result = await con.quary(`INSERT INTO constant SET = ?`,
   {churchId, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered}
   );
 };

 const _update = async function update(con, churchId, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered, id) {
  const result = await con.quary(`UPDATE constant SET  churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE constantId = ?`,
  {churchId, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered, id}
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE constant WHERE constantId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;w

// const constantSchema = new Schema({
//   church: { type: Schema.Types.ObjectId, ref: 'church'},
// category: {
//  type: String,
//  required: [true,'Please enter a category'],function()
//  lowercase: true
// },
// name: {
//   type: String,
//   required: [true,'Please enter category name']
// },

// value1: {
//     type: String,
//     required: [true,'Please enter value1']
//   },

//   value2: {
//     type: String,
//     required: [false]
//   },

//   value3: {
//     type: String,
//     required: [false]
//   },

//   sort: {
//     type: Number,
//     required: [false]
//   },
  
//   status: {
//     type: String,
//     required: [true,'Please enter the status']
//   },

//   enteredBy: { type: Schema.Types.ObjectId, ref: 'user'},


// }, {timestamp: true});

// const Constant = mongoose.model('constant', constantSchema);
// module.exports = Constant;

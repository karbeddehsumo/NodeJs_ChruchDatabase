const { identity } = require("lodash");

 const get = async function getByMemberId(con, memberId, startDate, endDate) {
    const results = await con.query(`SELECT * FROM contribution WHERE memberId = ? AND contributionDate >= ? AND contributionDate <= ?`,[memberId, startDate, enddate]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from contribution WHERE contributionId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('contribution with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM contribution WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, memberId, amount, typeId, checkNumber, contributionDate, comment, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO contribution SET churchId = ?, memberId = ?, amount = ?, typeId = ?, checkNumber = ?, contributionDate = ?, comment = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, memberId, amount, typeId, checkNumber, contributionDate, comment, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, memberId, amount, typeId, checkNumber, contributionDate, comment, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE contribution SET memberId = ?, amount = ?, typeId = ?, checkNumber = ?, contributionDate = ?, comment = ?, enteredBy = ?, dateEntered = ? WHERE contributionId = ?`,
  [memberId, amount, typeId, checkNumber, contributionDate, comment, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE contribution WHERE contributionId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
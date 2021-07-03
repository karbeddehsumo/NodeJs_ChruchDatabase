
 const getByFund = async function get(con, fund) {
    const results = await con.query(`SELECT * FROM payee WHERE churchId = ? AND fundId = ?`,[global.churchId, fund]);
    return results[0];
 };

 const getByType = async function get(con, type) {
    const results = await con.query(`SELECT * FROM payee WHERE churchId = ? AND typeId = ?`,[global.churchId, type]);
    return results[0];
 };

 const getByFrequency = async function get(con, frequency) {
    const results = await con.query(`SELECT * FROM payee WHERE churchId = ? AND frequencyId = ?`,[global.churchId, frequency]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from payee WHERE payeeId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('payee with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM payee WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, fundId, typeId, frequencyId, name, email, phone, url, description, accountNumber, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO payee SET churchId = ?, fundId = ?, typeId = ?, frequencyId = ?, name = ?, email = ?, phone = ?, url = ?, description = ?, accountNumber = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, fundId, typeId, frequencyId, name, email, phone, url, description, accountNumber, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, fundId, typeId, frequencyId, name, email, phone, url, description, accountNumber, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE payee SET fundId = ?, typeId = ?, frequencyId = ?, name = ?, email = ?, phone = ?, url = ?, description = ?, accountNumber = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE payeeId = ?`,
  [fundId, typeId, frequencyId, name, email, phone, url, description, accountNumber, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE payee WHERE payeeId = ?', {id});
};

 module.exports = {getByFund, getByType, getByFrequency, getById, getAll, _insert, _update, _delete};
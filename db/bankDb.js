
 const get = async function get(con, name, status) {
    const results = await con.query(`SELECT * FROM bank WHERE category = ? AND status = ?`,[name, status]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from bank WHERE bankId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('bank with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM bank WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, accountName, accountNumber, shortAccountName, description, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO bank SET churchId = ?, accountName = ?, accountNumber = ?, shortAccountName = ?, description = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, accountName, accountNumber, shortAccountName, description, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, accountName, accountNumber, shortAccountName, description, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE bank SET accountName = ?, accountNumber = ?, shortAccountName = ?, description = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE bankId = ?`,
  [accountName, accountNumber, shortAccountName, description, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE bank WHERE bankId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
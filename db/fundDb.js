
 const getByBank = async function getByBank(con, bankId) {
    const results = await con.query(`SELECT * FROM fund WHERE church = ? AND bankId = ?`,[global.churchId, bankId]);
    return results[0];
 };

 const getByType = async function getByType(con, typeId) {
    const results = await con.query(`SELECT * FROM fund WHERE church = ? AND typeId = ?`,[global.churchId, typeId]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from fund WHERE fundId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('fund with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM fund WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, name, typeId, categoryId, bankId, description, isBudgeted, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO fund SET churchId = ?, name = ?, typeId = ?, categoryId = ?, bankId = ?, description = ?, isBudgeted = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, name, typeId, categoryId, bankId, description, isBudgeted, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, name, typeId, categoryId, bankId, description, isBudgeted, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE fund SET name = ?, typeId = ?, categoryId = ?, bankId = ?, description = ?, isBudgeted = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE fundId = ?`,
  [name, typeId, categoryId, bankId, description, isBudgeted, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE fund WHERE fundId = ?', {id});
};

 module.exports = {getByType, getByBank, getById, getAll, _insert, _update, _delete};

 const get = async function getByYear(con, churchId, year) {
    const results = await con.query(`SELECT * FROM budget WHERE churchId = ? AND year = ?`,[churchId, year]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from budget WHERE budgetId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('budget with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM budget WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, year, typeId, fundId, amount, comment, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO budget SET churchId = ?, year = ?, typeId = ?, fundId = ?, amount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, year, typeId, fundId, amount, comment, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, year, typeId, fundId, amount, comment, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE budget SET year = ?, typeId = ?, fundId = ?, amount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE budgetId = ?`,
  [year, typeId, fundId, amount, comment, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE budget WHERE budgetId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
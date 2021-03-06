
 const get = async function getByFund(con, fundId, startDate, endDate) {
    const results = await con.query(`SELECT * FROM expense WHERE churchId = ? AND fundId = ? AND expenseDate >= ? AND expenseDate <= ?`,[global.churchId, fundId, startDate, endDate]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from expense WHERE expenseId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('expense with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM expense WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, fundId, amount, checkNumber, expenseDate, payee, comment, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO expense SET churchId = ?, fundId = ?, amount = ?, checkNumber = ?, expenseDate = ?, payee = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, fundId, amount, checkNumber, expenseDate, payee, comment, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, fundId, amount, checkNumber, expenseDate, payee, comment, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE expense SET fundId = ?, amount = ?, checkNumber = ?, expenseDate = ?, payee = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE expenseId = ?`,
  [fundId, amount, checkNumber, expenseDate, payee, comment, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE expense WHERE expenseId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
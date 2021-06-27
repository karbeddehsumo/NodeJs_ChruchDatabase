
 const getByDate = async function get(con, startDate, endDate) {
    const results = await con.query(`SELECT * FROM income WHERE churchId = ? AND incomedate >= ? AND incomedate <= ?`,[global.churchId, beginDate, endDate]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from income WHERE incomeId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('income with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM income WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, fundId, incomeDate, cashAmount, checkAmount, coinAmount, comment, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO income SET churchId = ?, fundId = ?, incomeDate = ?, cashAmount = ?, checkAmount = ?, coinAmount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, fundId, incomeDate, cashAmount, checkAmount, coinAmount, comment, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, fundId, incomeDate, cashAmount, checkAmount, coinAmount, comment, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE income SET fundId = ?, incomeDate = ?, cashAmount = ?, checkAmount = ?, coinAmount = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE incomeId = ?`,
  [fundId, incomeDate, cashAmount, checkAmount, coinAmount, comment, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE income WHERE incomeId = ?', {id});
};

 module.exports = {getByDate, getById, getAll, _insert, _update, _delete};
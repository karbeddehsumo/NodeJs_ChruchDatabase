
 const getByMember = async function get(con, member, year) {
    const results = await con.query(`SELECT * FROM pledge WHERE churchId = ? AND memberId = ? ANd year = ?`,[global.churchId, member, year]);
    return results[0];
 };

 const getByFund = async function get(con, fund, year) {
    const results = await con.query(`SELECT * FROM pledge WHERE churchId = ? AND fundId = ? ANd year = ?`,[global.churchId, fund, year]);
    return results[0];
 };

 const getByFrequency = async function get(con, frequency, year) {
    const results = await con.query(`SELECT * FROM pledge WHERE churchId = ? AND frequencyId = ? ANd year = ?`,[global.churchId, frequency, year]);
    return results[0];
 };

 const getByYear = async function get(con, year) {
    const results = await con.query(`SELECT * FROM pledge WHERE churchId = ? ANd year = ?`,[global.churchId, year]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from pledge WHERE pledgeId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('pledge with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM pledge WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, memberId, fundId, amount, year, frequencyId, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO pledge SET churchId = ?, memberId = ?, fundId = ?, amount = ?, year = ?, frequencyId = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, memberId, fundId, amount, year, frequencyId, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, memberId, fundId, amount, year, frequencyId, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE pledge SET memberId = ?, fundId = ?, amount = ?, year = ?, frequencyId = ?, enteredBy = ?, dateEntered = ? WHERE pledgeId = ?`,
  [memberId, fundId, amount, year, frequencyId, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE pledge WHERE pledgeId = ?', {id});
};

 module.exports = {getByMember, getByFund, getByFrequency, getByYear, getById, getAll, _insert, _update, _delete};
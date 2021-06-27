
 const get = async function get(con, name, status) {
    const results = await con.query(`SELECT * FROM attendance WHERE category = ? AND status = ?`,[name, status]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from attendance WHERE attendanceId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('attendance with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM attendance WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, calendarId, memberId, roll, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO attendance SET churchId = ?, calendarId = ?, memberId = ?, roll = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, calendarId, memberId, roll, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, calendarId, memberId, roll, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE attendance SET calendarId = ?, memberId = ?, roll = ?, enteredBy = ?, dateEntered = ? WHERE attendanceId = ?`,
  [calendarId, memberId, roll, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE attendance WHERE attendanceId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
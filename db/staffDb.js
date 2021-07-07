
 const getByDepartment = async function get(con, department) {
    const results = await con.query(`SELECT * FROM staff WHERE churchId = ? AND departmentId = ?`,[global.churchId, department]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from staff WHERE staffId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('staff with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM staff WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, firstName, lastName, middleName, jobTitle, departmentId, jobDescription, supervisor, dateHired, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO staff SET churchId = ?, firstName = ?, lastName = ?, middleName = ?, jobTitle = ?, departmentId = ?, jobDescription = ?, supervisor = ?, dateHired = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, firstName, lastName, middleName, jobTitle, departmentId, jobDescription, supervisor, dateHired, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, churchId, firstName, lastName, middleName, jobTitle, departmentId, jobDescription, supervisor, dateHired, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE staff SET firstName = ?, lastName = ?, middleName = ?, jobTitle = ?, departmentId = ?, jobDescription = ?, supervisor = ?, dateHired = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE staffId = ?`,
  [churchId, firstName, lastName, middleName, jobTitle, departmentId, jobDescription, supervisor, dateHired, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE staff WHERE staffId = ?', {id});
};

 module.exports = {getByDepartment, getById, getAll, _insert, _update, _delete};

 const getByContactType = async function get(con, contacttype) {
    const results = await con.query(`SELECT * FROM member WHERE churchId = ? AND contactType = ?`,[global.churchId, contactType]);
    return results[0];
 };

 const getByGender = async function get(con, gender) {
    const results = await con.query(`SELECT * FROM member WHERE churchId = ? AND gender = ?`,[global.churchId, gender]);
    return results[0];
 };

 const getByFamily = async function get(con, familyId) {
    const results = await con.query(`SELECT * FROM member WHERE churchId = ? AND familyId = ?`,[global.churchId, familyId]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from member WHERE memberId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('member with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM member WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, familyId, firstName, lastName, middleName, dob, gender, phone, email, membershipDate, title, contactType, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO member SET churchId = ?, familyId = ?, firstName = ?, lastName = ?, middleName = ?, dob = ?, gender = ?, phone = ?, email = ?, membershipDate = ?, title = ?, contactType = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, familyId, firstName, lastName, middleName, dob, gender, phone, email, membershipDate, title, contactType, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, familyId, firstName, lastName, middleName, dob, gender, phone, email, membershipDate, title, contactType, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE member SET familyId = ?, firstName = ?, lastName = ?, middleName = ?, dob = ?, gender = ?, phone = ?, email = ?, membershipDate = ?, title = ?, contactType = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE memberId = ?`,
  [familyId, firstName, lastName, middleName, dob, gender, phone, email, membershipDate, title, contactType, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE member WHERE memberId = ?', {id});
};

 module.exports = {getByContactType, getById, getByGender, getByFamily, getAll, _insert, _update, _delete};
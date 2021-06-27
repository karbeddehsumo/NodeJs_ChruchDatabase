
 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from announcement WHERE announcementId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('announcement with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM announcement WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, title, ministry1, ministry2, ministry3, startDate, endDate, message, access, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO announcement SET churchId = ?, title = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, startDate = ?, endDate = ?, message = ?, access = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, title, ministry1, ministry2, ministry3, startDate, endDate, message, access, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, title, ministry1, ministry2, ministry3, startDate, endDate, message, access, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE announcement SET title = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, startDate = ?, endDate = ?, message = ?, access = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE announcementId = ?`,
  [title, ministry1, ministry2, ministry3, startDate, endDate, message, access, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE announcement WHERE announcementId = ?', {id});
};

 module.exports = {getById, getAll, _insert, _update, _delete};
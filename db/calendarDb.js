
 const get = async function getByMinistry(con, ministryId, statDate, endDate) {
    const results = await con.query(`SELECT * FROM calendar WHERE ministry1 = ? OR ministry2 = ? OR ministry3 = ? AND startdate >= ? AND endDate <= ?`,[ministryId, ministryId, ministryId, startDate, enddate]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from calendar WHERE calendarId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('calendar with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM calendar WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, title, startDate, endDate, description, url, venue, access, ministry1, ministry2, ministry3, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO calendar SET churchId = ?, title = ?, startDate = ?, endDate = ?, description = ?, url = ?, venue = ?, access = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, title, startDate, endDate, description, url, venue, access, ministry1, ministry2, ministry3, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, title, startDate, endDate, description, url, venue, access, ministry1, ministry2, ministry3, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE calendar SET title = ?, startDate = ?, endDate = ?, description = ?, url = ?, venue = ?, access = ?, ministry1 = ?, ministry2 = ?, ministry3 = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE calendarId = ?`,
  [title, startDate, endDate, description, url, venue, access, ministry1, ministry2, ministry3, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE calendar WHERE calendarId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
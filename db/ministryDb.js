
 const get = async function getByTagName(con, tagName) {
    const results = await con.query(`SELECT * FROM ministry WHERE tagName = ?`,[tagName]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from ministry WHERE ministryId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('ministry with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM ministry WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, parentMinistryId, name, description, contact, email, phone, missionStatement, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO ministry SET churchId = ?, parentMinistryId = ?, name = ?, description = ?, contact = ?, email = ?, phone = ?, missionStatement = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, parentMinistryId, name, description, contact, email, phone, missionStatement, status, enteredBy, dateEntered ]
   );
 };

 const _update = async function update(con, parentMinistryId, name, description, contact, email, phone, missionStatement, status, enteredBy, dateEntered , id) {
  const result = await con.query(`UPDATE ministry SET parentMinistryId = ?, name = ?, description = ?, contact = ?, email = ?, phone = ?, missionStatement = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE ministryId = ?`,
  [parentMinistryId, name, description, contact, email, phone, missionStatement, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE ministry WHERE ministryId = ?', {id});
};

 module.exports = {get, getById, getAll, _insert, _update, _delete};
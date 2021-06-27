

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from family WHERE familyId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('family with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM family WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, familyName, address1, address2, city, state, zipcode, country, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO family SET churchId = ?, familyName = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, familyName, address1, address2, city, state, zipcode, country, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, familyName, address1, address2, city, state, zipcode, country, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE family SET familyName = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, country = ?, enteredBy = ?, dateEntered = ? WHERE familyId = ?`,
  [familyName, address1, address2, city, state, zipcode, country, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE family WHERE familyId = ?', {id});
};

 module.exports = {getById, getAll, _insert, _update, _delete};

 const getByTag = async function getByTag(con, tagName) {
    const results = await con.query(`SELECT * FROM church WHERE tagName = ?`,[tagName]);
    return results[0];
 };

 const getAllParents = async function getAllParents(con) {
    const results = await con.query(`SELECT * FROM church WHERE parentChurchId = ? AND status = ?`,[0, 'Active']);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query(`SELECT * from church WHERE churchId = ?`, [id]);
  if (result[0].length < 1) {
    throw new Error('Church with this id was not found');
  }
  return result[0][0];
}

const getByParentId = async function getByParentId(con, id) {
    const result = await con.query('SELECT * from church WHERE parentChurchId = ?', [id]);
    // if (result[0].length < 1) {
    //   throw new Error('Church with this id was not found');
    // }
    return result[0];
  }

const getAll =  async function getAll(con) {
  const results = await con.query(`SELECT * FROM church`);
  return results;
};

 const _insert = async function insert(con, parentChurchId, name, tagName, title, address1, address2, city, state, zipcode, founded, phone, email, motto, vision, country, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO church SET parentChurchId = ?, name = ?, tagName = ?, title = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, founded = ?, phone = ?, email = ?, motto = ?, vision = ?, country = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [parentChurchId, name, tagName, title, address1, address2, city, state, zipcode, founded, phone, email, motto, vision, country, status, enteredBy, dateEntered]
   );
   return result[0];
 };

 const _update = async function update(con, parentChurchId, name, tagName, title, address1, address2, city, state, zipcode, founded, phone, email, motto, vision, country, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE church SET  parentChurchId = ?, name = ?, tagName = ?, title = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ?, founded = ?, phone = ?, email = ?, motto = ?, vision = ?, country = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE churchId = ?`,
  [parentChurchId, name, tagName, title, address1, address2, city, state, zipcode, founded, phone, email, motto, vision, country, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.execute('DELETE church WHERE churchId = ?', {id});
};

 module.exports = {getByTag, getAllParents, getById, getByParentId, getAll, _insert, _update, _delete};
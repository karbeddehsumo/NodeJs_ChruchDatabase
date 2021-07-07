
 const getByAssignedTo = async function get(con, assignedTo) {
    const results = await con.query(`SELECT * FROM property WHERE churchId = ? AND assignedTo = ?`,[global.churchId, assignedTo]);
    return results[0];
 };

 const getByLocation = async function get(con, location) {
    const results = await con.query(`SELECT * FROM property WHERE churchId = ? AND location = ?`,[global.churchId, location]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from property WHERE propertyId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('property with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM property WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, pictureId, title, purchaseDate, value, quantity, description, location, assignedTo, assignedDate, conditionType, tagNumber, lastInventoryDate, comment, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO property SET churchId = ?, pictureId = ?, title = ?, purchaseDate = ?, value = ?, quantity = ?, description = ?, location = ?, assignedTo = ?, assignedDate = ?, conditionType = ?, tagNumber = ?, lastInventoryDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, pictureId, title, purchaseDate, value, quantity, description, location, assignedTo, assignedDate, conditionType, tagNumber, lastInventoryDate, comment, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, churchId, pictureId, title, purchaseDate, value, quantity, description, location, assignedTo, assignedDate, conditionType, tagNumber, lastInventoryDate, comment, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE property SET pictureId = ?, title = ?, purchaseDate = ?, value = ?, quantity = ?, description = ?, location = ?, assignedTo = ?, assignedDate = ?, conditionType = ?, tagNumber = ?, lastInventoryDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE propertyId = ?`,
  [churchId, pictureId, title, purchaseDate, value, quantity, description, location, assignedTo, assignedDate, conditionType, tagNumber, lastInventoryDate, comment, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE property WHERE propertyId = ?', {id});
};

 module.exports = {getByAssignedTo, getByLocation, getById, getAll, _insert, _update, _delete};
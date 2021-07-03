
 const get = async function get(con, name, status) {
    const results = await con.query(`SELECT * FROM constant WHERE category = ? AND status = ?`,[name, status]);
    return results[0];
 };

 const getByChurch = async function getByChurch(con, category, status, churchId) {
  const results = await con.query(`SELECT * FROM constant WHERE category = ? AND status = ? AND churchId = ?`,[category, status, churchId]);
  return results[0];
};

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from constant WHERE constantId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('Constant with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM constant WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO constant SET churchId = ?, category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, category, name, value1, value1, value3, sort, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE constant SET category = ?, name = ?, value1 = ?, value2 = ?, value3 = ?, sort = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE constantId = ?`,
  [category, name, value1, value1, value3, sort, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE constant WHERE constantId = ?', {id});
};

 module.exports = {get, getByChurch, getById, getAll, _insert, _update, _delete};
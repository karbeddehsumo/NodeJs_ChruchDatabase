
 const getByTable = async function get(con, table) {
    const results = await con.query(`SELECT * FROM tableData WHERE churchId = ? AND tableHeaderId = ?`,[global.churchId, table]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from tableData WHERE tableDataId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('tableData with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM tableData WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, tableHeaderId, churchId, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO tableData SET tableHeaderId = ?, churchId = ?, data1 = ?, data2 = ?, data3 = ?, data4 = ?, data5 = ?, data6 = ?, data7 = ?, data8 = ?, data9 = ?, data10 = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [tableHeader, churchId, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE tableData SET data1 = ?, data2 = ?, data3 = ?, data4 = ?, data5 = ?, data6 = ?, data7 = ?, data8 = ?, data9 = ?, data10 = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE tableDataId = ?`,
  [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE tableData WHERE tableDataId = ?', {id});
};

 module.exports = {getByTable, getById, getAll, _insert, _update, _delete};
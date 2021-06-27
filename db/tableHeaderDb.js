
 const getByMinistry = async function get(con, ministry) {
    const results = await con.query(`SELECT * FROM tableHeader WHERE churchId = ? AND ministryId = ?`,[global.churchId, ministry]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from tableHeader WHERE tableHeaderId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('tableHeader with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM tableHeader WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, ministryId, title, subTitle, columnName1, columnName2, columnName3, columnName4, columnName5, columnName6, columnName7, columnName8, columnName9, columnName10, dataType1, dataType2, dataType3, dataType4, dataType5, dataType6, dataType7, dataType8, dataType9, dataType10, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO tableHeader SET churchId = ?, ministryId = ?, title = ?, subTitle = ?, columnName1 = ?, columnName2 = ?, columnName3 = ?, columnName4 = ?, columnName5 = ?, columnName6 = ?, columnName7 = ?, columnName8 = ?, columnName9 = ?, columnName10 = ?, dataType1 = ?, dataType2 = ?, dataType3 = ?, dataType4 = ?, dataType5 = ?, dataType6 = ?, dataType7 = ?, dataType8 = ?, dataType9 = ?, dataType10 = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, ministryId, title, subTitle, columnName1, columnName2, columnName3, columnName4, columnName5, columnName6, columnName7, columnName8, columnName9, columnName10, dataType1, dataType2, dataType3, dataType4, dataType5, dataType6, dataType7, dataType8, dataType9, dataType10, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, ministryId, title, subTitle, columnName1, columnName2, columnName3, columnName4, columnName5, columnName6, columnName7, columnName8, columnName9, columnName10, dataType1, dataType2, dataType3, dataType4, dataType5, dataType6, dataType7, dataType8, dataType9, dataType10, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE tableHeader SET ministryId = ?, title = ?, subTitle = ?, columnName1 = ?, columnName2 = ?, columnName3 = ?, columnName4 = ?, columnName5 = ?, columnName6 = ?, columnName7 = ?, columnName8 = ?, columnName9 = ?, columnName10 = ?, dataType1 = ?, dataType2 = ?, dataType3 = ?, dataType4 = ?, dataType5 = ?, dataType6 = ?, dataType7 = ?, dataType8 = ?, dataType9 = ?, dataType10 = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE tableHeaderId = ?`,
  [ministryId, title, subTitle, columnName1, columnName2, columnName3, columnName4, columnName5, columnName6, columnName7, columnName8, columnName9, columnName10, dataType1, dataType2, dataType3, dataType4, dataType5, dataType6, dataType7, dataType8, dataType9, dataType10, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE tableHeader WHERE tableHeaderId = ?', {id});
};

 module.exports = {getByMinistry, getById, getAll, _insert, _update, _delete};
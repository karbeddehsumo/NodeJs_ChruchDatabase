
 const getByMinistry = async function get(con, ministry) {
    const results = await con.query(`SELECT * FROM story WHERE churchId = ? AND ministry = ?`,[global.churchId, ministry]);
    return results[0];
 };

 const getByPublish = async function get(con, startDate, endDate) {
    const results = await con.query(`SELECT * FROM story WHERE churchId = ? AND publishedStartDate >= ? AND publishedEndDate <= ?`,[global.churchId, startDate, endDate]);
    return results[0];
 };

 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from story WHERE storyId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('story with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM story WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, ministryId, title, subTitle, intro, story, publishedStartDate, publishedEndDate, author, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO story SET churchId = ?, ministryId = ?, title = ?, subTitle = ?, intro = ?, story = ?, publishedStartDate = ?, publishedEndDate = ?, author = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, ministryId, title, subTitle, intro, story, publishedStartDate, publishedEndDate, author, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, ministryId, title, subTitle, intro, story, publishedStartDate, publishedEndDate, author, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE story SET ministryId = ?, title = ?, subTitle = ?, intro = ?, story = ?, publishedStartDate = ?, publishedEndDate = ?, author = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE storyId = ?`,
  [ministryId, title, subTitle, intro, story, publishedStartDate, publishedEndDate, author, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE story WHERE storyId = ?', {id});
};

 module.exports = {getByMinistry, getByPublish, getById, getAll, _insert, _update, _delete};
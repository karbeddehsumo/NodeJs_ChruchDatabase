


 const getById = async function getById(con, id) {
  const result = await con.query('SELECT * from bill WHERE billId = ?', [id]);
  if (result[0].length < 1) {
    throw new Error('bill with this id was not found');
  }
  return result[0][0];
}

const getAll =  async function getAll(con, churchId) {
  const results = await con.query(`SELECT * FROM bill WHERE churchId = ?`,[churchId]);
  return results[0];
};

 const _insert = async function insert(con, churchId, payeeId, totalAmount, amountDue, dueDate, comment, status, enteredBy, dateEntered) {
   const result = await con.query(`INSERT INTO bill SET churchId = ?, payeeId = ?, totalAmount = ?, amountDue = ?, dueDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ?`,
   [churchId, payeeId, totalAmount, amountDue, dueDate, comment, status, enteredBy, dateEntered]
   );
 };

 const _update = async function update(con, payeeId, totalAmount, amountDue, dueDate, comment, status, enteredBy, dateEntered, id) {
  const result = await con.query(`UPDATE bill SET payeeId = ?, totalAmount = ?, amountDue = ?, dueDate = ?, comment = ?, status = ?, enteredBy = ?, dateEntered = ? WHERE billId = ?`,
  [payeeId, totalAmount, amountDue, dueDate, comment, status, enteredBy, dateEntered, id]
  );
};

const _delete = async function del(con, id) {
  await con.query('DELETE bill WHERE billId = ?', {id});
};

 module.exports = {getById, getAll, _insert, _update, _delete};
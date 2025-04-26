const db = require("../common/db");
const quangcao = (quangcao) => {
this.id = quangcao.id;
this.tenquangcao = quangcao.tenquangcao;
};
quangcao.getById = (id, callback) => {
  const sqlString = "SELECT * FROM quangcao WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

quangcao.getAll = (callback) => {
  const sqlString = "SELECT * FROM quangcao ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

quangcao.insert = (quangcao, callBack) => {
  const sqlString = "INSERT INTO quangcao SET ?";
  db.query(sqlString, quangcao, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...quangcao });
  });
};

quangcao.update = (quangcao, id, callBack) => {
  const sqlString = "UPDATE quangcao SET ? WHERE id = ?";
  db.query(sqlString, [quangcao, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật quangcao id = " + id + " thành công");
  });
};

quangcao.delete = (id, callBack) => {
  db.query("DELETE FROM quangcao WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa quangcao id = " + id + " thành công");
  });
};

module.exports = quangcao;

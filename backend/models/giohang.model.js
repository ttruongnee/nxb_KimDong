const db = require("../common/db");
const giohang = (giohang) => {
this.id = giohang.id;
this.makhachhang = giohang.makhachhang;
this.tongtien = giohang.tongtien;
};
giohang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM giohang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

giohang.getAll = (callback) => {
  const sqlString = "SELECT * FROM giohang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

giohang.insert = (giohang, callBack) => {
  const sqlString = "INSERT INTO giohang SET ?";
  db.query(sqlString, giohang, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...giohang });
  });
};

giohang.update = (giohang, id, callBack) => {
  const sqlString = "UPDATE giohang SET ? WHERE id = ?";
  db.query(sqlString, [giohang, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật giohang id = " + id + " thành công");
  });
};

giohang.delete = (id, callBack) => {
  db.query("DELETE FROM giohang WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa giohang id = " + id + " thành công");
  });
};

module.exports = giohang;

const db = require("../common/db");
const chitietgiohang = (chitietgiohang) => {
this.id = chitietgiohang.id;
this.magiohang = chitietgiohang.magiohang;
this.matruyen = chitietgiohang.matruyen;
this.soluong = chitietgiohang.soluong;
};
chitietgiohang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chitietgiohang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

chitietgiohang.getAll = (callback) => {
  const sqlString = "SELECT * FROM chitietgiohang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

chitietgiohang.insert = (chitietgiohang, callBack) => {
  const sqlString = "INSERT INTO chitietgiohang SET ?";
  db.query(sqlString, chitietgiohang, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...chitietgiohang });
  });
};

chitietgiohang.update = (chitietgiohang, id, callBack) => {
  const sqlString = "UPDATE chitietgiohang SET ? WHERE id = ?";
  db.query(sqlString, [chitietgiohang, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật chitietgiohang id = " + id + " thành công");
  });
};

chitietgiohang.delete = (id, callBack) => {
  db.query("DELETE FROM chitietgiohang WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa chitietgiohang id = " + id + " thành công");
  });
};

module.exports = chitietgiohang;

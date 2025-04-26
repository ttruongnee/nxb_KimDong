const db = require("../common/db");
const chitietdonhang = (chitietdonhang) => {
  this.id = chitietdonhang.id;
  this.madonhang = chitietdonhang.madonhang;
  this.matruyen = chitietdonhang.matruyen;
  this.soluong = chitietdonhang.soluong;
};
chitietdonhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chitietdonhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

chitietdonhang.getByIdDonHang = (madonhang, callback) => {
  const sqlString = "SELECT * FROM chitietdonhang WHERE madonhang = ? ";
  db.query(sqlString, madonhang, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

chitietdonhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM chitietdonhang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

chitietdonhang.insert = (chitietdonhang, callBack) => {
  const sqlString = "INSERT INTO chitietdonhang SET ?";
  db.query(sqlString, chitietdonhang, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...chitietdonhang });
  });
};

chitietdonhang.update = (chitietdonhang, id, callBack) => {
  const sqlString = "UPDATE chitietdonhang SET ? WHERE id = ?";
  db.query(sqlString, [chitietdonhang, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật chitietdonhang id = " + id + " thành công");
  });
};

chitietdonhang.delete = (id, callBack) => {
  db.query("DELETE FROM chitietdonhang WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa chitietdonhang id = " + id + " thành công");
  });
};

module.exports = chitietdonhang;

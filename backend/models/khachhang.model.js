const db = require("../common/db");
const khachhang = (khachhang) => {
  this.id = khachhang.id;
  this.tenkhachhang = khachhang.tenkhachhang;
  this.gioitinh = khachhang.gioitinh;
  this.sodienthoai = khachhang.sodienthoai;
  this.email = khachhang.email;
  this.diachinhanhang = khachhang.diachinhanhang;
  this.taikhoan = khachhang.taikhoan;
};
khachhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khachhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

khachhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM khachhang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

khachhang.insert = (khachhang, callBack) => {
  const sqlString = "INSERT INTO khachhang SET ?";
  db.query(sqlString, khachhang, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...khachhang });
  });
};

khachhang.update = (khachhang, id, callBack) => {
  const sqlString = "UPDATE khachhang SET ? WHERE id = ?";
  db.query(sqlString, [khachhang, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật khachhang id = " + id + " thành công");
  });
};

khachhang.delete = (id, callBack) => {
  db.query("DELETE FROM khachhang WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa khachhang id = " + id + " thành công");
  });
};

module.exports = khachhang;

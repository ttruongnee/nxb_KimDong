const db = require("../common/db");
const donhang = (donhang) => {
  this.id = donhang.id;
  this.makhachhangdathang = donhang.makhachhangdathang;
  this.manhanvienxulydonhang = donhang.manhanvienxulydonhang;
  this.ngaydathang = donhang.ngaydathang;
  this.diachigiaohang = donhang.diachigiaohang;
  this.trangthai = donhang.trangthai;
  this.phuongthucthanhtoan = donhang.phuongthucthanhtoan;
  this.magiamgia = donhang.magiamgia;
  this.tongtien = donhang.tongtien;
};
donhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM donhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

donhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM donhang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

donhang.insert = (donhang, callBack) => {
  const sqlString = "INSERT INTO donhang SET ?";
  db.query(sqlString, donhang, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...donhang });
  });
};

donhang.update = (donhang, id, callBack) => {
  const sqlString = "UPDATE donhang SET ? WHERE id = ?";
  db.query(sqlString, [donhang, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật donhang id = " + id + " thành công");
  });
};

donhang.delete = (id, callBack) => {
  db.query("DELETE FROM donhang WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa donhang id = " + id + " thành công");
  });
};

module.exports = donhang;

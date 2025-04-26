const db = require("../common/db");
const nhanvien = (nhanvien) => {
this.id = nhanvien.id;
this.tennhanvien = nhanvien.tennhanvien;
this.gioitinh = nhanvien.gioitinh;
this.quequan = nhanvien.quequan;
this.sodienthoai = nhanvien.sodienthoai;
this.email = nhanvien.email;
this.taikhoan = nhanvien.taikhoan;
};
nhanvien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nhanvien WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

nhanvien.getAll = (callback) => {
  const sqlString = "SELECT * FROM nhanvien ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

nhanvien.insert = (nhanvien, callBack) => {
  const sqlString = "INSERT INTO nhanvien SET ?";
  db.query(sqlString, nhanvien, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...nhanvien });
  });
};

nhanvien.update = (nhanvien, id, callBack) => {
  const sqlString = "UPDATE nhanvien SET ? WHERE id = ?";
  db.query(sqlString, [nhanvien, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật nhanvien id = " + id + " thành công");
  });
};

nhanvien.delete = (id, callBack) => {
  db.query("DELETE FROM nhanvien WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa nhanvien id = " + id + " thành công");
  });
};

module.exports = nhanvien;

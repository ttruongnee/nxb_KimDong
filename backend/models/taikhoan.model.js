const db = require("../common/db");
const taikhoan = (taikhoan) => {
this.id = taikhoan.id;
this.matkhau = taikhoan.matkhau;
this.quyen = taikhoan.quyen;
};
taikhoan.getById = (id, callback) => {
  const sqlString = "SELECT * FROM taikhoan WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

taikhoan.getAll = (callback) => {
  const sqlString = "SELECT * FROM taikhoan ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

taikhoan.insert = (taikhoan, callBack) => {
  const sqlString = "INSERT INTO taikhoan SET ?";
  db.query(sqlString, taikhoan, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...taikhoan });
  });
};

taikhoan.update = (taikhoan, id, callBack) => {
  const sqlString = "UPDATE taikhoan SET ? WHERE id = ?";
  db.query(sqlString, [taikhoan, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật taikhoan id = " + id + " thành công");
  });
};

taikhoan.delete = (id, callBack) => {
  db.query("DELETE FROM taikhoan WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa taikhoan id = " + id + " thành công");
  });
};

module.exports = taikhoan;

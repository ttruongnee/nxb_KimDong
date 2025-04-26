const db = require("../common/db");
const giamgia = (giamgia) => {
this.id = giamgia.id;
this.ngaybatdau = giamgia.ngaybatdau;
this.ngayketthuc = giamgia.ngayketthuc;
this.phantramgiamgia = giamgia.phantramgiamgia;
};
giamgia.getById = (id, callback) => {
  const sqlString = "SELECT * FROM giamgia WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

giamgia.getAll = (callback) => {
  const sqlString = "SELECT * FROM giamgia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

giamgia.insert = (giamgia, callBack) => {
  const sqlString = "INSERT INTO giamgia SET ?";
  db.query(sqlString, giamgia, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...giamgia });
  });
};

giamgia.update = (giamgia, id, callBack) => {
  const sqlString = "UPDATE giamgia SET ? WHERE id = ?";
  db.query(sqlString, [giamgia, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật giamgia id = " + id + " thành công");
  });
};

giamgia.delete = (id, callBack) => {
  db.query("DELETE FROM giamgia WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa giamgia id = " + id + " thành công");
  });
};

module.exports = giamgia;

const db = require("../common/db");
const theloai = (theloai) => {
this.id = theloai.id;
this.tentheloai = theloai.tentheloai;
this.mota = theloai.mota;
};
theloai.getById = (id, callback) => {
  const sqlString = "SELECT * FROM theloai WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

theloai.getAll = (callback) => {
  const sqlString = "SELECT * FROM theloai ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

theloai.insert = (theloai, callBack) => {
  const sqlString = "INSERT INTO theloai SET ?";
  db.query(sqlString, theloai, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...theloai });
  });
};

theloai.update = (theloai, id, callBack) => {
  const sqlString = "UPDATE theloai SET ? WHERE id = ?";
  db.query(sqlString, [theloai, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật theloai id = " + id + " thành công");
  });
};

theloai.delete = (id, callBack) => {
  db.query("DELETE FROM theloai WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa theloai id = " + id + " thành công");
  });
};

module.exports = theloai;

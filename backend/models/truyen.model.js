const db = require("../common/db");
const truyen = (truyen) => {
  this.id = truyen.id;
  this.anhtruyen = truyen.anhtruyen;
  this.tentruyen = truyen.tentruyen;
  this.isbn = truyen.isbn;
  this.tacgia = truyen.tacgia;
  this.doituong = truyen.doituong;
  this.sotrang = truyen.sotrang;
  this.dinhdang = truyen.dinhdang;
  this.trongluong = truyen.trongluong;
  this.matheloai = truyen.matheloai;
  this.soluong = truyen.soluong;
  this.giagoc = truyen.giagoc;
  this.phantramgiamgia = truyen.phantramgiamgia;
  this.giaban = truyen.giaban;
};
truyen.getById = (id, callback) => {
  const sqlString = "SELECT * FROM truyen WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

truyen.getAll = (callback) => {
  const sqlString = "SELECT * FROM truyen ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

truyen.insert = (truyen, callBack) => {
  const sqlString = "INSERT INTO truyen SET ?";
  db.query(sqlString, truyen, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...truyen });
  });
};

truyen.update = (truyen, id, callBack) => {
  const sqlString = "UPDATE truyen SET ? WHERE id = ?";
  db.query(sqlString, [truyen, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật truyen id = " + id + " thành công");
  });
};

truyen.delete = (id, callBack) => {
  db.query("DELETE FROM truyen WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa truyen id = " + id + " thành công");
  });
};

module.exports = truyen;

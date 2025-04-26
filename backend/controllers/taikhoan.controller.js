const Taikhoan = require("../models/taikhoan.model");

module.exports = {
  getAll: (req, res) => {
    Taikhoan.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Taikhoan.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const taikhoan = req.body;
    Taikhoan.insert(taikhoan, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const taikhoan = req.body;
    const id = req.params.id;
    Taikhoan.update(taikhoan, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Taikhoan.delete(id, (result) => {
      res.send(result);
    });
  }
};

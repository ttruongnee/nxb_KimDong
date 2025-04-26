const Nhanvien = require("../models/nhanvien.model");

module.exports = {
  getAll: (req, res) => {
    Nhanvien.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Nhanvien.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const nhanvien = req.body;
    Nhanvien.insert(nhanvien, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const nhanvien = req.body;
    const id = req.params.id;
    Nhanvien.update(nhanvien, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Nhanvien.delete(id, (result) => {
      res.send(result);
    });
  }
};

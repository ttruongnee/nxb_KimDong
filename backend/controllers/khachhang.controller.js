const Khachhang = require("../models/khachhang.model");

module.exports = {
  getAll: (req, res) => {
    Khachhang.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Khachhang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const khachhang = req.body;
    Khachhang.insert(khachhang, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const khachhang = req.body;
    const id = req.params.id;
    Khachhang.update(khachhang, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Khachhang.delete(id, (result) => {
      res.send(result);
    });
  }
};

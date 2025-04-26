const Chitietdonhang = require("../models/chitietdonhang.model");

module.exports = {
  getAll: (req, res) => {
    Chitietdonhang.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Chitietdonhang.getById(id, (result) => {
      res.send(result);
    });
  },

  getByIdDonHang: (req, res) => {
    const madonhang = req.params.madonhang;
    Chitietdonhang.getByIdDonHang(madonhang, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const chitietdonhang = req.body;
    Chitietdonhang.insert(chitietdonhang, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const chitietdonhang = req.body;
    const id = req.params.id;
    Chitietdonhang.update(chitietdonhang, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Chitietdonhang.delete(id, (result) => {
      res.send(result);
    });
  }
};

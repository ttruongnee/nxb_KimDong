const Chitietgiohang = require("../models/chitietgiohang.model");

module.exports = {
  getAll: (req, res) => {
    Chitietgiohang.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Chitietgiohang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const chitietgiohang = req.body;
    Chitietgiohang.insert(chitietgiohang, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const chitietgiohang = req.body;
    const id = req.params.id;
    Chitietgiohang.update(chitietgiohang, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Chitietgiohang.delete(id, (result) => {
      res.send(result);
    });
  }
};

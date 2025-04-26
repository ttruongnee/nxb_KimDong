const Giohang = require("../models/giohang.model");

module.exports = {
  getAll: (req, res) => {
    Giohang.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Giohang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const giohang = req.body;
    Giohang.insert(giohang, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const giohang = req.body;
    const id = req.params.id;
    Giohang.update(giohang, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Giohang.delete(id, (result) => {
      res.send(result);
    });
  }
};

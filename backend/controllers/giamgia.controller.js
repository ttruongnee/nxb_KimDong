const Giamgia = require("../models/giamgia.model");

module.exports = {
  getAll: (req, res) => {
    Giamgia.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Giamgia.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const giamgia = req.body;
    Giamgia.insert(giamgia, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const giamgia = req.body;
    const id = req.params.id;
    Giamgia.update(giamgia, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Giamgia.delete(id, (result) => {
      res.send(result);
    });
  }
};

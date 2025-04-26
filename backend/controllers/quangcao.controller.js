const Quangcao = require("../models/quangcao.model");

module.exports = {
  getAll: (req, res) => {
    Quangcao.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Quangcao.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const quangcao = req.body;
    Quangcao.insert(quangcao, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const quangcao = req.body;
    const id = req.params.id;
    Quangcao.update(quangcao, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Quangcao.delete(id, (result) => {
      res.send(result);
    });
  }
};

const Donhang = require("../models/donhang.model");

module.exports = {
  getAll: (req, res) => {
    Donhang.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Donhang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const donhang = req.body;
    Donhang.insert(donhang, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const donhang = req.body;
    const id = req.params.id;
    Donhang.update(donhang, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Donhang.delete(id, (result) => {
      res.send(result);
    });
  }
};

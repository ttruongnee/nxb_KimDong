const Truyen = require("../models/truyen.model");

module.exports = {
  getAll: (req, res) => {
    Truyen.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Truyen.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const truyen = req.body;
    Truyen.insert(truyen, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const truyen = req.body;
    const id = req.params.id;
    Truyen.update(truyen, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Truyen.delete(id, (result) => {
      res.send(result);
    });
  }
};

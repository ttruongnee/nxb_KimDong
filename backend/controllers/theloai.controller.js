const Theloai = require("../models/theloai.model");

module.exports = {
  getAll: (req, res) => {
    Theloai.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Theloai.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const theloai = req.body;
    Theloai.insert(theloai, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const theloai = req.body;
    const id = req.params.id;
    Theloai.update(theloai, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Theloai.delete(id, (result) => {
      res.send(result);
    });
  }
};

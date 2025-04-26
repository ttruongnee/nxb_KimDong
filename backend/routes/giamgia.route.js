var express = require('express');
var router = express.Router();
const giamgiaController = require("../controllers/giamgia.controller");

/* GET users listing. */
router.get('/', giamgiaController.getAll);
router.get('/:id', giamgiaController.getById);
router.post('/', giamgiaController.insert);
router.put('/:id', giamgiaController.update);
router.delete('/:id', giamgiaController.delete);

module.exports = router;

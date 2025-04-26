var express = require('express');
var router = express.Router();
const khachhangController = require("../controllers/khachhang.controller");

/* GET users listing. */
router.get('/', khachhangController.getAll);
router.get('/:id', khachhangController.getById);
router.post('/', khachhangController.insert);
router.put('/:id', khachhangController.update);
router.delete('/:id', khachhangController.delete);

module.exports = router;

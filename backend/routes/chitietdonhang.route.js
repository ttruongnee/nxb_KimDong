var express = require('express');
var router = express.Router();
const chitietdonhangController = require("../controllers/chitietdonhang.controller");

/* GET users listing. */
router.get('/', chitietdonhangController.getAll);
router.get('/:id', chitietdonhangController.getById);
router.get('/donhang/:madonhang', chitietdonhangController.getByIdDonHang);
router.post('/', chitietdonhangController.insert);
router.put('/:id', chitietdonhangController.update);
router.delete('/:id', chitietdonhangController.delete);

module.exports = router;

var express = require('express');
var router = express.Router();
const chitietgiohangController = require("../controllers/chitietgiohang.controller");

/* GET users listing. */
router.get('/', chitietgiohangController.getAll);
router.get('/:id', chitietgiohangController.getById);
router.get('/giohang/:magiohang', chitietgiohangController.getByIdGioHang);
router.post('/', chitietgiohangController.insert);
router.put('/:id', chitietgiohangController.update);
router.delete('/:id', chitietgiohangController.delete);

module.exports = router;

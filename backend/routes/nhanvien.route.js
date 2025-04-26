var express = require('express');
var router = express.Router();
const nhanvienController = require("../controllers/nhanvien.controller");

/* GET users listing. */
router.get('/', nhanvienController.getAll);
router.get('/:id', nhanvienController.getById);
router.post('/', nhanvienController.insert);
router.put('/:id', nhanvienController.update);
router.delete('/:id', nhanvienController.delete);

module.exports = router;

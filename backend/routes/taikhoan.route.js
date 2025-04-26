var express = require('express');
var router = express.Router();
const taikhoanController = require("../controllers/taikhoan.controller");

/* GET users listing. */
router.get('/', taikhoanController.getAll);
router.get('/:id', taikhoanController.getById);
router.post('/', taikhoanController.insert);
router.put('/:id', taikhoanController.update);
router.delete('/:id', taikhoanController.delete);

module.exports = router;

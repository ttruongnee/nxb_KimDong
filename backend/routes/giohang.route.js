var express = require('express');
var router = express.Router();
const giohangController = require("../controllers/giohang.controller");


router.get('/', giohangController.getAll);
router.get('/:id', giohangController.getById);
router.post('/', giohangController.insert);
router.put('/:id', giohangController.update);
router.delete('/:id', giohangController.delete);

module.exports = router;

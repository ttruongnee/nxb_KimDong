var express = require('express');
var router = express.Router();
const donhangController = require("../controllers/donhang.controller");

/* GET users listing. */
router.get('/', donhangController.getAll);
router.get('/:id', donhangController.getById);
router.post('/', donhangController.insert);
router.put('/:id', donhangController.update);
router.delete('/:id', donhangController.delete);

module.exports = router;

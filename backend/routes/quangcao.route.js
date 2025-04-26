var express = require('express');
var router = express.Router();
const quangcaoController = require("../controllers/quangcao.controller");

/* GET users listing. */
router.get('/', quangcaoController.getAll);
router.get('/:id', quangcaoController.getById);
router.post('/', quangcaoController.insert);
router.put('/:id', quangcaoController.update);
router.delete('/:id', quangcaoController.delete);

module.exports = router;

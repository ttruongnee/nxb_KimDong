var express = require('express');
var router = express.Router();
const truyenController = require("../controllers/truyen.controller");
const xacthuc = require('../middleware/auth');

/* GET users listing. */
router.get('/', truyenController.getAll);
router.get('/:id', truyenController.getById);
router.post('/', truyenController.insert);
router.put('/:id', truyenController.update);
router.delete('/:id', truyenController.delete);

module.exports = router;

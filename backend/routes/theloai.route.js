var express = require('express');
var router = express.Router();
const theloaiController = require("../controllers/theloai.controller");

/* GET users listing. */
router.get('/', theloaiController.getAll);
router.get('/:id', theloaiController.getById);
router.post('/', theloaiController.insert);
router.put('/:id', theloaiController.update);
router.delete('/:id', theloaiController.delete);

module.exports = router;

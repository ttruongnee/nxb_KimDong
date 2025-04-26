var express = require('express');
var router = express.Router();
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'nxbkimdong'
})
connection.connect()

/* GET home page. */
router.get('/', function (req, res, next) {
    // connection.query('SELECT * from truyen', (err, rows, fields) => {
    //   if (err) throw err
    //   res.json({ data: rows });
    // })

    res.send('Chào mừng bạn đến với Hướng Dẫn Xác Thực Bearer Token!');
});


module.exports = router;

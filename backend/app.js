var createError = require('http-errors');
var express = require('express');
var path = require('path');
const db = require('./common/db');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const xacthuc = require('./middleware/auth');

var indexRouter = require('./routes/index');
var chitietdonhangRouter = require('./routes/chitietdonhang.route');
var chitietgiohangRouter = require('./routes/chitietgiohang.route');
var donhangRouter = require('./routes/donhang.route');
var giamgiaRouter = require('./routes/giamgia.route');
var giohangRouter = require('./routes/giohang.route');
var khachhangRouter = require('./routes/khachhang.route');
var nhanvienRouter = require('./routes/nhanvien.route');
var quangcaoRouter = require('./routes/quangcao.route');
var taikhoanRouter = require('./routes/taikhoan.route');
var theloaiRouter = require('./routes/theloai.route');
var truyenRouter = require('./routes/truyen.route');
var app = express();

//Thêm CORS để cho phép frontend truy cập
const cors = require('cors');
app.use(cors()); // Cho phép mọi request từ frontend



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter); 
app.use('/chitietdonhangs', chitietdonhangRouter);
app.use('/chitietgiohangs', chitietgiohangRouter);
app.use('/donhangs', donhangRouter);
app.use('/giamgias', giamgiaRouter);
app.use('/giohangs', giohangRouter);
app.use('/khachhangs', khachhangRouter);
app.use('/nhanviens', nhanvienRouter);
app.use('/quangcaos', quangcaoRouter);
app.use('/taikhoans', taikhoanRouter);
app.use('/theloais', theloaiRouter);
app.use('/truyens', truyenRouter);


//---------------------------------------------------------------------------------
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const PORT = 3001;
const SECRET_KEY = 'password2';

app.use(bodyParser.json());

app.post('/login/khachhang', (req, res) => {
  const { id, matkhau } = req.body;

  db.query('CALL sp_LoginUser(?, ?)', [id, matkhau], (err, results) => {
    if (err) {
      console.error('Lỗi gọi sp_LoginUser:', err);
      return res.status(500).send('Lỗi server khi xác thực khách hàng.');
    }

    if (results[0].length > 0) {
      const userInfo = results[0][0];
      const token = jwt.sign(userInfo, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      return res.status(400).send('Tài khoản hoặc mật khẩu không đúng cho khách hàng.');
    }
  });
});

app.post('/login/admin', (req, res) => {
  const { id, matkhau } = req.body;

  db.query('CALL sp_LoginAdmin(?, ?)', [id, matkhau], (err, results) => {
    if (err) {
      console.error('Lỗi gọi sp_LoginAdmin:', err);
      return res.status(500).send('Lỗi server khi xác thực nhân viên/admin.');
    }

    if (results[0].length > 0) {
      const userInfo = results[0][0];
      const token = jwt.sign(userInfo, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      return res.status(400).send('Tài khoản hoặc mật khẩu không đúng cho nhân viên/admin.');
    }
  });
});

// Route bảo mật 
app.get('/baomat', xacthuc(['Admin', 'Nhân viên', 'Khách hàng']), (req, res) => {
  res.json(req.user);
});
//---------------------------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'password2';

const xacthuc = (arrQuyen = []) => { // Nhận một mảng các vai trò được yêu cầu
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401); // Unauthorized
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden (token không hợp lệ)
            }

            req.user = decoded; // Gán thông tin người dùng từ token vào req.user

            // Kiểm tra quyền truy cập
            if (arrQuyen.length > 0 && !arrQuyen.includes(req.user.quyen_nguoi_dung)) {
                return res.status(403).send({ message: "Không có quyền truy cập" });
            }

            next();
        });
    };
};

module.exports = xacthuc;
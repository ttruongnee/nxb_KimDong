import React, { useState } from 'react';
import styles from './login.module.css';
import '../../component/grid.css';
import '../../component/style.css';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../decodeToken';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    //xử lý thay đổi id - sự kiện onChange
    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    //xử lý thay đổi mật khẩu - sự kiện onChange
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    //chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //xử lý đăng nhập
    const handleLogin = async (event) => {
        event.preventDefault();

        const loginEndpoint = 'http://localhost:3001/login/khachhang';

        try {
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id.toLowerCase(), matkhau: password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                alert('Đăng nhập thành công!');

                // Sử dụng hàm decodeToken để lấy thông tin người dùng
                const userInfo = decodeToken(token);
                if (userInfo && userInfo.ten_nguoi_dung) {
                    localStorage.setItem('tenKhachHang', userInfo.ten_nguoi_dung);
                }

                navigate('/');  //chuyển trang về trang chủ
                window.location.reload();
            } else {
                alert('Tài khoản hoặc mật khẩu không đúng.');
                console.error('Lỗi đăng nhập:', response.status);
            }
        } catch (error) {
            alert('Lỗi kết nối.');
            console.error('Lỗi đăng nhập:', error);
        }
    };

    return (
        <div className="grid wide">
            <div id="main" className="row flex-center">
                <form id="main-form" onSubmit={handleLogin}>
                    <h1 className="flex-center">ĐĂNG NHẬP</h1>
                    <input
                        className={`${styles.textbox}`}
                        type="text"
                        placeholder="Tài khoản"
                        required
                        value={id}
                        onChange={handleIdChange}
                    />
                    <div className={styles['main-input']}>
                        <input
                            className={`${styles.textbox}`}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <span
                            className={styles['password-toggle-icon']}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
                        </span>
                    </div>
                    <button type="submit" className={`${styles.textbox} ${styles.dangnhap}`}>
                        <b>Đăng nhập</b>
                    </button>
                    <p className={`chucnang flex-center ${styles.chucnang}`}>
                        <a className="a-red" href="/dangky">
                            Đăng ký
                        </a>
                    </p>
                    <p className={`chucnang flex-center ${styles.chucnang}`}>
                        <a className="a-red" href="/quenmatkhau">
                            Quên mật khẩu?
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
// src/component/header/useCheckLogin.js
import { useState, useEffect } from 'react';

const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tenKhach, setTenKhach] = useState('');

    useEffect(() => {
        const storedTenKhachHang = localStorage.getItem('tenKhachHang');
        if (storedTenKhachHang) {
            setTenKhach(storedTenKhachHang);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setTenKhach('');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tenKhachHang');
        setIsLoggedIn(false);
        setTenKhach('');
        // Bạn có thể thêm các hành động khác sau khi đăng xuất ở đây
    };

    const setAuthInfo = (tenKhachHang) => {
        setTenKhach(tenKhachHang);
        setIsLoggedIn(true);
    };

    // Hàm này để cập nhật trạng thái đăng nhập từ bên ngoài hook
    const updateLoginStatus = (newTenKhach) => {
        setTenKhach(newTenKhach);
        setIsLoggedIn(true);
    };

    return { isLoggedIn, tenKhach, handleLogout, setAuthInfo, updateLoginStatus };
};

export default useCheckLogin;
// src/component/header/useCheckLogin.js
import { useState, useEffect } from 'react';
import axios from 'axios';

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

    const handleLogout = async () => {
        //thêm lưu dữ liệu giỏ hàng vào api
        await luuGioHang();

        localStorage.removeItem('token');
        localStorage.removeItem('tenKhachHang');
        localStorage.removeItem('maKhachHang');
        localStorage.removeItem('user_id');
        localStorage.removeItem('GioHang');
        setIsLoggedIn(false);
        setTenKhach('');

    };

    const setAuthInfo = (tenKhachHang) => {
        setTenKhach(tenKhachHang);
        setIsLoggedIn(true);
    };

    const updateLoginStatus = (newTenKhach) => {
        setTenKhach(newTenKhach);
        setIsLoggedIn(true);
    };

    function taoID() {
        // Lấy thời gian hiện tại (dạng số), chuyển thành chuỗi base 36 và lấy 5 ký tự cuối
        var phan1 = Date.now().toString(36).slice(-5);
        // Tạo một số ngẫu nhiên từ 0 đến gần 1, chuyển thành chuỗi base 36 và lấy 3 ký tự cuối
        var phan2 = Math.random().toString(36).slice(-3);
        // Kết hợp hai phần để tạo ID
        return phan1 + phan2;
    }

    // function funcGetTongTien() {
    //     const arrGioHang = Object.values(JSON.parse(localStorage.getItem('GioHang') || '{}'));
    //     var tongtien = 0;
    //     // Duyệt qua từng sản phẩm trong giỏ hàng
    //     for (var i = 0; i < arrGioHang.length; i++) {
    //         var sanPham = arrGioHang[i];
    //         // Tính tiền của sản phẩm hiện tại (giá nhân số lượng) và cộng vào tổng tiền
    //         tongtien = tongtien + sanPham.GiaBanTruyen * sanPham.SoLuongTruyen;
    //     }
    //     // Trả về tổng tiền
    //     return tongtien;
    // }


    const luuGioHang = async () => {
        await xoaGioHang();

        const gioHangLocal = localStorage.getItem('GioHang');
        const arrGioHang = Object.values(JSON.parse(gioHangLocal || '{}'));
        console.log('GioHang trước khi lưu', arrGioHang);



        const gioHang = {
            id: localStorage.getItem('user_id'),
            maKhachHang: localStorage.getItem('maKhachHang'),
            tongTien: arrGioHang.reduce((sum, item) => sum + item.GiaBanTruyen * item.SoLuongTruyen, 0),
        };

        const chiTietGioHang = arrGioHang.map(item => ({
            id: taoID(),
            magiohang: localStorage.getItem('user_id'),
            matruyen: item.ID,
            soluong: item.SoLuongTruyen
        }));

        try {
            await axios.post('http://localhost:3001/giohangs/', gioHang);
            for (const chitiet of chiTietGioHang) {
                await axios.post('http://localhost:3001/chitietgiohangs/', chitiet);
            }
        } catch (error) {
            console.error('Lỗi tạo giỏ hàng:', error);
            alert('Lỗi khi lưu giỏ hàng vào csdl. Vui lòng thử lại sau.');
        }
    };


    const xoaGioHang = async () => {
        try {
            await axios.delete(`http://localhost:3001/giohangs/${localStorage.getItem('user_id')}`);

        } catch (error) {
            console.error('Lỗi xoá giỏ hàng:', error);
            alert('Lỗi khi xoá giỏ hàng khỏi csdl. Vui lòng thử lại sau.');
        }
    };

    return { isLoggedIn, tenKhach, handleLogout, setAuthInfo, updateLoginStatus };
};

export default useCheckLogin;
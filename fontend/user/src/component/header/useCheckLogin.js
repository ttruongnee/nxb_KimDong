// src/component/header/useCheckLogin.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGioHang } from '../payment/useGioHang';

const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tenKhach, setTenKhach] = useState('');
    const { arrGioHang } = useGioHang();

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

    function funcGetTongTien() {
        var tongtien = 0;
        // Duyệt qua từng sản phẩm trong giỏ hàng
        for (var i = 0; i < arrGioHang.length; i++) {
            var sanPham = arrGioHang[i];
            // Tính tiền của sản phẩm hiện tại (giá nhân số lượng) và cộng vào tổng tiền
            tongtien = tongtien + sanPham.GiaBanTruyen * sanPham.SoLuongTruyen;
        }
        // Trả về tổng tiền
        return tongtien;
    }


    const luuGioHang = async () => {
        console.log('arrGioHang 1', arrGioHang);
        console.log('giỏ hàng 1', localStorage.getItem('GioHang'));


        await xoaGioHang();

        console.log('arrGioHang 2', arrGioHang);
        console.log('giỏ hàng 2', localStorage.getItem('GioHang'));


        const gioHang = { id: localStorage.getItem('user_id'), maKhachHang: localStorage.getItem('maKhachHang'), tongTien: funcGetTongTien() }
        const chiTietGioHang = [];
        for (let i = 0; i < arrGioHang.length; i++) {
            const item = arrGioHang[i];

            chiTietGioHang.push({
                id: taoID(),
                magiohang: localStorage.getItem('user_id'),
                matruyen: item.ID,
                soluong: item.SoLuongTruyen
            });
        }
        console.log('arrGioHang 3', arrGioHang);
        console.log('giỏ hàng 3', localStorage.getItem('GioHang'));


        try {
            await axios.post('http://localhost:3001/giohangs/', gioHang);

            for (let i = 0; i < chiTietGioHang.length; i++) {
                const chitiet = chiTietGioHang[i];
                await axios.post('http://localhost:3001/chitietgiohangs/', chitiet);
                console.log('Chi tiết giỏ hàng đã tạo:', chitiet);
            }
            console.log('arrGioHang 4', arrGioHang);
            console.log('giỏ hàng 4', localStorage.getItem('GioHang'));

            localStorage.removeItem('GioHang');
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
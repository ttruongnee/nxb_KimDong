import { useState, useEffect } from 'react';
import axios from 'axios';

const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  //trạng thái đang đăng nhập hay không
    const [tenKhach, setTenKhach] = useState('');  //tên khách hiển thị trên header

    useEffect(() => {
        const tenKhachHang = localStorage.getItem('tenKhachHang');
        if (tenKhachHang) {  //nếu có tên khách trong local -> đã đăng nhập
            setTenKhach(tenKhachHang);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setTenKhach('');
        }
    }, []);


    const handleLogout = async () => {
        //lưu dữ liệu giỏ hàng của khách hàng vào csdl
        await luuGioHang();

        //xoá thông tin lưu trên local
        localStorage.removeItem('token');
        localStorage.removeItem('tenKhachHang');
        localStorage.removeItem('maKhachHang');
        localStorage.removeItem('user_id');
        localStorage.removeItem('GioHang');

        //gán về trạng thái chưa đăng nhập
        setIsLoggedIn(false);
        setTenKhach('');

    };

    //gán thông tin khi đã đăng nhập (dùng trong header)
    const setAuthInfo = (tenKhachHang) => {
        setTenKhach(tenKhachHang);
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

    function getTongTien(arrGioHang) {
        var tongtien = 0;
        for (var i = 0; i < arrGioHang.length; i++) {
            var sanPham = arrGioHang[i];
            tongtien += sanPham.GiaBanTruyen * sanPham.SoLuongTruyen;
        }
        return tongtien;
    }


    const luuGioHang = async () => {
        //xoá thông tin giỏ hàng của khách hàng này trong csdl trước khi lưu thông tin giỏ hàng mới
        await xoaGioHang();

        const gioHangLocal = localStorage.getItem('GioHang');
        const arrGioHang = Object.values(JSON.parse(gioHangLocal || '{}'));  //chuyển chuỗi json thành đối tượng sau đó chuyển đối tượng thành mảng


        const gioHang = {
            id: localStorage.getItem('user_id'),
            maKhachHang: localStorage.getItem('maKhachHang'),
            tongTien: getTongTien(arrGioHang),
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
            alert('Hệ thống không thể lưu lại thông tin giỏ hàng của bạn, xin lỗi vì sự bất tiện!');
        }
    };


    const xoaGioHang = async () => {
        try {
            await axios.delete(`http://localhost:3001/giohangs/${localStorage.getItem('user_id')}`);

        } catch (error) {
            console.error('Lỗi xoá giỏ hàng:', error);
            alert('Có lỗi khi xoá giỏ hàng khỏi csdl!');
        }
    };

    return { isLoggedIn, tenKhach, handleLogout, setAuthInfo };
};

export default useCheckLogin;


//done
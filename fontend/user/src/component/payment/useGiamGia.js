import { useState } from 'react';
import axios from 'axios';

export const useGiamGia = () => {
    // State lưu trữ giá trị người dùng nhập vào ô mã giảm giá
    const [inputMGG, setInputMGG] = useState('');
    // State lưu trữ thông tin mã giảm giá đã áp dụng thành công (nếu có)
    const [maApDungThanhCong, setMaApDungThanhCong] = useState(null);
    // State lưu trữ phần trăm giảm giá
    const [phanTramGG, setPhanTramGG] = useState(0);
    // State lưu trữ thông báo về mã giảm giá
    const [thongBaoGG, setThongBaoGG] = useState('');

    // Hàm xử lý khi giá trị trong ô mã giảm giá thay đổi
    const onChangeMGG = (event) => {
        setInputMGG(event.target.value);
        setThongBaoGG(''); // Xóa thông báo cũ khi người dùng nhập lại
        setMaApDungThanhCong(null); // Đặt lại mã áp dụng thành công
        setPhanTramGG(0); // Đặt lại phần trăm giảm
    };

    // Hàm xử lý khi người dùng nhấn nút "Áp dụng"
    const funcApDungMGG = () => {
        const maNguoiDungNhap = inputMGG.trim().toUpperCase(); // Lấy mã đã nhập, loại bỏ khoảng trắng và chuyển thành chữ in hoa

        if (maNguoiDungNhap) {
            // Gọi API để lấy danh sách mã giảm giá
            axios.get('http://localhost:3001/giamgias/')
                .then(response => {
                    const danhSachMaGiamGia = response.data;
                    // Tìm mã giảm giá trong danh sách khớp với mã người dùng nhập
                    const maTimThay = danhSachMaGiamGia.find(maGG => maGG.id.toUpperCase() === maNguoiDungNhap); // 'id' là tên trường trong API

                    if (maTimThay) {
                        const ngayHienTai = new Date();
                        const ngayBatDau = new Date(maTimThay.ngaybatdau); // 'ngaybatdau' là tên trường trong API
                        const ngayKetThuc = new Date(maTimThay.ngayketthuc); // 'ngayketthuc' là tên trường trong API

                        // Kiểm tra xem mã giảm giá có còn hiệu lực không
                        if (ngayHienTai >= ngayBatDau && ngayHienTai <= ngayKetThuc) {
                            setMaApDungThanhCong(maTimThay);
                            setPhanTramGG(maTimThay.phantramgiamgia); // 'phantramgiamgia' là tên trường trong API
                            setThongBaoGG(`Áp dụng mã ${maNguoiDungNhap} thành công! Giảm ${maTimThay.phantramgiamgia}%`);
                        } else if (ngayHienTai < ngayBatDau) {
                            setMaApDungThanhCong(null);
                            setPhanTramGG(0);
                            setThongBaoGG(`Mã ${maNguoiDungNhap} chưa đến thời gian áp dụng!`);
                        } else {
                            setMaApDungThanhCong(null);
                            setPhanTramGG(0);
                            setThongBaoGG(`Mã ${maNguoiDungNhap} đã hết hạn!`);
                        }
                    } else {
                        setMaApDungThanhCong(null);
                        setPhanTramGG(0);
                        setThongBaoGG(`Mã ${maNguoiDungNhap} không tồn tại!`);
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu giảm giá:', error);
                    setMaApDungThanhCong(null);
                    setPhanTramGG(0);
                    setThongBaoGG('Có lỗi xảy ra khi kiểm tra mã giảm giá.');
                });
        } else {
            setMaApDungThanhCong(null);
            setPhanTramGG(0);
            setThongBaoGG('Vui lòng nhập mã giảm giá.');
        }
    };

    // Trả về các state và hàm để component khác sử dụng
    return {
        inputMGG, // Giá trị mã giảm giá người dùng nhập
        maApDungThanhCong, // Thông tin mã giảm giá đã áp dụng thành công (object) hoặc null
        phanTramGG, // Phần trăm giảm giá (số)
        thongBaoGG, // Thông báo về trạng thái mã giảm giá (chuỗi)
        onChangeMGG, // Hàm xử lý thay đổi ở ô nhập mã
        funcApDungMGG // Hàm xử lý khi áp dụng mã giảm giá
    };
};
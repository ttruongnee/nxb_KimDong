import { useState } from 'react';
import axios from 'axios';

export const useGiamGia = () => {
    const [inputMGG, setInputMGG] = useState('');
    const [maApDungThanhCong, setMaApDungThanhCong] = useState(null);
    const [phanTramGG, setPhanTramGG] = useState(0);
    const [thongBaoGG, setThongBaoGG] = useState('');

    const onChangeMGG = (event) => {
        setInputMGG(event.target.value);
        setThongBaoGG('');
        setMaApDungThanhCong(null);
        setPhanTramGG(0);
    };

    const funcApDungMGG = () => {
        const maNguoiDungNhap = inputMGG.trim().toUpperCase();

        if (maNguoiDungNhap) {
            axios.get('http://localhost:3001/giamgias/')
                .then(response => {
                    const danhSachMaGiamGia = response.data;
                    const maTimThay = danhSachMaGiamGia.find(maGG => maGG.id.toUpperCase() === maNguoiDungNhap);

                    if (maTimThay) {
                        const ngayHienTai = new Date();
                        const ngayBatDau = new Date(maTimThay.ngaybatdau);
                        const ngayKetThuc = new Date(maTimThay.ngayketthuc);

                        if (ngayHienTai >= ngayBatDau && ngayHienTai <= ngayKetThuc) {
                            setMaApDungThanhCong(maTimThay);
                            setPhanTramGG(maTimThay.phantramgiamgia);
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

    return {
        inputMGG,
        maApDungThanhCong,
        phanTramGG,
        thongBaoGG,
        onChangeMGG, // Hàm xử lý thay đổi ở ô nhập mã
        funcApDungMGG // Hàm xử lý khi áp dụng mã giảm giá
    };
};
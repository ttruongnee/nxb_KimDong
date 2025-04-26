import { useState, useEffect } from 'react';
import useFetchData from '../useFetchData';

const API_URL_PROVINCES = 'https://provinces.open-api.vn/api/';

export const useDiaChi = () => {
    // State cho danh sách tỉnh thành
    const [dsTinh, setDsTinh] = useState([]);
    // State cho danh sách quận huyện
    const [dsHuyen, setDsHuyen] = useState([]);
    // State cho danh sách phường xã
    const [dsXa, setDsXa] = useState([]);

    // State cho mã tỉnh đã chọn
    const [maTinhChon, setMaTinhChon] = useState('');
    // State cho mã huyện đã chọn
    const [maHuyenChon, setMaHuyenChon] = useState('');
    // State cho mã xã đã chọn
    const [maXaChon, setMaXaChon] = useState('');

    // Lấy dữ liệu tỉnh thành từ API
    const { data: duLieuTinh, loading: dangTaiTinh, error: loiTaiTinh } = useFetchData(API_URL_PROVINCES);

    // Khi có dữ liệu tỉnh, cập nhật danh sách
    useEffect(() => {
        if (duLieuTinh) {
            setDsTinh(duLieuTinh);
        }
    }, [duLieuTinh]);

    // Khi mã tỉnh thay đổi, lấy danh sách huyện
    useEffect(() => {
        if (maTinhChon) {
            fetch(`https://provinces.open-api.vn/api/p/${maTinhChon}?depth=2`)
                .then(res => res.json())
                .then(data => {
                    if (data?.districts) {
                        setDsHuyen(Object.values(data.districts));
                        setDsXa([]);
                        setMaHuyenChon('');
                        setMaXaChon('');
                    } else {
                        setDsHuyen([]);
                        setDsXa([]);
                        setMaHuyenChon('');
                        setMaXaChon('');
                    }
                })
                .catch(err => console.error('Lỗi lấy huyện:', err));
        } else {
            setDsHuyen([]);
            setDsXa([]);
            setMaHuyenChon('');
            setMaXaChon('');
        }
    }, [maTinhChon]);

    // Khi mã huyện thay đổi, lấy danh sách xã
    useEffect(() => {
        if (maHuyenChon && maTinhChon) {
            fetch(`https://provinces.open-api.vn/api/d/${maHuyenChon}?depth=2`)
                .then(res => res.json())
                .then(data => {
                    if (data?.wards) {
                        setDsXa(Object.values(data.wards));
                        setMaXaChon('');
                    } else {
                        setDsXa([]);
                        setMaXaChon('');
                    }
                })
                .catch(err => console.error('Lỗi lấy xã:', err));
        } else {
            setDsXa([]);
            setMaXaChon('');
        }
    }, [maHuyenChon, maTinhChon]);

    // Hàm xử lý khi chọn tỉnh
    const chonTinh = (event) => {
        setMaTinhChon(event.target.value);
    };

    // Hàm xử lý khi chọn huyện
    const chonHuyen = (event) => {
        setMaHuyenChon(event.target.value);
    };

    // Hàm xử lý khi chọn xã
    const chonXa = (event) => {
        setMaXaChon(event.target.value);
    };

    return {
        dsTinh, // Danh sách tỉnh thành
        dsHuyen, // Danh sách quận huyện
        dsXa, // Danh sách phường xã
        maTinhChon, // Mã tỉnh đã chọn
        maHuyenChon, // Mã quận huyện đã chọn
        maXaChon, // Mã phường xã đã chọn
        chonTinh, // Hàm xử lý khi chọn tỉnh
        chonHuyen, // Hàm xử lý khi chọn huyện
        chonXa, // Hàm xử lý khi chọn xã
        dangTaiTinh, // Trạng thái đang tải tỉnh thành
        loiTaiTinh, // Lỗi khi tải tỉnh thành
    };
};
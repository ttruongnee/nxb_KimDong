import { useState, useEffect } from 'react';
import useFetchData from '../useFetchData';

const API_URL_PROVINCES = 'https://provinces.open-api.vn/api/';

export const useDiaChi = () => {
    const [dsTinh, setDsTinh] = useState([]);
    const [dsHuyen, setDsHuyen] = useState([]);
    const [dsXa, setDsXa] = useState([]);

    const [maTinhChon, setMaTinhChon] = useState('');
    const [maHuyenChon, setMaHuyenChon] = useState('');
    const [maXaChon, setMaXaChon] = useState('');

    const { data: duLieuTinh, loading: dangTaiTinh, error: loiTaiTinh } = useFetchData(API_URL_PROVINCES);

    useEffect(() => {
        if (duLieuTinh) {
            setDsTinh(duLieuTinh);
        }
    }, [duLieuTinh]);

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

    const chonTinh = (event) => {
        setMaTinhChon(event.target.value);
    };

    const chonHuyen = (event) => {
        setMaHuyenChon(event.target.value);
    };

    const chonXa = (event) => {
        setMaXaChon(event.target.value);
    };

    return {
        dsTinh,
        dsHuyen,
        dsXa,
        maTinhChon,
        maHuyenChon,
        maXaChon,
        chonTinh, // Hàm xử lý khi chọn tỉnh
        chonHuyen, // Hàm xử lý khi chọn huyện
        chonXa, // Hàm xử lý khi chọn xã
        dangTaiTinh,
        loiTaiTinh,
    };
};
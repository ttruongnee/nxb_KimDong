import React, { useState, useEffect } from 'react';
import styles from './payment.module.css';
import '../../component/grid.css';
import '../../component/style.css';
import axios from 'axios';
import { decodeToken } from '../decodeToken';
import { useDiaChi } from './useDiaChi';
import { useGioHang } from './useGioHang';
import { useGiamGia as useMaGiamGia } from './useGiamGia';
import { funcGetTongTien, funcTongTienSauGG, taoID, convertNgayThangNam } from './utils';

const Payment = () => {
    const qrpay = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290558/qr-pay_sawmmr.jpg';

    // State cho phương thức thanh toán
    const [phuongThucTT, setPhuongThucTT] = useState('Thanh toán khi nhận hàng');
    // State cho địa chỉ cụ thể
    const [diaChiCT, setDiaChiCT] = useState('');
    // State cho mã khách hàng đặt hàng
    const [maKHDatHang, setMaKHDatHang] = useState(null);

    // Sử dụng custom hook quản lý địa chỉ
    const {
        dsTinh,
        dsHuyen,
        dsXa,
        maTinhChon,
        maHuyenChon,
        maXaChon,
        chonTinh,
        chonHuyen,
        chonXa
    } = useDiaChi();

    // Sử dụng custom hook quản lý giỏ hàng với tên biến mới
    const { objGioHang, arrGioHang } = useGioHang();

    // Sử dụng custom hook quản lý giảm giá với tên biến và hàm mới
    const {
        inputMGG,
        maApDungThanhCong,
        phanTramGG,
        thongBaoGG,
        onChangeMGG,
        funcApDungMGG
    } = useMaGiamGia();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = decodeToken(token);
                setMaKHDatHang(decoded?.ma_nguoi_dung || null);
            } catch (error) {
                console.error('Lỗi giải mã token:', error);
                setMaKHDatHang(null);
            }
        } else {
            setMaKHDatHang(null);
        }
    }, []);

    //xử lý thay đổi phương thức thanh toán
    const thayDoiPhuongThucTT = (event) => {
        setPhuongThucTT(event.target.value);
    };

    const layThongTinDonHang = () => {
        let tinhDaChon = null;
        for (let i = 0; i < dsTinh.length; i++) {
            if (dsTinh[i].code === parseInt(maTinhChon, 10)) {
                tinhDaChon = dsTinh[i];
                break;
            }
        }

        let huyenDaChon = null;
        for (let i = 0; i < dsHuyen.length; i++) {
            if (dsHuyen[i].code === parseInt(maHuyenChon, 10)) {
                huyenDaChon = dsHuyen[i];
                break;
            }
        }

        let xaDaChon = null;
        for (let i = 0; i < dsXa.length; i++) {
            if (dsXa[i].code === parseInt(maXaChon, 10)) {
                xaDaChon = dsXa[i];
                break;
            }
        }

        const diaChiGiaoHang = diaChiCT + ', ' + (xaDaChon ? xaDaChon.name : '') + ', ' + (huyenDaChon ? huyenDaChon.name : '') + ', ' + (tinhDaChon ? tinhDaChon.name : '');
        const maDonHang = taoID();
        const ngayDatHang = convertNgayThangNam(new Date());

        const donHang = {
            id: maDonHang,
            makhachhangdathang: maKHDatHang,
            manhanvienxulydonhang: null,
            ngaydathang: ngayDatHang,
            diachigiaohang: diaChiGiaoHang,
            trangthai: 'Chờ xử lý',
            phuongthucthanhtoan: phuongThucTT,
            magiamgia: maApDungThanhCong ? maApDungThanhCong.id : null,
            tongtien: funcTongTienSauGG(funcGetTongTien(objGioHang), phanTramGG)
        };

        const chiTietDonHang = [];
        for (let i = 0; i < arrGioHang.length; i++) {
            const item = arrGioHang[i];
            chiTietDonHang.push({
                id: taoID(),
                madonhang: maDonHang,
                matruyen: item.ID,
                soluong: item.SoLuongTruyen
            });
        }

        return { donHang, chiTietDonHang };
    };

    const clickDatHang = async (event) => {
        event.preventDefault();
        const { donHang, chiTietDonHang } = layThongTinDonHang();
        console.log('Đơn hàng đã tạo:', donHang);

        try {
            await axios.post('http://localhost:3001/donhangs/', donHang);

            for (let i = 0; i < chiTietDonHang.length; i++) {
                const chitiet = chiTietDonHang[i];
                await axios.post('http://localhost:3001/chitietdonhangs/', chitiet);
                console.log('Chi tiết đơn hàng đã tạo:', chitiet);

                try {
                    const kqTruyen = await axios.get(`http://localhost:3001/truyens/${chitiet.matruyen}`);
                    const currentTruyen = kqTruyen.data[0];
                    const soLuongTruyenConLai = currentTruyen.soluong - chitiet.soluong;

                    if (soLuongTruyenConLai >= 0) {
                        await axios.put(`http://localhost:3001/truyens/${chitiet.matruyen}`, { soluong: soLuongTruyenConLai });
                        console.log(`Đã cập nhật số lượng truyện ${chitiet.matruyen} còn lại: ${soLuongTruyenConLai}`);
                    } else {
                        console.error(`Không đủ số lượng truyện ${chitiet.matruyen}. Đặt: ${chitiet.soluong}, Hiện có: ${currentTruyen.soluong}`);
                        alert(`Rất tiếc, số lượng truyện ${currentTruyen.tentruyen} không đủ. Vui lòng kiểm tra lại giỏ hàng.`);
                        return;
                    }
                } catch (error) {
                    console.error(`Lỗi cập nhật số lượng truyện ${chitiet.matruyen}:`, error);
                    alert(`Lỗi cập nhật số lượng truyện. Vui lòng thử lại sau.`);
                    return;
                }
            }

            localStorage.removeItem('GioHang');
            alert('Đặt hàng thành công!');
            window.location.href = '/';
        } catch (error) {
            console.error('Lỗi tạo đơn hàng:', error);
            alert('Lỗi đặt hàng. Vui lòng thử lại sau.');
        }
    };

    return (
        <div id="main" className="grid wide">
            <div className="row displayflex">
                <div id="sanphamdamua" className={`col c-12 m-12 l-6`}>
                    <div id="list-product" className={styles['list-product']}>
                        {arrGioHang.length > 0 ? (
                            arrGioHang.map(function (item) {
                                return (
                                    <div className={styles['product-item']} key={item.ID}>
                                        <div className={styles['product-img']}>
                                            <img src={item.AnhTruyen} alt={item.TenTruyen} />
                                            <span className={styles['soluongsp']}>{item.SoLuongTruyen}</span>
                                        </div>
                                        <div className={styles['product-info']}>
                                            <h5 className={styles['product-name']}>{item.TenTruyen}</h5>
                                            <p className={styles['product-price']}>{item.GiaBanTruyen ? item.GiaBanTruyen.toLocaleString('vi-VN') : 0}đ</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Không có sản phẩm trong giỏ hàng.</p>
                        )}
                    </div>
                    <div id="giamgia" className={styles['giamgia']}>
                        <input
                            type="text"
                            placeholder="Nhập mã giảm giá"
                            id="magiamgia"
                            required
                            className={styles['giamgia-input']}
                            value={inputMGG}
                            onChange={onChangeMGG}
                        />
                        <button type="button" className={styles['giamgia-button']} onClick={funcApDungMGG}>
                            Áp dụng
                        </button>
                    </div>
                    {thongBaoGG && (
                        <div className={`${maApDungThanhCong ? styles['success-apply'] : styles['fail-apply']}`}>
                            {thongBaoGG}
                        </div>
                    )}
                    <div className={styles['tongtien']}>
                        <p>
                            Tạm tính <span className={styles['product-tamtinh']}>{funcGetTongTien(objGioHang).toLocaleString('vi-VN')}đ</span>
                        </p>
                        <p>
                            Phí ship <span className={styles['ship-fee']}>Miễn phí</span>
                        </p>
                        {phanTramGG > 0 && (
                            <p>
                                Chiết khấu mã giảm giá <span className={styles['product-discount']}>-{(funcGetTongTien(objGioHang) * phanTramGG / 100).toLocaleString('vi-VN')}đ ({phanTramGG}%)</span>
                            </p>
                        )}
                        <p className={styles['tt']}>
                            Tổng tiền <span className={styles['product-tongtien']}>{funcTongTienSauGG(funcGetTongTien(objGioHang), phanTramGG).toLocaleString('vi-VN')}đ</span>
                        </p>
                    </div>
                </div>

                <form id="main-form" className={`col c-12 m-12 l-o-1 l-5 ${styles['main-form']}`} onSubmit={clickDatHang}>
                    <h1 className={`flex-center ${styles['delivery-header']}`}>ĐỊA CHỈ GIAO HÀNG</h1>
                    <select
                        id="city"
                        className={`${styles.textbox} ${styles['city-select']}`}
                        style={{ cursor: "pointer" }}
                        required
                        onChange={chonTinh}
                        value={maTinhChon}
                    >
                        <option value="" disabled>Chọn tỉnh thành</option>
                        {dsTinh.map(function (province) {
                            return <option key={province.code} value={province.code}>{province.name}</option>;
                        })}
                    </select>
                    <select
                        id="district"
                        className={`${styles.textbox} ${styles['district-select']}`}
                        style={{ cursor: "pointer" }}
                        required
                        onChange={chonHuyen}
                        value={maHuyenChon}
                        disabled={!maTinhChon}
                    >
                        <option value="" disabled>Chọn quận huyện</option>
                        {dsHuyen.map(function (district) {
                            return <option key={district.code} value={district.code}>{district.name}</option>;
                        })}
                    </select>
                    <select
                        id="ward"
                        className={`${styles.textbox} ${styles['ward-select']}`}
                        style={{ cursor: "pointer" }}
                        required
                        onChange={chonXa}
                        value={maXaChon}
                        disabled={!maHuyenChon}
                    >
                        <option value="" disabled>Chọn phường xã</option>
                        {dsXa.map(function (ward) {
                            return <option key={ward.code} value={ward.code}>{ward.name}</option>;
                        })}
                    </select>
                    <input
                        id="diachicuthe"
                        className={`${styles.textbox} ${styles['specific-address']}`}
                        type="text"
                        placeholder="Địa chỉ cụ thể"
                        required
                        value={diaChiCT}
                        onChange={function (e) { setDiaChiCT(e.target.value); }}
                    />
                    <div id="phuongthucthanhtoan" className={styles['phuongthucthanhtoan']}>
                        <label className={styles['thanhtoan-option']}>
                            <input
                                type="radio"
                                name="phuongthuc"
                                value="Thanh toán khi nhận hàng"
                                required
                                checked={phuongThucTT === 'Thanh toán khi nhận hàng'}
                                onChange={thayDoiPhuongThucTT}
                            />
                            <span>Thanh toán khi nhận hàng</span>
                        </label>
                        <label className={styles['thanhtoan-option']}>
                            <input
                                type="radio"
                                name="phuongthuc"
                                value="Chuyển khoản ngân hàng"
                                required
                                checked={phuongThucTT === 'Chuyển khoản ngân hàng'}
                                onChange={thayDoiPhuongThucTT}
                            />
                            <span>Chuyển khoản ngân hàng</span>
                        </label>
                    </div>
                    {phuongThucTT === 'Chuyển khoản ngân hàng' && (
                        <div id="qr-pay" className={styles['qr-pay']}>
                            <p className={`flex-center ${styles['qr-pay-text']}`}>Chuyển khoản tại đây</p>
                            <div className={`flex-center`}>
                                <img
                                    className={`flex-center ${styles['img-qr-pay']}`}
                                    src={qrpay}
                                    alt="qr-pay"
                                />
                            </div>
                        </div>
                    )}
                    <button id="dathang" type="submit" style={{ height: 35 }} className={styles['dathang']}>
                        <b>Đặt hàng</b>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
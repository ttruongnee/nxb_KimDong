// shoppingcart.js
import React, { useState, useEffect } from "react";
import '../../component/grid.css';
import styles from './shoppingcart.module.css';
import '../../component/style.css';
import updateCartCount from '../updateCartCount';
import ArrowInputTypeNumber from "../ArrowInputTypeNumber";
import { Link } from 'react-router-dom'; // Import Link để chuyển trang

function GioHang() {
    const [gioHang, setGioHang] = useState({});

    useEffect(() => {
        const duLieuGioHang = JSON.parse(localStorage.getItem('GioHang')) || {};
        setGioHang(duLieuGioHang);
        updateCartCount(); // Gọi khi component mount (lần đầu)
    }, []);

    function capNhatGioHang(gioHangMoi) {
        setGioHang(gioHangMoi);
        localStorage.setItem('GioHang', JSON.stringify(gioHangMoi));
        updateCartCount();
        window.dispatchEvent(new CustomEvent('cartUpdated')); // Dispatch custom event
    }

    function capNhatSoLuong(idSP, soLuong) {
        if (soLuong <= 0) return;

        const gioHangMoi = { ...gioHang };
        if (gioHangMoi[idSP]) {
            gioHangMoi[idSP].SoLuongTruyen = soLuong;
            gioHangMoi[idSP].TongTien = soLuong * gioHangMoi[idSP].GiaBanTruyen;
        }
        capNhatGioHang(gioHangMoi);
    }

    function xoaKhoiGioHang(idSP) {
        const gioHangMoi = { ...gioHang };
        delete gioHangMoi[idSP];
        capNhatGioHang(gioHangMoi);
    }

    function tinhTongTamTinh() {
        return Object.values(gioHang).reduce((tong, sanPham) => tong + sanPham.TongTien, 0);
    }

    // Kiểm tra nếu giỏ hàng trống
    if (Object.keys(gioHang).length === 0) {
        return (
            <div id="giohangtrong" className="grid wide">
                <div className="row">
                    <div className="col" style={{ lineHeight: 1.6 }}>
                        Giỏ hàng trống <br />
                        Tiếp tục mua hàng{" "}
                        <Link to="/" className="a-red" style={{ cursor: 'pointer' }}>
                            tại đây
                        </Link>
                        .
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid wide">
            <div className="row">
                <table className={`${styles['tableCart']}`}>
                    <thead className={`${styles['tieude']}`}>
                        <tr>
                            <th colSpan={2} className="text-center">Sản phẩm</th>
                            <th className="text-center">Đơn giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Tổng giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(gioHang).map((idSP) => {
                            const sp = gioHang[idSP];
                            return (
                                <tr key={idSP} className={`${styles['cart-product']}`}>
                                    <td>
                                        <Link to={`/truyen/${idSP}`}>
                                            <img className={`${styles['cart-product-img']}`} src={sp.AnhTruyen} alt={idSP} />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/truyen/${idSP}`}>
                                            <h2>{sp.TenTruyen}</h2>
                                        </Link>
                                        <div style={{ marginTop: '5px' }} />
                                        <a className={`${styles['cart-product-remove']}`} onClick={() => xoaKhoiGioHang(idSP)}>Xóa</a>
                                    </td>
                                    <td className="text-center">
                                        <b>{sp.GiaBanTruyen.toLocaleString('vi-VN')}đ</b>
                                    </td>
                                    <td>
                                        <ArrowInputTypeNumber
                                            value={sp.SoLuongTruyen}
                                            onChange={(value) => capNhatSoLuong(idSP, value)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <b>{sp.TongTien.toLocaleString('vi-VN')}đ</b>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col c-o-4 c-8 m-o-8 m-4 l-o-9 l-3" style={{ display: "inline-flex", lineHeight: 3, justifyContent: "flex-end" }}>
                    <p className="flex-center">Tạm tính: &nbsp;</p>
                    <b>
                        <p className={`${styles['tamtinh']}`}>{tinhTongTamTinh().toLocaleString('vi-VN')}đ</p>
                    </b>
                </div>
                <div className="col c-o-8 c-4 m-o-8 m-4 l-o-9 l-3">
                    <Link to="/payment" className="a-white" style={{ cursor: 'pointer' }}>
                        <button id="thanhtoan" type="submit" className={`${styles['thanhtoan']}`}>
                            <b>Thanh toán</b>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GioHang;
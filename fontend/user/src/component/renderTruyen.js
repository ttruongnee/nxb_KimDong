import React, { useState } from "react";
import styles from './home/home.module.css';
import { editTenTruyen } from "./editTenTruyen";

const SO_TRUYEN_MOI_TRANG = 12;

const RenderTruyen = ({
    truyens = [],
    tieude = "",
    on_xemthem = true,
    link_xemthem = "",
    on_phantrang = true,
    soLuongHienThi = null // Số lượng truyện hiển thị, null có nghĩa là hiển thị tất cả (trước khi phân trang)
}) => {
    const [trangHienTai, setTrangHienTai] = useState(1);
    const tongSoTruyen = truyens.length;
    const soTrang = Math.ceil(tongSoTruyen / SO_TRUYEN_MOI_TRANG);

    // Xác định số lượng truyện hiển thị dựa trên prop soLuongHienThi và phân trang
    const soLuongTruyen = soLuongHienThi !== null ? Math.min(soLuongHienThi, tongSoTruyen) : tongSoTruyen;
    const indexBatDau = on_phantrang ? (trangHienTai - 1) * SO_TRUYEN_MOI_TRANG : 0;
    const indexKetThuc = on_phantrang ? Math.min(indexBatDau + SO_TRUYEN_MOI_TRANG, soLuongTruyen) : soLuongTruyen;
    const truyenHienThi = truyens.slice(0, soLuongTruyen).slice(indexBatDau, indexKetThuc);

    const chuyenTrang = (soTrangMoi) => {
        setTrangHienTai(soTrangMoi);
    };

    const hienThiSoTrang = () => {
        const cacSoTrang = [];
        for (let i = 1; i <= soTrang; i++) {
            cacSoTrang.push(
                <div
                    key={i}
                    className={`${styles['trang-phan-trang']} ${trangHienTai === i ? styles['trang-phan-trang-chon'] : ''}`}
                    onClick={() => chuyenTrang(i)}
                >
                    <span>
                        <b>{i}</b>
                    </span>
                </div>
            );
        }

        if (soTrang <= 3) {
            return cacSoTrang;
        }

        const trangDau = cacSoTrang[0];
        const trangCuoi = cacSoTrang[soTrang - 1];
        const trangHienTaiIndex = trangHienTai - 1;

        if (trangHienTaiIndex < 3) {
            return [trangDau, cacSoTrang[1], cacSoTrang[2], <span key="dots-start" className="flex-center" style={{ margin: "0px 10px" }}>...</span>, trangCuoi];
        }

        if (trangHienTaiIndex > soTrang - 4) {
            return [trangDau, <span key="dots-end" className="flex-center" style={{ margin: "0px 10px" }}>...</span>, cacSoTrang[soTrang - 3], cacSoTrang[soTrang - 2], trangCuoi];
        }

        return [trangDau, <span key="dots-middle-start" className="flex-center" style={{ margin: "0px 10px" }}>...</span>, cacSoTrang[trangHienTaiIndex - 1], cacSoTrang[trangHienTaiIndex], cacSoTrang[trangHienTaiIndex + 1], <span key="dots-middle-end" className="flex-center" style={{ margin: "0px 10px" }}>...</span>, trangCuoi];
    };

    if (!truyens || truyens.length === 0) return null;

    return (
        <div className={`grid wide ${styles['list-product']}`}>
            {tieude && <h2 style={{ textTransform: 'uppercase' }}>{tieude}</h2>}
            <div className={`row ${styles['list-item']}`}>
                {truyenHienThi.map((truyen) => (
                    <div key={truyen.id} className={`col l-2-4 m-3 c-4 ${styles['col']}`}>
                        <div className={styles['product']}>
                            <a href={`/truyen/${truyen.id}`} className="a-black">
                                <div className={styles['product-img']}>
                                    <img src={truyen.anhtruyen} alt={truyen.tentruyen} className={styles['product-img']} />
                                </div>
                                <h4 className={styles['product-name']}>{editTenTruyen(truyen.tentruyen)}</h4>
                                <div className={styles['product-price']}>
                                    <span className={styles['current-price']}><b>{Number(truyen.giaban).toLocaleString()}₫</b></span>
                                    {truyen.giagoc && (
                                        <span className={styles['original-price']}>
                                            <s><b>{Number(truyen.giagoc).toLocaleString()}₫</b></s>
                                        </span>
                                    )}
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {on_xemthem && (
                <div className="row">
                    <a className={`col l-12 m-12 c-12 a-red ${styles['xemthem']}`} href={link_xemthem}>
                        <span>Xem thêm &gt;&gt;</span>
                    </a>
                </div>
            )}
            {on_phantrang && soTrang > 1 && (
                <div className={styles['phan-trang']}>
                    {hienThiSoTrang()}
                </div>
            )}
        </div>
    );
};

export default RenderTruyen;
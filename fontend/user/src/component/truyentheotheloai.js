import React, { useEffect, useState, useRef } from "react";
import useFetchData from './useFetchData';
import styles from './home/home.module.css';
import categoryStyles from './category/category.module.css';
import CheckScreenSize from './useCheckScreenSize';
import { editTenTruyen } from "./editTenTruyen";

const SO_TRUYEN_MOI_TRANG = 10;

const TruyenTheoTheLoai = ({ matheloai, soluong = 5, on_xemthem = true, on_phantrang = true }) => {
    const [listTruyenTheoTL, setListTruyenTheoTL] = useState([]);
    const [tenTheLoai, setTenTheLoai] = useState("");
    const [trangHienTai, setTrangHienTai] = useState(1);
    const mobileRefs = useRef([]);

    const { data: listAllTruyen } = useFetchData("http://localhost:3001/truyens");
    const { data: listTheLoai } = useFetchData("http://localhost:3001/theloais");

    CheckScreenSize(mobileRefs);

    useEffect(() => {
        if (!listAllTruyen || !listTheLoai) return;

        const truyenTheoTL = listAllTruyen.filter(truyen => truyen.matheloai === matheloai);
        setListTruyenTheoTL(truyenTheoTL);

        for (let i = 0; i < listTheLoai.length; i++) {
            const tl = listTheLoai[i];
            if (String(tl.id).trim() === String(matheloai).trim()) {
                setTenTheLoai(tl.tentheloai);
                break;
            }
        }
    }, [listAllTruyen, listTheLoai, matheloai]);

    const tongSoTruyen = listTruyenTheoTL.length;
    const soTrang = Math.ceil(tongSoTruyen / SO_TRUYEN_MOI_TRANG);

    let viTriBatDau = 0;
    let viTriKetThuc = soluong;
    if (on_phantrang) {
        viTriBatDau = (trangHienTai - 1) * SO_TRUYEN_MOI_TRANG;
        viTriKetThuc = Math.min(viTriBatDau + SO_TRUYEN_MOI_TRANG, tongSoTruyen);
    } else {
        viTriKetThuc = Math.min(soluong, tongSoTruyen);
    }

    const truyenHienThi = listTruyenTheoTL.slice(viTriBatDau, viTriKetThuc);

    const chuyenTrang = (soTrangMoi) => {
        setTrangHienTai(soTrangMoi);
    };

    const hienThiSoTrang = () => {
        if (!on_phantrang || soTrang <= 1) return null;

        const dsSoTrang = [];
        for (let i = 1; i <= soTrang; i++) {
            dsSoTrang.push(
                <div
                    key={i}
                    className={`${categoryStyles.trang} ${trangHienTai === i ? categoryStyles.trangchon : ''}`}
                    onClick={() => chuyenTrang(i)}
                >
                    <span><b>{i}</b></span>
                </div>
            );
        }
        return dsSoTrang;
    };

    if (tongSoTruyen === 0) return null;

    return (
        <div className={`grid wide ${styles['list-product']}`}>
            <h2 style={{ margin: "10px auto", textTransform: 'uppercase' }}>{tenTheLoai}</h2>
            <div className={`row ${styles['list-item']}`}>
                {truyenHienThi.map((truyen, index) => (
                    <div
                        key={truyen.id}
                        className={`col l-2-4 m-3 c-4 checkSizeMobile ${styles['col']}`}
                        ref={(el) => (mobileRefs.current[index] = el)}
                    >
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
                    <a className={`col l-12 m-12 c-12 a-red ${styles['xemthem']}`} href={`/danhmuc/${matheloai}`}>
                        <span>Xem thêm &gt;&gt;</span>
                    </a>
                </div>
            )}

            {on_phantrang && soTrang > 1 && (
                <div className={categoryStyles.phantrang}>
                    {hienThiSoTrang()}
                </div>
            )}
        </div>
    );
};

export default TruyenTheoTheLoai;

//done
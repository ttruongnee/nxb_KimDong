import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from './home/home.module.css';
import categoryStyles from './category/category.module.css';
import CheckScreenSize from './checkScreenSize';
import { editTenTruyen } from "./editTenTruyen";

const SO_TRUYEN_MOI_TRANG = 10;

const TruyenTheoQuangCao = ({ maquangcao, soluong = 5, on_xemthem = true, on_phantrang = false }) => {
    const [danhSachTruyen, setDanhSachTruyen] = useState([]);
    const [tenQuangCao, setTenQuangCao] = useState("");
    const [trangHienTai, setTrangHienTai] = useState(1);
    const mobileRefs = useRef([]);

    CheckScreenSize(mobileRefs);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseTruyens, responseQuangCaos] = await Promise.all([
                    axios.get("http://localhost:3001/truyens"),
                    axios.get("http://localhost:3001/quangcaos")
                ]);

                const tatCaTruyen = responseTruyens.data;
                const truyenTheoQuangCao = tatCaTruyen.filter(function (truyen) {
                    return truyen.maquangcao === maquangcao;
                });
                setDanhSachTruyen(truyenTheoQuangCao);

                const tatCaQuangCao = responseQuangCaos.data;
                const quangCaoTimThay = tatCaQuangCao.find(function (quangcao) {
                    return String(quangcao.id).trim() === String(maquangcao).trim();
                });
                if (quangCaoTimThay) {
                    setTenQuangCao(quangCaoTimThay.tenquangcao);
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };

        fetchData();
    }, [maquangcao]);

    const tongSoTruyen = danhSachTruyen.length;
    const soTrang = Math.ceil(tongSoTruyen / SO_TRUYEN_MOI_TRANG);

    let indexBatDau = 0;
    if (on_phantrang) {
        indexBatDau = (trangHienTai - 1) * SO_TRUYEN_MOI_TRANG;
    }

    let indexKetThuc = soluong;
    if (on_phantrang) {
        indexKetThuc = Math.min(indexBatDau + SO_TRUYEN_MOI_TRANG, tongSoTruyen);
    } else {
        indexKetThuc = Math.min(soluong, tongSoTruyen);
    }

    const truyenHienThi = danhSachTruyen.slice(indexBatDau, indexKetThuc);

    const chuyenTrang = (soTrangMoi) => {
        setTrangHienTai(soTrangMoi);
    };

    const hienThiSoTrang = () => {
        if (!on_phantrang || soTrang <= 1) {
            return null;
        }

        const cacSoTrang = [];
        for (let i = 1; i <= soTrang; i++) {
            cacSoTrang.push(
                <div
                    key={i}
                    className={`${categoryStyles.trang} ${trangHienTai === i ? categoryStyles.trangchon : ''}`}
                    onClick={() => chuyenTrang(i)}
                >
                    <span><b>{i}</b></span>
                </div>
            );
        }
        return cacSoTrang;
    };

    if (tongSoTruyen === 0) {
        return null;
    }

    return (
        <div className={`grid wide ${styles['list-product']}`}>
            <h2 style={{ margin: "10px auto", textTransform: 'uppercase' }}>{tenQuangCao}</h2>
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
                                    {truyen.giagoc && <span className={styles['original-price']}><s><b>{Number(truyen.giagoc).toLocaleString()}₫</b></s></span>}
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {on_xemthem && (
                <div className="row">
                    <a className={`col l-12 m-12 c-12 a-red ${styles['xemthem']}`} href={`/quangcao/${maquangcao}`}>
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

export default TruyenTheoQuangCao;
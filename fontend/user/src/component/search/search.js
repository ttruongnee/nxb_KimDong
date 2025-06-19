import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../../component/grid.css';
import '../../component/style.css';
import styles from '../home/home.module.css';
import categoryStyles from '../category/category.module.css';
import useCheckScreenSize from '../useCheckScreenSize';
import { editTenTruyen } from "../../component/editTenTruyen";

const SO_TRUYEN_MOI_TRANG = 10;

const Search = () => {
    const { tentruyen } = useParams();
    const [truyens, setTruyens] = useState([]);
    const [dangTai, setDangTai] = useState(false);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const mobileRefs = useRef([]);

    useCheckScreenSize(mobileRefs); // ✅ dùng hook đúng

    const tuKhoa = tentruyen?.trim() || '';
    const tongSoTruyen = truyens.length;
    const soTrang = Math.ceil(tongSoTruyen / SO_TRUYEN_MOI_TRANG);
    const indexBatDau = (trangHienTai - 1) * SO_TRUYEN_MOI_TRANG;
    const indexKetThuc = Math.min(indexBatDau + SO_TRUYEN_MOI_TRANG, tongSoTruyen);
    const truyenHienThi = truyens.slice(indexBatDau, indexKetThuc);

    // 🔁 Reset refs trước mỗi lần render
    mobileRefs.current = [];

    useEffect(() => {
        if (tuKhoa === '') {
            setTruyens([]);
            return;
        }

        const fetchSearchResults = async () => {
            setDangTai(true);
            try {
                const response = await axios.get(`http://localhost:3001/truyens/timkiem/${encodeURIComponent(tuKhoa)}`);
                setTruyens(response.data);
                setTrangHienTai(1); // reset về trang đầu mỗi lần tìm mới
            } catch (error) {
                console.error("Lỗi khi tìm kiếm truyện:", error);
            } finally {
                setDangTai(false);
            }
        };

        fetchSearchResults();
    }, [tentruyen]);

    const chuyenTrang = (soTrangMoi) => {
        setTrangHienTai(soTrangMoi);
    };

    const hienThiSoTrang = () => {
        if (soTrang <= 1) return null;

        const cacNutSoTrang = [];
        for (let i = 1; i <= soTrang; i++) {
            cacNutSoTrang.push(
                <div
                    key={i}
                    className={`${categoryStyles.trang} ${trangHienTai === i ? categoryStyles.trangchon : ''}`}
                    onClick={() => chuyenTrang(i)}
                >
                    <span><b>{i}</b></span>
                </div>
            );
        }
        return cacNutSoTrang;
    };

    return (
        <div className="grid wide list-product" style={{ marginTop: 25 }}>
            <h2 style={{ marginBottom: 15 }}>
                Kết quả tìm kiếm cho: <i>"{tuKhoa}"</i>
            </h2>

            {dangTai ? (
                <p style={{ margin: 10 }}><i>Đang tải kết quả...</i></p>
            ) : (
                <>
                    <div className={`row ${styles['list-item']}`} key={trangHienTai}>
                        {
                            truyenHienThi.length > 0 ? (
                                truyenHienThi.map((truyen) => (
                                    <div
                                        key={truyen.id}
                                        className={`col l-2-4 m-3 c-4 checkSizeMobile ${styles['col']}`}
                                        ref={(el) => {
                                            if (el) mobileRefs.current.push(el); // ✅ đúng cách
                                        }}
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
                                ))
                            ) : (
                                <div style={{ padding: '10px 0 20px' }}>
                                    <i>Không tìm thấy truyện nào với từ khóa "<b>{tuKhoa}</b>"</i>
                                </div>
                            )
                        }
                    </div>

                    {soTrang > 1 && (
                        <div className={categoryStyles.phantrang} style={{ marginBottom: 20 }}>
                            {hienThiSoTrang()}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;

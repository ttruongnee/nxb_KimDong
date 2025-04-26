import React, { useEffect, useState } from "react";
import '../../component/grid.css';
import styles from '../navbar/navbar.module.css';
import '../../component/style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [theLoais, setTheLoais] = useState([]);

    useEffect(() => {
        const fetchTheLoais = async () => {
            try {
                const response = await axios.get('http://localhost:3001/theloais');
                setTheLoais(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục thể loại:", error);
                // Có thể đặt một giá trị mặc định cho theLoais nếu cần
                // setTheLoais([]);
            }
        };

        fetchTheLoais();
    }, []);

    return (
        <div className="grid wide hide-on-mobile">
            <div className="row" style={{ position: "relative" }}>
                <div className="col m-12 l-12">
                    <div className={styles.navbar}> {/* Sử dụng styles.navbar */}
                        <div className={styles.danhmucsanpham}> {/* Sử dụng styles.danhmucsanpham */}
                            <div className="flex-center">
                                <i
                                    className="fas fa-bars icon-white"
                                    style={{ marginRight: 2 }}
                                />
                                <b>DANH MỤC SẢN PHẨM</b>
                            </div>
                            <div className={styles['list-box']}> {/* Sử dụng styles['list-box'] */}
                                <ul>
                                    {theLoais.map(theLoai => (
                                        <Link key={theLoai.id} className={styles['danhmuc-a']} to={`/theloai/${theLoai.id}`}> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']} style={{ textTransform: 'uppercase' }}> {/* Sử dụng styles['list-box-item'] */}
                                                <i
                                                    className="fas fa-book"
                                                    style={{ fontSize: 16, marginRight: 5 }}
                                                />
                                                {theLoai.tentheloai}
                                            </li>
                                        </Link>
                                    ))}
                                    {theLoais.length === 0 && (
                                        <li>Không có danh mục</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <ul className={styles.tintucgioithieu}> {/* Sử dụng styles.tintucgioithieu */}
                            <li className={styles.tintuc} style={{ marginRight: 20 }}> {/* Sử dụng styles.tintuc */}
                                <div className={styles['tintucgioithieu-title']}> {/* Sử dụng styles['tintucgioithieu-title'] */}
                                    TIN TỨC
                                    <i className="fas fa-angle-down" />
                                </div>
                                <div className={styles['list-box']}> {/* Sử dụng styles['list-box'] */}
                                    <ul>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Hoạt động</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Sự kiện</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Điểm sách</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Sách giả - Sách lậu</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}> {/* Sử dụng styles['list-box-item'] */}
                                                Lịch phát hành sách định kỳ
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </li>
                            <li className={styles.gioithieu}> {/* Sử dụng styles.gioithieu */}
                                <div className={styles['tintucgioithieu-title']}> {/* Sử dụng styles['tintucgioithieu-title'] */}
                                    GIỚI THIỆU
                                    <i className="fas fa-angle-down" />
                                </div>
                                <div className={styles['list-box']}> {/* Sử dụng styles['list-box'] */}
                                    <ul>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Giới thiệu nhà xuất bản</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Tác giả - Tác phẩm</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Công tác xã hội</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Khen thưởng của nhà nước</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Hợp tác quốc tế</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                        <a className={styles['danhmuc-a']} href=""> {/* Sử dụng styles['danhmuc-a'] */}
                                            <li className={styles['list-box-item']}>Hệ thống nhà sách</li> {/* Sử dụng styles['list-box-item'] */}
                                        </a>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
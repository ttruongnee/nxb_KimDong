import React from "react";
import '../../component/grid.css';
import styles from '../navbar/navbar.module.css';
import '../../component/style.css';
import { Link } from 'react-router-dom';
import useFetchData from '../useFetchData'; // Nhớ cập nhật đúng path nếu cần

const Navbar = () => {
    const { data: theLoais } = useFetchData('http://localhost:3001/theloais');

    return (
        <div className="grid wide hide-on-mobile">
            <div className="row" style={{ position: "relative" }}>
                <div className="col m-12 l-12">
                    <div className={styles.navbar}>
                        <div className={styles.danhmucsanpham}>
                            <div className="flex-center">
                                <i className="fas fa-bars icon-white" style={{ marginRight: 2 }} />
                                <b>DANH MỤC SẢN PHẨM</b>
                            </div>
                            <div className={styles['list-box']}>
                                <ul>
                                    {Array.isArray(theLoais) && theLoais.length > 0 ? (
                                        theLoais.map(theLoai => (
                                            <Link key={theLoai.id} className={styles['danhmuc-a']} to={`/theloai/${theLoai.id}`}>
                                                <li className={styles['list-box-item']} style={{ textTransform: 'uppercase' }}>
                                                    <i className="fas fa-book" style={{ fontSize: 16, marginRight: 5 }} />
                                                    {theLoai.tentheloai}
                                                </li>
                                            </Link>
                                        ))
                                    ) : (
                                        <li>Không có danh mục</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <ul className={styles.tintucgioithieu}>
                            <li className={styles.tintuc} style={{ marginRight: 20 }}>
                                <div className={styles['tintucgioithieu-title']}>
                                    TIN TỨC
                                    <i className="fas fa-angle-down" />
                                </div>
                                <div className={styles['list-box']}>
                                    <ul>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Hoạt động</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Sự kiện</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Điểm sách</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Sách giả - Sách lậu</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Lịch phát hành sách định kỳ</li></a>
                                    </ul>
                                </div>
                            </li>

                            <li className={styles.gioithieu}>
                                <div className={styles['tintucgioithieu-title']}>
                                    GIỚI THIỆU
                                    <i className="fas fa-angle-down" />
                                </div>
                                <div className={styles['list-box']}>
                                    <ul>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Giới thiệu nhà xuất bản</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Tác giả - Tác phẩm</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Công tác xã hội</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Khen thưởng của nhà nước</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Hợp tác quốc tế</li></a>
                                        <a className={styles['danhmuc-a']} href=""><li className={styles['list-box-item']}>Hệ thống nhà sách</li></a>
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


//done

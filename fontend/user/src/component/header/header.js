import React, { useEffect, useRef } from "react";
import styles from './header.module.css';
import '../../component/grid.css';
import '../../component/style.css';
import { Link } from 'react-router-dom';
import updateCartCount from '../updateCartCount';
import useCheckLogin from './useCheckLogin.js';
import { decodeToken } from '../decodeToken.js';
import useFetchData from '../useFetchData';

const Header = () => {
    const logo = "https://res.cloudinary.com/dz7086zgw/image/upload/v1745290376/logo_eoetrx.png";
    const { data: theLoaisMobile, loading: loadingMobile, error: errorTheLoaisMobile } = useFetchData('http://localhost:3001/theloais');
    const cartCountRefPC = useRef(null);
    const cartCountRefMobile = useRef(null);
    const { isLoggedIn, tenKhach, handleLogout, setAuthInfo } = useCheckLogin(); // Sử dụng custom hook và lấy setAuthInfo

    useEffect(() => {
        //cập nhật lại giá trị cartcount
        updateCartCount(cartCountRefPC, cartCountRefMobile);

        //kiểm tra tồn tại token và lấy tên khách hàng
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken && decodedToken.tenKhachHang) {
                setAuthInfo(decodedToken.tenKhachHang);
            }
        }

        //xử lý update giỏ hàng
        const handleCartUpdate = () => {
            updateCartCount(cartCountRefPC, cartCountRefMobile);
        };

        // Lắng nghe sự kiện 'cartUpdated' để cập nhật số lượng giỏ hàng
        window.addEventListener('cartUpdated', handleCartUpdate);

        // Cleanup function: loại bỏ event listener khi component unmount
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [cartCountRefPC, cartCountRefMobile, setAuthInfo]);

    return (
        <header id="header" className={styles.header}>
            <div className={`${styles['header-top']} hide-on-mobile`}>
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-2 m-2 c-2 displayflex">
                            <a href="https://www.facebook.com/nxbkimdong" target="_blank" className="icon-link">
                                <div style={{ padding: "5px 10px" }}>
                                    <i className="fab fa-facebook-f icon-white" />
                                </div>
                            </a>
                            <a href="https://www.instagram.com/kimdongbooks" target="_blank" className="icon-link">
                                <div style={{ padding: "5px 10px" }}>
                                    <i className="fab fa-instagram icon-white" />
                                </div>
                            </a>
                            <a href="https://www.youtube.com/user/KimDongPublishingHou" target="_blank" className="icon-link">
                                <div style={{ padding: "5px 10px" }}>
                                    <i className="fab fa-youtube icon-white" />
                                </div>
                            </a>
                        </div>
                        <div className="col l-5 m-0 c-0 displayflex-pc">
                            <i className="fas fa-rss icon-white" style={{ padding: "5px 4px" }} />
                            <marquee behavior="scroll" direction="left" className={styles.welcome}>
                                Chào mừng bạn đến với NXB KIM ĐỒNG. Nếu bạn cần giúp đỡ, hãy liên
                                hệ với chúng tôi qua hotline: (+84) 1900571595 hoặc email:
                                cskh_online@nxbkimdong.com.vn.
                            </marquee>
                        </div>
                        <div className="col l-5 m-o-2 m-8 c-10 displayflex contact">
                            <div className={styles['contact-item']}>
                                <a className="a-link displayflex" href="tel:(+84) 1900571595">
                                    <i className="fas fa-phone-alt icon-white" style={{ padding: "5px 4px" }} />
                                    <p className={styles['contact-item']}>(+84) 1900571595</p>
                                </a>
                            </div>
                            <div className={styles['contact-item']}>
                                <a className="a-link displayflex" href="mailto:cskh_online@nxbkimdong.com.vn">
                                    <i className="fas fa-envelope icon-white" style={{ padding: "5px 4px", paddingLeft: 25 }} />
                                    <p className={styles['contact-item']}>cskh_online@nxbkimdong.com.vn</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['header-bottom']}>
                <div className="pc-tablet-header hide-on-mobile">
                    <div className="grid wide">
                        <div className="row flex-center">
                            <form id="header-find" className={`col l-4 m-4 c-0 displayflex-nomobile`}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className={styles['input-find']}
                                    required=""
                                />
                                <button type="submit" className={styles['button-find']}>
                                    <i className="fas fa-search icon-white" style={{ color: "#d51e24" }} />
                                </button>
                            </form>
                            <div className={`logo col l-4 m-4 c-4 flex-center ${styles.logo}`}>
                                <Link to="/">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        style={{ width: 90, height: 90 }}
                                    />
                                </Link>
                            </div>
                            <div className="col l-4 m-4 c-4 displayflex header-bottom-right">
                                <div className="user-connect flex-center">
                                    {!isLoggedIn ? (
                                        <div id="LoginFalse" className="flex-center">
                                            <Link to="/dangnhap" className={`a-black dangnhap hover-red flex-center hide-on-tablet ${styles.dangnhap}`} style={{ textDecoration: 'none' }}>
                                                <i
                                                    className="fas fa-sign-in-alt"
                                                    style={{ padding: 3, marginRight: 5, fontSize: 16 }}
                                                />
                                                Đăng nhập
                                            </Link>
                                            <div
                                                className={`dangky hover-red flex-center hide-on-tablet ${styles.dangky}`}
                                            >
                                                <i
                                                    className="fas fa-edit"
                                                    style={{ marginRight: 5, fontSize: 16 }}
                                                />
                                                Đăng ký
                                            </div>
                                        </div>
                                    ) : (
                                        <div id="LoginTrue" className="flex-center">
                                            <div
                                                className={`user hover-red flex-center ${styles.user}`}
                                                style={{ display: "flex" }}
                                            >
                                                <i className="fas fa-user" style={{ marginRight: 5 }} />
                                                <span id="NameUserLogin">{tenKhach}</span>
                                            </div>
                                            <div
                                                className={`dangxuat hover-red flex-center hide-on-tablet hide-on-pclow ${styles.dangxuat}`}
                                                onClick={handleLogout}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <i
                                                    className="fas fa-sign-out-alt"
                                                    style={{ marginRight: 5 }}
                                                />
                                                Đăng xuất
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`yeuthich flex-center ${styles.yeuthich}`}>
                                    <Link to="#" style={{ display: "flex", textDecoration: "none" }}>
                                        <i
                                            className="far fa-heart icon-black hover-red"
                                            style={{ fontSize: 25 }}
                                        />
                                        <p className={styles.soluong}>0</p>
                                    </Link>
                                </div>
                                <div className={`giohang flex-center ${styles.giohang}`}>
                                    <Link
                                        id="giohang"
                                        to="/giohang"
                                        style={{ display: "flex", textDecoration: "none" }}
                                    >
                                        <i
                                            className="fas fa-shopping-bag icon-black hover-red"
                                            style={{ fontSize: 25 }}
                                        />
                                        <p className={styles.soluong} ref={cartCountRefPC}>0</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mobile-header hide-on-tablet-pc ${styles['mobile-header']}`}>
                <div className="grid">
                    <div className="row">
                        <div className={`mobile-logo col c-o-1 c-3 ${styles['mobile-logo']}`}>
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{ width: 90, height: 90 }}
                                />
                            </Link>
                        </div>
                        <div className={`mobile-header-item col c-8 displayflex ${styles['mobile-header-item']}`}>
                            <div className={styles.user} style={{ display: "flex" }}>
                                <i
                                    className="fas fa-user icon-black"
                                    style={{ fontSize: 25 }}
                                />
                            </div>
                            <div className={styles.giohang}>
                                <Link
                                    id="giohang"
                                    to="/giohang"
                                    style={{ display: "flex", textDecoration: "none" }}
                                >
                                    <i
                                        className="fas fa-shopping-bag icon-black"
                                        style={{ fontSize: 25 }}
                                    />
                                    <p className={styles.soluong} ref={cartCountRefMobile}>0</p>
                                </Link>
                            </div>
                            <div className={styles['mobile-menu-navbar']}>
                                <label
                                    htmlFor="nav-mobile-input"
                                    className="a-link displayflex"
                                    style={{ cursor: "pointer" }}
                                >
                                    <div style={{ lineHeight: 2, paddingRight: 5 }}>MENU</div>
                                    <i
                                        className="fa fa-bars"
                                        style={{ fontSize: 25, paddingTop: 1, marginRight: 20 }}
                                    />
                                </label>
                                <input
                                    type="checkbox"
                                    className={styles.nav_input}
                                    id="nav-mobile-input"
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="nav-mobile-input" className={styles.nav_overlay} />
                                <div className={styles.nav_mobile}>
                                    <label
                                        htmlFor="nav-mobile-input"
                                        className={styles['nav_mobile-close']}
                                    >
                                        <div style={{ fontSize: 12, margin: 4, lineHeight: 2 }}>
                                            ĐÓNG
                                        </div>
                                        <i className="fas fa-times" /><br />
                                    </label>
                                    <div className={`${styles['nav_mobile-find']} displayflex`}>
                                        <input type="text" placeholder="Tìm kiếm..." className={styles['input-find']} />
                                        <button type="submit" className={styles['button-find']}>
                                            <i className="fas fa-search icon-white" style={{ color: "#d51e24" }} />
                                        </button>
                                    </div>
                                    <div className={styles['nav_mobile-list']}>
                                        <ul className={`${styles['ul-mobile']}`}>
                                            {loadingMobile ? (
                                                <li>Đang tải danh mục...</li>
                                            ) : errorTheLoaisMobile ? (
                                                <li>Lỗi khi tải danh mục: {errorTheLoaisMobile?.message || 'Đã có lỗi xảy ra.'}</li>
                                            ) : theLoaisMobile && theLoaisMobile.length > 0 ? (
                                                theLoaisMobile.map(theLoai => (
                                                    <Link
                                                        key={theLoai.id}
                                                        className={`a-link ${styles['danhmuc-a']}`}
                                                        to={`/theloai/${theLoai.id}`}
                                                    >
                                                        <li>{theLoai.tentheloai}</li>
                                                    </Link>
                                                ))
                                            ) : (
                                                <li>Không có danh mục.</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
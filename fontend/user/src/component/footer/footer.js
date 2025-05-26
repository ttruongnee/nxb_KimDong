import React from "react";
import '../../component/grid.css';
import styles from '../footer/footer.module.css';
import '../../component/style.css';

const Footer = () => {
    return (
        <footer>
            <div className={`grid wide  ${styles['displayflex']}`}>
                <div
                    className={`row ${styles['displayblock-mobile']} ${styles['footer-menu']}`}
                    style={{ width: "100%" }}
                >
                    <div className={`col l-3 m-3 c-12 ${styles['thongtin']}`}>
                        <h3>DỊCH VỤ</h3>
                        <ul className={styles['thongtin-ul']}>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/dieu-khoan-dich-vu"
                                >
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/chinh-sach-bao-mat"
                                >
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/lien-he"
                                >
                                    Liên hệ
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/he-thong-cua-hang"
                                >
                                    Hệ thống nhà sách
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/tra-cuu-don-hang-da-mua"
                                >
                                    Tra cứu đơn hàng
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={`col l-3 m-3 c-12 ${styles['thongtin']}`}>
                        <h3>HỖ TRỢ</h3>
                        <ul className={styles['thongtin-ul']}>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/huong-dan-dat-hang"
                                >
                                    Hướng dẫn đặt hàng
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/chinh-sach-doi-tra"
                                >
                                    Chính sách đổi trả - hoàn tiền
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/phuong-thuc-van-chuyen"
                                >
                                    Phương thức vận chuyển
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/phuong-thuc-thanh-toan"
                                >
                                    Phương thức thanh toán
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/pages/chinh-sach-khach-hang-mua-si"
                                >
                                    Chính sách khách hàng mua sỉ
                                </a>
                            </li>
                            <li className={styles['thongtin-li']}>
                                <a
                                    className="a-black"
                                    href="https://nxbkimdong.com.vn/blogs/ho-tro/chinh-sach-doi-voi-khach-hang-mua-sach-cho-truong-hoc"
                                >
                                    Chính sách khách hàng cho Thư viện - Trường học
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={`col l-3 m-3 c-12 ${styles['thongtin']}`}>
                        <h3>NHÀ XUẤT BẢN KIM ĐỒNG</h3>
                        <div style={{ lineHeight: 2 }}>
                            Giám đốc: Bùi Tuấn Nghĩa <br />
                            Địa chỉ: Số 55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội <br />
                            Số điện thoại:{" "}
                            <a className={`a-black ${styles['hover-red']}`} href="tel:(+84) 1900571595">
                                (+84) 1900571595
                            </a>
                            <br />
                            Email:{" "}
                            <a
                                className={`a-black ${styles['hover-red']}`}
                                href="mailto:cskh_online@nxbkimdong.com.vn "
                            >
                                cskh_online@nxbkimdong.com.vn
                            </a>
                        </div>
                    </div>
                    <div className={`col l-3 m-3 c-12 ${styles['thongtin']}`}>
                        <h3>KẾT NỐI MẠNG XÃ HỘI</h3>
                        <div className={'flex-center'}>
                            <a
                                href="https://www.facebook.com/nxbkimdong"
                                target="_blank"
                                className={`${styles['a-mxh']}`}
                            >
                                <i
                                    className={`fab fa-facebook-f  ${styles['icon-mxh']}`}
                                    style={{ color: "#3B5998" }}
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/user/KimDongPublishingHou"
                                target="_blank"
                                className={`${styles['a-mxh']}`}
                            >
                                <i
                                    className={`fab fa-youtube ${styles['icon-mxh']}`}
                                    style={{ color: "#FF0000" }}
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/kimdongbooks/"
                                target="_blank"
                                className={`${styles['a-mxh']}`}
                            >
                                <i
                                    className={`fab fa-instagram ${styles['icon-mxh']}`}
                                    style={{ color: "#C32AA3" }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['copyrights']}>
                COPYRIGHTS © 2021 BY{" "}
                <a
                    className="a-black"
                    target="_blank"
                    href="https://nxbkimdong.myharavan.com/"
                >
                    NXB KIM ĐỒNG
                </a>
            </div>
        </footer>
    )
}

export default Footer;
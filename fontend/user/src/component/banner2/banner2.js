import React, { useEffect, useState } from "react";
import "../../component/grid.css";
import styles from "./banner2.module.css";
import "../../component/style.css";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Banner2 = () => {
    const { id_theloai, id_quangcao } = useParams();
    const [tenDanhMuc, setTenDanhMuc] = useState("");
    const location = useLocation();

    useEffect(() => {
        const layTenDanhMuc = async () => {
            let maDanhMuc;
            let urlApi = "";
            let tenHienThi = ""; // Tên mặc định hoặc để trống

            // Trường hợp nếu là trang giỏ hàng
            if (location.pathname === "/giohang") {
                tenHienThi = "Giỏ hàng";
            }
            // Trường hợp nếu là trang đăng nhập
            else if (location.pathname === "/dangnhap") {
                tenHienThi = "Đăng nhập";
            }
            // Trường hợp nếu là trang thanh toán
            else if (location.pathname === "/payment") {
                tenHienThi = "Thanh toán";
            }
            // Trường hợp nếu là trang thể loại
            else if (id_theloai) {
                maDanhMuc = id_theloai;
                urlApi = `http://localhost:3001/theloais/${maDanhMuc}`;
            }
            // Trường hợp nếu là trang quảng cáo
            else if (id_quangcao) {
                maDanhMuc = id_quangcao;
                urlApi = `http://localhost:3001/quangcaos/${maDanhMuc}`;
            }

            if (urlApi && maDanhMuc) {
                try {
                    const response = await axios.get(urlApi);
                    if (response.data) {
                        if (id_theloai) {
                            tenHienThi = response.data[0]?.tentheloai || "Thể loại"; // Tên mặc định nếu không có
                        } else if (id_quangcao) {
                            tenHienThi = response.data[0]?.tenquangcao || "Quảng cáo"; // Tên mặc định nếu không có
                        }
                    } else {
                        tenHienThi = "Không tìm thấy";
                    }
                } catch (error) {
                    console.error("Lỗi khi tải tên danh mục:", error);
                    tenHienThi = "Lỗi tải";
                }
            }

            setTenDanhMuc(tenHienThi);
        };

        layTenDanhMuc();
    }, [id_theloai, id_quangcao, location.pathname]);

    return (
        <div className={styles.banner}>
            <div className={`grid wide ${styles.title}`}>
                <div className="row">
                    <div className={`col l-12 m-12 c-12 title-text`}>
                        <h2 className="title-top" style={{ marginBottom: 3, textTransform: 'uppercase' }}>
                            {tenDanhMuc}
                        </h2>
                        <div className="title-link">
                            <Link className="a-white hover-red" to="/">
                                Trang chủ
                            </Link>
                            <span>/ {tenDanhMuc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
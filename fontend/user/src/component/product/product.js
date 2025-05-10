import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../component/grid.css';
import '../product/product.css';
import '../../component/style.css';
import '../product/responsive.css';
import ArrowInputTypeNumber from '../ArrowInputTypeNumber';

function Product() {
    const { id_truyen } = useParams();
    const [truyen, setTruyen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theloaiName, setTheloaiName] = useState('');
    const [soLuongTruyen, setSoLuongTruyen] = useState(1);

    const fetchTheloaiName = (matheloai) => {
        axios.get(`http://localhost:3001/theloais/${matheloai}`)
            .then(response => {
                setTheloaiName(response.data[0].tentheloai);
            })
            .catch(() => {
                setTheloaiName('Chưa có tên thể loại');
            });
    };

    useEffect(() => {
        // Không gọi updateCartCount() trực tiếp ở đây nữa
        // updateCartCount();

        axios.get(`http://localhost:3001/truyens/${id_truyen}`)
            .then(response => {
                setTruyen(response.data);
                setLoading(false);

                const matheloai = response.data[0].matheloai;
                fetchTheloaiName(matheloai);
            })
            .catch(() => {
                setError('Không tồn tại truyện này');
                setLoading(false);
            });
    }, [id_truyen]);

    function handleThemVaoGio() {
        let GioHang = JSON.parse(localStorage.getItem('GioHang')) || {};
        const idTruyen = truyen[0].id;
        const anhTruyen = truyen[0].anhtruyen;
        const tenTruyen = truyen[0].tentruyen;
        const giaBanTruyen = truyen[0].giaban;
        const tongTien = giaBanTruyen * soLuongTruyen;

        if (GioHang[idTruyen]) {
            GioHang[idTruyen].SoLuongTruyen += soLuongTruyen;
            GioHang[idTruyen].TongTien += tongTien;
        } else {
            GioHang[idTruyen] = {
                'ID': idTruyen,
                'AnhTruyen': anhTruyen,
                'TenTruyen': tenTruyen,
                'GiaBanTruyen': giaBanTruyen,
                'SoLuongTruyen': soLuongTruyen,
                'TongTien': tongTien
            };
        }

        localStorage.setItem("GioHang", JSON.stringify(GioHang));

        // Dispatch custom event để thông báo cho Header cập nhật
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    if (loading) return <div>Đang tải...</div>;
    if (error) return <h1 className="flex-center" style={{ margin: '50px' }}>{error}</h1>;
    if (!truyen) return <div>Không tìm thấy truyện</div>;

    return (
        <>
            <div className="grid wide">
                <div className="row">
                    <div className="col c-12 m-12 l-12 duongdan">
                        <a className="a-black hover-red" href="/">Trang chủ</a>
                        <span> / </span>
                        <a className="a-black hover-red" href={`/theloai/${truyen[0].matheloai}`}>{theloaiName}</a>
                        <span> / </span>
                        <span>{truyen[0].tentruyen}</span>
                    </div>
                </div>
            </div>

            <div className="grid wide">
                <div className="row main-product">
                    <div className="col l-4 m-4 c-12">
                        <img className="main-product-img" src={truyen[0].anhtruyen} alt={truyen[0].tentruyen} />
                    </div>
                    <div className="col l-8 m-8 c-12 main-thongtin">
                        <h1 style={{ textTransform: 'uppercase' }} className="main-product-name">{truyen[0].tentruyen}</h1>
                        <div className="danhgia displayflex">
                            {[...Array(4)].map((_, i) => (
                                <i key={i} className="fas fa-star" style={{ color: "rgb(239,237,106)", marginRight: 5 }} />
                            ))}
                            <i className="far fa-star" style={{ color: "rgb(239,237,106)", marginRight: 5 }} />
                            <span>98 đánh giá | Đã bán: 116</span>
                        </div>

                        <div className="giatien">
                            <span className="main-product-giaban">
                                <b>{truyen[0].giaban.toLocaleString('vi-VN')}đ</b>
                            </span>
                            <span className="main-product-giagoc">
                                <s>
                                    <b>{truyen[0].giagoc.toLocaleString('vi-VN')}đ</b>
                                </s>
                            </span>
                            <span>(Bạn đã tiết kiệm được {(truyen[0].giagoc - truyen[0].giaban).toLocaleString('vi-VN')}đ)</span>
                        </div>

                        <div className="displayflex-nomobile">
                            <ul className="chitietsanpham">
                                <li><span className="chimuc">∙</span>Mã Kim Đồng:&nbsp;<a className="a-red"><b>{truyen[0].id}</b></a></li>
                                {truyen[0].isbn !== "không có" && <li><span className="chimuc">∙</span>ISBN: <b>{truyen[0].isbn}</b></li>}
                                <li><span className="chimuc">∙</span>Tác giả:<a className="a-red"><b> {truyen[0].tacgia}</b></a></li>
                                <li><span className="chimuc">∙</span>Đối tượng:&nbsp;<a className="a-red"><b>{truyen[0].doituong}</b></a></li>
                                <li><span className="chimuc">∙</span>Số trang: {truyen[0].sotrang}</li>
                                <li><span className="chimuc">∙</span>Định dạng: {truyen[0].dinhdang}</li>
                                <li><span className="chimuc">∙</span>Trọng lượng: {truyen[0].trongluong}</li>
                                <li><span className="chimuc">∙</span>Thể loại:&nbsp;<a className="a-red"><b>{theloaiName}</b></a></li>
                            </ul>

                            <div className="slmua">
                                <span style={{ lineHeight: 2 }}><b>Số lượng</b></span><br />
                                <ArrowInputTypeNumber value={1} onChange={setSoLuongTruyen} />
                                <button type="submit" className="btnThem" onClick={handleThemVaoGio}>
                                    <b>THÊM VÀO GIỎ HÀNG</b>
                                </button>
                                <button type="submit" className="btnMua">
                                    <b>MUA NGAY</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Product;
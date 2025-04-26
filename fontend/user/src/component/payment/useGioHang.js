import { useState, useEffect } from 'react';

export const useGioHang = () => {
    // State cho giỏ hàng, dùng object để dễ tìm sản phẩm bằng ID
    const [objGioHang, setObjGioHang] = useState({});
    // State cho danh sách các sản phẩm trong giỏ hàng (dạng mảng để dễ hiển thị)
    const [arrGioHang, setArrGioHang] = useState([]);

    useEffect(() => {
        const gioHangDaLuu = localStorage.getItem('GioHang');

        if (gioHangDaLuu) {
            try {
                // Chuyển đổi chuỗi JSON đã lưu thành obj
                const gioHangParsed = JSON.parse(gioHangDaLuu);
                // Cập nhật state giỏ hàng (dạng object) với dữ liệu đã lấy
                setObjGioHang(gioHangParsed);
                // Chuyển đổi giỏ hàng từ object thành một mảng
                setArrGioHang(Object.values(gioHangParsed));
            } catch (error) {
                console.error('Lỗi xử lý giỏ hàng đã lưu:', error);
                setObjGioHang({});
                setArrGioHang([]);
            }
        } else {
            // Nếu không có dữ liệu giỏ hàng đã lưu, khởi tạo giỏ hàng là rỗng
            setObjGioHang({});
            setArrGioHang([]);
        }
    }, []);

    // Trả về state giỏ hàng (dạng object và array) để component khác dùng
    return {
        objGioHang, // Object chứa thông tin giỏ hàng (ID sản phẩm là key)
        arrGioHang  // Mảng chứa danh sách các sản phẩm trong giỏ hàng
    };
};
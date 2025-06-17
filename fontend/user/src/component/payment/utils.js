export function funcGetTongTien(gioHang) {
    var arrGioHang = Object.values(gioHang);
    var tongtien = 0;
    for (var i = 0; i < arrGioHang.length; i++) {
        var sanPham = arrGioHang[i];
        tongtien = tongtien + sanPham.GiaBanTruyen * sanPham.SoLuongTruyen;
    }
    return tongtien;
}

export function funcTongTienSauGG(tongTien, phanTramGiam) {
    var tienGiam = (tongTien * phanTramGiam) / 100;
    return tongTien - tienGiam;
}

export function taoID() {
    // Lấy thời gian hiện tại (dạng số), chuyển thành chuỗi base 36 và lấy 5 ký tự cuối
    var phan1 = Date.now().toString(36).slice(-5);
    // Tạo một số ngẫu nhiên từ 0 đến gần 1, chuyển thành chuỗi base 36 và lấy 3 ký tự cuối
    var phan2 = Math.random().toString(36).slice(-3);
    // Kết hợp hai phần để tạo ID
    return phan1 + phan2;
}

// Hàm định dạng ngày tháng để lưu vào cơ sở dữ liệu (YYYY-MM-DD)
export function convertNgayThangNam(ngay) {
    // Lấy năm
    var nam = ngay.getFullYear();
    // Lấy tháng (lưu ý: getMonth() trả về giá trị từ 0 đến 11, nên cần cộng 1)
    var thangSo = ngay.getMonth() + 1;
    // Chuyển tháng thành chuỗi và thêm '0' vào đầu nếu cần
    var thang = thangSo < 10 ? '0' + thangSo : '' + thangSo;
    // Lấy ngày
    var ngaySo = ngay.getDate();
    // Chuyển ngày thành chuỗi và thêm '0' vào đầu nếu cần
    var ngayTrongThang = ngaySo < 10 ? '0' + ngaySo : '' + ngaySo;

    return nam + '-' + thang + '-' + ngayTrongThang;
}
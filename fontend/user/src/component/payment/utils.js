// utils.js

// Hàm tính tổng tiền tất cả sản phẩm trong giỏ hàng
export function funcGetTongTien(gioHang) {
    // Lấy ra danh sách các sản phẩm trong giỏ hàng
    var arrGioHang = Object.values(gioHang);
    var tongtien = 0;
    // Duyệt qua từng sản phẩm trong giỏ hàng
    for (var i = 0; i < arrGioHang.length; i++) {
        var sanPham = arrGioHang[i];
        // Tính tiền của sản phẩm hiện tại (giá nhân số lượng) và cộng vào tổng tiền
        tongtien = tongtien + sanPham.GiaBanTruyen * sanPham.SoLuongTruyen;
    }
    // Trả về tổng tiền
    return tongtien;
}

// Hàm tính tổng tiền sau khi đã áp dụng giảm giá
export function funcTongTienSauGG(tongTien, phanTramGiam) {
    // Tính số tiền được giảm
    var tienGiam = (tongTien * phanTramGiam) / 100;
    // Trả về tổng tiền sau khi đã trừ đi số tiền giảm
    return tongTien - tienGiam;
}

// Hàm tạo một ID ngẫu nhiên
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
    // Trả về chuỗi ngày tháng theo định dạng<ctrl3348>-MM-DD
    return nam + '-' + thang + '-' + ngayTrongThang;
}
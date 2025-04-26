import React, { useState, useEffect, useRef } from 'react'; // Import các thư viện cần thiết từ React
import axios from 'axios'; // Import thư viện axios để gọi API
import { Button } from 'primereact/button'; // Import component Button từ PrimeReact
import { Column } from 'primereact/column'; // Import component Column cho bảng dữ liệu từ PrimeReact
import { DataTable } from 'primereact/datatable'; // Import component DataTable để hiển thị dữ liệu dạng bảng từ PrimeReact
import { Dialog } from 'primereact/dialog'; // Import component Dialog để tạo hộp thoại từ PrimeReact
import { InputText } from 'primereact/inputtext'; // Import component InputText để tạo ô nhập liệu văn bản từ PrimeReact
import { Toast } from 'primereact/toast'; // Import component Toast để hiển thị thông báo từ PrimeReact

// Định nghĩa URL của API backend để lấy dữ liệu thể loại
const API_URL = 'http://localhost:3001/theloais';

function QuanLyTheloai() {
    // State để lưu trữ danh sách thể loại lấy từ API
    const [danhSachTheLoai, setDanhSachTheLoai] = useState([]);
    // State để lưu trữ thông tin chi tiết của một thể loại đang được thêm mới hoặc chỉnh sửa
    const [thongTinTheLoai, setThongTinTheLoai] = useState({ id: '', tentheloai: '', mota: '' });
    // State để điều khiển hiển thị hộp thoại thêm mới/chỉnh sửa thể loại
    const [hienThiHopThoai, setHienThiHopThoai] = useState(false);
    // State để điều khiển hiển thị hộp thoại xác nhận xóa thể loại
    const [hienThiHopThoaiXoa, setHienThiHopThoaiXoa] = useState(false);
    // State để lưu trữ từ khóa tìm kiếm
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    // Ref để truy cập component Toast để hiển thị thông báo
    const thongBaoRef = useRef(null);

    // useEffect hook được gọi sau lần render đầu tiên và sau mỗi lần các biến trong dependency array thay đổi
    useEffect(() => {
        // Gọi hàm để tải danh sách thể loại từ API khi component được mount
        taiDanhSachTheLoai();
    }, []); // Mảng dependency rỗng nghĩa là useEffect chỉ chạy một lần sau lần render đầu tiên

    // Hàm để tải danh sách thể loại từ API
    function taiDanhSachTheLoai() {
        axios.get(API_URL)
            .then(function (response) {
                // Cập nhật state danhSachTheLoai với dữ liệu nhận được hoặc mảng rỗng nếu không có dữ liệu
                setDanhSachTheLoai(response.data || []);
            })
            .catch(function () {
                // Hiển thị thông báo lỗi nếu không tải được dữ liệu
                thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' });
            });
    }

    // Hàm tạo ID duy nhất cho thể loại mới
    function taoID() {
        // Tạo một chuỗi ngẫu nhiên kết hợp thời gian hiện tại để đảm bảo tính duy nhất
        let phanThoiGian = Date.now().toString(36).slice(-5);
        let phanNgauNhien = Math.random().toString(36).slice(-3);
        return phanThoiGian + phanNgauNhien;
    }

    // Hàm mở hộp thoại thêm mới thể loại và đặt lại thông tin thể loại về trạng thái ban đầu
    function moHopThoaiThemMoi() {
        // Tạo một ID mới và đặt các trường khác về rỗng
        setThongTinTheLoai({ id: taoID(), tentheloai: '', mota: '' });
        setHienThiHopThoai(true); // Hiển thị hộp thoại
    }

    // Hàm mở hộp thoại chỉnh sửa thể loại và điền thông tin thể loại vào form
    function moHopThoaiChinhSua(theLoai) {
        // Cập nhật state thongTinTheLoai với thông tin của thể loại cần chỉnh sửa
        setThongTinTheLoai(theLoai);
        setHienThiHopThoai(true); // Hiển thị hộp thoại
    }

    // Hàm lưu thông tin thể loại (thêm mới hoặc cập nhật)
    function luuThongTinTheLoai() {
        // Kiểm tra xem tên thể loại có bị bỏ trống không
        if (thongTinTheLoai.tentheloai.trim() === '') {
            thongBaoRef.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Tên thể loại không được để trống!' });
            return; // Dừng hàm nếu tên thể loại rỗng
        }

        // Kiểm tra xem thể loại này đã tồn tại trong danh sách chưa (dựa trên ID)
        if (danhSachTheLoai.some(function (item) { return item.id === thongTinTheLoai.id; })) {
            // Nếu đã tồn tại, thực hiện gọi API PUT để cập nhật
            axios.put(API_URL + '/' + thongTinTheLoai.id, thongTinTheLoai)
                .then(function () {
                    // Tải lại danh sách thể loại sau khi cập nhật thành công
                    taiDanhSachTheLoai();
                    // Hiển thị thông báo thành công
                    thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
                })
                .catch(function () {
                    // Hiển thị thông báo lỗi nếu cập nhật thất bại
                    thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật thất bại!' });
                });
        } else {
            // Nếu chưa tồn tại, thực hiện gọi API POST để thêm mới
            axios.post(API_URL, thongTinTheLoai)
                .then(function () {
                    // Tải lại danh sách thể loại sau khi thêm mới thành công
                    taiDanhSachTheLoai();
                    // Hiển thị thông báo thành công
                    thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
                })
                .catch(function () {
                    // Hiển thị thông báo lỗi nếu thêm mới thất bại
                    thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Thêm thất bại!' });
                });
        }
        // Ẩn hộp thoại sau khi lưu thành công hoặc thất bại
        setHienThiHopThoai(false);
    }

    // Hàm mở hộp thoại xác nhận xóa thể loại
    function moHopThoaiXoa(theLoai) {
        // Lưu thông tin thể loại cần xóa vào state
        setThongTinTheLoai(theLoai);
        setHienThiHopThoaiXoa(true); // Hiển thị hộp thoại xác nhận xóa
    }

    // Hàm thực hiện xóa thể loại
    function xoaTheLoai() {
        axios.delete(API_URL + '/' + thongTinTheLoai.id)
            .then(function () {
                // Tải lại danh sách thể loại sau khi xóa thành công
                taiDanhSachTheLoai();
                // Hiển thị thông báo thành công
                thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
            })
            .catch(function () {
                // Hiển thị thông báo lỗi nếu xóa thất bại
                thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' });
            });
        // Ẩn hộp thoại xác nhận xóa
        setHienThiHopThoaiXoa(false);
    }

    // Hàm lọc danh sách thể loại dựa trên từ khóa tìm kiếm
    function locDanhSachTheLoai() {
        return danhSachTheLoai.filter(function (theLoai) {
            // Kiểm tra xem từ khóa tìm kiếm có rỗng không hoặc tên thể loại có chứa từ khóa (không phân biệt hoa thường) không
            return tuKhoaTimKiem === '' || theLoai.tentheloai.toLowerCase().includes(tuKhoaTimKiem.toLowerCase());
        });
    }

    return (
        <div>
            {/* Component Toast để hiển thị các thông báo */}
            <Toast ref={thongBaoRef} />

            <div className="mb-3 flex items-center">
                {/* Nút để mở hộp thoại thêm mới thể loại */}
                <Button label="Thêm" icon="pi pi-plus" onClick={moHopThoaiThemMoi} />
                {/* Ô nhập liệu để tìm kiếm thể loại */}
                <InputText placeholder="Tìm kiếm..." value={tuKhoaTimKiem} onChange={function (e) { setTuKhoaTimKiem(e.target.value); }} className="ml-auto w-1/3" />
            </div>

            {/* Component DataTable để hiển thị danh sách thể loại */}
            <DataTable value={locDanhSachTheLoai()} paginator rows={5} emptyMessage="Không có dữ liệu">
                {/* Cột hiển thị tên thể loại, có thể sắp xếp và được thiết lập độ rộng */}
                <Column field="tentheloai" header="Tên thể loại" sortable style={{ width: '15%' }} />
                {/* Cột hiển thị mô tả thể loại, có thể sắp xếp */}
                <Column field="mota" header="Mô tả" sortable />
                {/* Cột chứa các nút hành động (chỉnh sửa, xóa) */}
                <Column
                    body={(rowData) => (
                        <div className="flex gap-2">
                            {/* Nút chỉnh sửa, khi click gọi hàm mở hộp thoại chỉnh sửa với thông tin thể loại hiện tại */}
                            <Button icon="pi pi-pencil" className="p-button-primary" onClick={() => moHopThoaiChinhSua(rowData)} />
                            {/* Nút xóa, khi click gọi hàm mở hộp thoại xác nhận xóa với thông tin thể loại hiện tại */}
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moHopThoaiXoa(rowData)} />
                        </div>
                    )}
                    style={{ width: '12%' }} />
            </DataTable>

            {/* Hộp thoại thêm mới/chỉnh sửa thông tin thể loại */}
            <Dialog visible={hienThiHopThoai} header="Thông tin thể loại" style={{ maxWidth: '600px' }} onHide={function () { setHienThiHopThoai(false); }}>
                <div className="p-fluid">
                    {/* Trường ID, bị vô hiệu hóa vì thường được tạo tự động */}
                    <label className="mb-2">ID</label>
                    <InputText value={thongTinTheLoai.id} disabled className="mb-3 mt-3" />

                    {/* Trường tên thể loại */}
                    <label className="mb-2">Tên thể loại</label>
                    <InputText value={thongTinTheLoai.tentheloai} onChange={function (e) { setThongTinTheLoai({ ...thongTinTheLoai, tentheloai: e.target.value }); }} className="mb-3 mt-3" />

                    {/* Trường mô tả thể loại */}
                    <label className="mb-2">Mô tả</label>
                    <InputText value={thongTinTheLoai.mota} onChange={function (e) { setThongTinTheLoai({ ...thongTinTheLoai, mota: e.target.value }); }} className="mb-3 mt-3" />

                </div>
                {/* Nút lưu thông tin thể loại */}
                <Button label="Lưu" onClick={luuThongTinTheLoai} className="mt-3" />
            </Dialog>

            {/* Hộp thoại xác nhận xóa thể loại */}
            <Dialog visible={hienThiHopThoaiXoa} header="Xác nhận xóa" style={{ minWidth: '300px' }} onHide={function () { setHienThiHopThoaiXoa(false); }}>
                <p>Bạn có chắc muốn xóa thể loại này?</p>
                {/* Nút xóa thể loại */}
                <Button label="Xóa" className="p-button-danger" onClick={xoaTheLoai} />
            </Dialog>
        </div>
    );
}

export default QuanLyTheloai;
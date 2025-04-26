import React, { useState, useEffect, useRef } from 'react'; // Import các thư viện cần thiết từ React
import axios from 'axios'; // Import thư viện axios để gọi API
import { Button } from 'primereact/button'; // Import component Button từ PrimeReact
import { Column } from 'primereact/column'; // Import component Column cho bảng dữ liệu từ PrimeReact
import { DataTable } from 'primereact/datatable'; // Import component DataTable để hiển thị dữ liệu dạng bảng từ PrimeReact
import { Dialog } from 'primereact/dialog'; // Import component Dialog để tạo hộp thoại từ PrimeReact
import { InputText } from 'primereact/inputtext'; // Import component InputText để tạo ô nhập liệu văn bản từ PrimeReact
import { InputNumber } from 'primereact/inputnumber'; // Import component InputNumber để tạo ô nhập liệu số từ PrimeReact
import { Toast } from 'primereact/toast'; // Import component Toast để hiển thị thông báo từ PrimeReact
import { Dropdown } from 'primereact/dropdown'; // Import component Dropdown để tạo danh sách chọn từ PrimeReact

// Định nghĩa URL của API backend để lấy dữ liệu truyện
const API_URL = 'http://localhost:3001/truyens';
// Định nghĩa URL của Cloudinary API để tải ảnh lên
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dz7086zgw/image/upload';
// Định nghĩa preset name trên Cloudinary để cấu hình tải lên
const UPLOAD_PRESET = 'upload_nxbKimDong';

const danhSachDoiTuong = [
    { label: 'Nhà trẻ - mẫu giáo (0 - 6)', value: 'Nhà trẻ - mẫu giáo (0 - 6)' },
    { label: 'Nhi đồng (6 – 11)', value: 'Nhi đồng (6 – 11)' },
    { label: 'Thiếu niên (11 – 15)', value: 'Thiếu niên (11 – 15)' },
    { label: 'Tuổi mới lớn (15 – 18)', value: 'Tuổi mới lớn (15 – 18)' },
    { label: 'Tuổi trưởng thành (trên 18 tuổi)', value: 'Tuổi trưởng thành (trên 18 tuổi)' },
];


function QuanLyTruyen() {
    // State để lưu trữ danh sách truyện lấy từ API
    const [danhSachTruyen, setDanhSachTruyen] = useState([]);
    // State để lưu trữ danh sách thể loại truyện lấy từ API
    const [danhSachTheLoai, setDanhSachTheLoai] = useState([]);
    // State để lưu trữ danh sách quảng cáo lấy từ API (hiện tại không được sử dụng nhiều trong logic)
    const [danhSachQuangCao, setDanhSachQuangCao] = useState([]);
    // State để lưu trữ thông tin chi tiết của một truyện đang được thêm mới hoặc chỉnh sửa
    const [thongTinTruyen, setThongTinTruyen] = useState({
        id: '',
        anhtruyen: '',
        tentruyen: '',
        isbn: '',
        tacgia: '',
        doituong: '',
        sotrang: '',
        dinhdang: '',
        trongluong: '',
        matheloai: '',
        maquangcao: null,
        soluong: 0,
        giagoc: 0,
        phantramgiamgia: 0,
        giaban: ''
    });
    // State để điều khiển hiển thị hộp thoại thêm mới/chỉnh sửa truyện
    const [hienThiHopThoai, setHienThiHopThoai] = useState(false);
    // State để điều khiển hiển thị hộp thoại xác nhận xóa truyện
    const [hienThiXoaHopThoai, setHienThiXoaHopThoai] = useState(false);
    // State để lưu trữ từ khóa tìm kiếm
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    // Ref để truy cập component Toast để hiển thị thông báo
    const thongBaoRef = useRef(null);

    // useEffect hook được gọi sau lần render đầu tiên và sau mỗi lần các biến trong dependency array thay đổi
    useEffect(() => {
        // Gọi hàm để tải danh sách truyện từ API
        taiDanhSachTruyen();
        // Gọi API để lấy danh sách thể loại truyện
        axios.get('http://localhost:3001/theloais')
            .then(res => setDanhSachTheLoai(res.data || [])) // Cập nhật state danhSachTheLoai với dữ liệu nhận được hoặc mảng rỗng nếu không có dữ liệu
            .catch(() => thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải thể loại!' })); // Hiển thị thông báo lỗi nếu không tải được

        // Gọi API để lấy danh sách quảng cáo (tương tự như thể loại)
        axios.get('http://localhost:3001/quangcaos')
            .then(res => setDanhSachQuangCao(res.data || []))
            .catch(() => thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải quảng cáo!' }));
    }, []); // Mảng dependency rỗng nghĩa là useEffect chỉ chạy một lần sau lần render đầu tiên

    // Hàm để tải danh sách truyện từ API
    function taiDanhSachTruyen() {
        axios.get(API_URL)
            .then(res => setDanhSachTruyen(res.data || [])) // Cập nhật state danhSachTruyen với dữ liệu nhận được hoặc mảng rỗng
            .catch(() => thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' })); // Hiển thị thông báo lỗi nếu không tải được
    }

    // Hàm tạo ID duy nhất cho truyện mới
    function taoID() {
        return Date.now().toString(36).slice(-5) + Math.random().toString(36).slice(-3);
    }

    // Hàm mở hộp thoại thêm mới truyện và đặt lại thông tin truyện về trạng thái ban đầu
    function moHopThoaiThemMoi() {
        setThongTinTruyen({ id: taoID(), anhtruyen: '', tentruyen: '', isbn: '', tacgia: '', doituong: '', sotrang: '', dinhdang: '', trongluong: '', matheloai: '', maquangcao: null, soluong: 0, giagoc: 0, phantramgiamgia: 0, giaban: '' });
        setHienThiHopThoai(true); // Hiển thị hộp thoại
    }

    // Hàm mở hộp thoại chỉnh sửa truyện và điền thông tin truyện vào form
    function moHopThoaiChinhSua(truyen) {
        setThongTinTruyen(truyen); // Cập nhật state thongTinTruyen với thông tin của truyện cần chỉnh sửa
        setHienThiHopThoai(true); // Hiển thị hộp thoại
    }

    // Hàm xử lý tải lên ảnh truyện lên Cloudinary
    function taiAnh(event) {
        const file = event.target.files[0]; // Lấy file ảnh từ input
        if (!file) return; // Nếu không có file thì thoát

        const formData = new FormData(); // Tạo đối tượng FormData để gửi dữ liệu file
        formData.append("file", file); // Thêm file vào formData với key là "file"
        formData.append("upload_preset", UPLOAD_PRESET); // Thêm upload preset vào formData

        // Gửi yêu cầu POST đến Cloudinary API để tải ảnh lên
        axios.post(CLOUDINARY_URL, formData)
            .then(res => {
                const url = res.data.secure_url; // Lấy URL ảnh đã tải lên từ response
                setThongTinTruyen(prev => ({ ...prev, anhtruyen: url })); // Cập nhật state thongTinTruyen với URL ảnh mới
                thongBaoRef.current?.show({ severity: 'success', summary: 'Tải ảnh thành công' }); // Hiển thị thông báo thành công
            })
            .catch(() => {
                thongBaoRef.current?.show({ severity: 'error', summary: 'Tải ảnh thất bại' }); // Hiển thị thông báo lỗi
            });
    }

    // Hàm lưu thông tin truyện (thêm mới hoặc cập nhật)
    function luuThongTinTruyen() {
        // Tách trường giaban ra khỏi đối tượng thongTinTruyen vì nó có thể được tính toán ở backend (tùy logic)
        const { giaban, ...duLieuGui } = thongTinTruyen;
        // Hàm kiểm tra xem một giá trị có rỗng hay không
        const kiemTraRong = (value) => typeof value === 'string' ? value.trim() === '' : value == null;

        // Kiểm tra các trường bắt buộc không được để trống
        if (kiemTraRong(thongTinTruyen.tentruyen) || kiemTraRong(thongTinTruyen.isbn) || kiemTraRong(thongTinTruyen.tacgia) || kiemTraRong(thongTinTruyen.doituong)
            || kiemTraRong(thongTinTruyen.sotrang) || kiemTraRong(thongTinTruyen.dinhdang) || kiemTraRong(thongTinTruyen.trongluong)
            || thongTinTruyen.soluong == null || thongTinTruyen.giagoc == null || thongTinTruyen.phantramgiamgia == null) {
            thongBaoRef.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return; // Dừng hàm nếu có trường bị bỏ trống
        }

        // Xác định xem đây là thêm mới hay cập nhật dựa trên sự tồn tại của ID trong danh sách hiện tại
        const request = danhSachTruyen.some(item => item.id === thongTinTruyen.id)
            ? axios.put(API_URL + '/' + thongTinTruyen.id, duLieuGui) // Nếu ID tồn tại, gọi API PUT để cập nhật
            : axios.post(API_URL, duLieuGui); // Nếu ID không tồn tại, gọi API POST để thêm mới

        // Thực hiện request API
        request.then(() => {
            taiDanhSachTruyen(); // Tải lại danh sách truyện sau khi thêm hoặc cập nhật thành công
            thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: danhSachTruyen.some(i => i.id === thongTinTruyen.id) ? 'Cập nhật thành công!' : 'Thêm thành công!' });
            setHienThiHopThoai(false); // Ẩn hộp thoại sau khi lưu thành công
        }).catch(() => {
            thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Thao tác thất bại!' }); // Hiển thị thông báo lỗi nếu thao tác thất bại
        });
    }

    // Hàm mở hộp thoại xác nhận xóa truyện
    function moHopThoaiXoa(truyen) {
        setThongTinTruyen(truyen); // Lưu thông tin truyện cần xóa vào state
        setHienThiXoaHopThoai(true); // Hiển thị hộp thoại xác nhận xóa
    }

    // Hàm thực hiện xóa truyện
    function xoaTruyen() {
        axios.delete(API_URL + '/' + thongTinTruyen.id) // Gọi API DELETE để xóa truyện theo ID
            .then(() => {
                taiDanhSachTruyen(); // Tải lại danh sách truyện sau khi xóa thành công
                thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
                setHienThiXoaHopThoai(false); // Ẩn hộp thoại xác nhận xóa
            })
            .catch(() => {
                thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' }); // Hiển thị thông báo lỗi nếu xóa thất bại
            });
    }

    // Hàm lọc danh sách truyện dựa trên từ khóa tìm kiếm
    function locDanhSachTruyen() {
        return danhSachTruyen.filter(truyen =>
            tuKhoaTimKiem === '' || truyen.tentruyen.toLowerCase().includes(tuKhoaTimKiem.toLowerCase())
        );
    }

    // Hàm định dạng nội dung hiển thị cho cột ảnh truyện trong bảng
    function hinhAnhCot(rowData) {
        return <img src={rowData.anhtruyen} alt="Ảnh" style={{ width: '80px', objectFit: 'cover' }} />;
    }

    // Hàm định dạng tiền tệ Việt Nam Đồng
    const dinhDangTienTe = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
    };

    // Hàm định dạng số Việt Nam
    const dinhDangSo = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    return (
        <div>
            {/* Component Toast để hiển thị các thông báo */}
            <Toast ref={thongBaoRef} />
            <div className="mb-3 flex items-center">
                {/* Nút để mở hộp thoại thêm mới truyện */}
                <Button label="Thêm" icon="pi pi-plus" onClick={moHopThoaiThemMoi} />
                {/* Ô nhập liệu để tìm kiếm truyện */}
                <InputText placeholder="Tìm kiếm..." value={tuKhoaTimKiem} onChange={(e) => setTuKhoaTimKiem(e.target.value)} className="ml-auto w-1/3" />
            </div>

            {/* Component DataTable để hiển thị danh sách truyện */}
            <DataTable value={locDanhSachTruyen()} paginator rows={5} emptyMessage="Không có dữ liệu">
                {/* Cột hiển thị ảnh truyện */}
                <Column header="Ảnh truyện" body={hinhAnhCot} style={{ width: '12%' }} />
                {/* Cột hiển thị tên truyện, có thể sắp xếp */}
                <Column field="tentruyen" header="Tên truyện" sortable style={{ width: '20%' }} />
                {/* Cột hiển thị số lượng, có thể sắp xếp và được định dạng */}
                <Column
                    field="soluong"
                    header="Số lượng"
                    sortable
                    style={{ width: '12%' }}
                    body={(rowData) => dinhDangSo(rowData.soluong) + ' quyển'}
                />
                {/* Cột hiển thị giá gốc, có thể sắp xếp và được định dạng */}
                <Column
                    field="giagoc"
                    header="Giá gốc"
                    sortable
                    style={{ width: '10%' }}
                    body={(rowData) => dinhDangTienTe(rowData.giagoc)}
                />
                {/* Cột hiển thị phần trăm giảm giá, có thể sắp xếp */}
                <Column
                    field="phantramgiamgia"
                    header="Giảm giá"
                    sortable
                    style={{ width: '10%' }}
                    body={(rowData) => rowData.phantramgiamgia + '%'} />
                {/* Cột hiển thị giá bán, có thể sắp xếp và được định dạng */}
                <Column
                    field="giaban"
                    header="Giá bán"
                    sortable
                    style={{ width: '10%' }}
                    body={(rowData) => dinhDangTienTe(rowData.giaban)}
                />
                {/* Cột chứa các nút hành động (chỉnh sửa, xóa) */}
                <Column body={(rowData) => (
                    <>
                        {/* Nút chỉnh sửa, khi click gọi hàm mở hộp thoại chỉnh sửa với thông tin truyện hiện tại */}
                        <Button icon="pi pi-pencil" className="mr-2" onClick={() => moHopThoaiChinhSua(rowData)} />
                        {/* Nút xóa, khi click gọi hàm mở hộp thoại xác nhận xóa với thông tin truyện hiện tại */}
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moHopThoaiXoa(rowData)} />
                    </>
                )} style={{ width: '10%' }} />
            </DataTable>

            {/* Hộp thoại thêm mới/chỉnh sửa thông tin truyện */}
            <Dialog visible={hienThiHopThoai} header="Thông tin" style={{ maxWidth: '600px' }} onHide={() => setHienThiHopThoai(false)}>
                <div className="p-fluid">
                    {/* Trường ID, bị vô hiệu hóa vì thường được tạo tự động */}
                    <label className="mb-2">ID</label>
                    <InputText value={thongTinTruyen.id} disabled className="mb-3 mt-3" />

                    {/* Trường tải ảnh truyện */}
                    <label className="mb-2">Ảnh truyện</label> <br />
                    <input type="file" accept="image/*" onChange={taiAnh} className="mb-2 mt-2" style={{ textAlign: 'center' }} />
                    <br />
                    {/* Hiển thị ảnh xem trước nếu đã tải lên */}
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        {thongTinTruyen.anhtruyen && <img src={thongTinTruyen.anhtruyen} alt="Xem trước" style={{ width: '150px' }} />}
                    </div>
                    <br />

                    {/* Trường tên truyện */}
                    <label className="mb-2">Tên truyện</label>
                    <InputText value={thongTinTruyen.tentruyen} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, tentruyen: e.target.value })} className="mb-3 mt-3" />

                    {/* Trường ISBN */}
                    <label className="mb-2">ISBN</label>
                    <InputText value={thongTinTruyen.isbn} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, isbn: e.target.value })} className="mb-3 mt-3" />

                    {/* Trường tác giả */}
                    <label className="mb-2">Tác giả</label>
                    <InputText value={thongTinTruyen.tacgia} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, tacgia: e.target.value })} className="mb-3 mt-3" />

                    {/* Trường đối tượng */}
                    <label className="mb-2">Đối tượng</label>
                    <Dropdown
                        value={thongTinTruyen.doituong}
                        options={danhSachDoiTuong}
                        onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, doituong: e.value })}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Chọn đối tượng"
                        className="mb-3 mt-3"
                    />
                    {/* Trường số trang */}
                    <label className="mb-2">Số trang</label>
                    {/* <InputText value={thongTinTruyen.sotrang} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, sotrang: e.target.value })} className="mb-3 mt-3" /> */}
                    <InputNumber
                        value={thongTinTruyen.sotrang}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, sotrang: e.value })}
                        min={0}
                        className="mb-3 mt-3"
                    />
                    {/* Trường định dạng */}
                    <label className="mb-2">Định dạng</label>
                    <InputText value={thongTinTruyen.dinhdang} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, dinhdang: e.target.value })} className="mb-3 mt-3" />

                    {/* Trường trọng lượng */}
                    <label className="mb-2">Trọng lượng</label>
                    <InputText value={thongTinTruyen.trongluong} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, trongluong: e.target.value })} className="mb-3 mt-3" />

                    {/* Trường thể loại (Dropdown) */}
                    <label className="mb-2">Thể loại</label>
                    <Dropdown
                        value={thongTinTruyen.matheloai}
                        options={danhSachTheLoai} // Danh sách các tùy chọn thể loại
                        onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, matheloai: e.value })} // Cập nhật state khi chọn thể loại
                        optionLabel="tentheloai" // Thuộc tính của đối tượng thể loại để hiển thị trên dropdown
                        optionValue="id" // Thuộc tính của đối tượng thể loại làm giá trị được chọn
                        placeholder="Chọn thể loại"
                        className="mb-3 mt-3"
                    />

                    {/* Trường số lượng (InputNumber) */}
                    <label className="mb-2">Số lượng</label>
                    <InputNumber
                        value={thongTinTruyen.soluong}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, soluong: e.value })} // Cập nhật state khi thay đổi giá trị số lượng
                        min={0} // Giá trị tối thiểu
                        className="mb-3 mt-3"
                    />

                    {/* Trường giá gốc (InputNumber) */}
                    <label className="mb-2">Giá gốc</label>
                    <InputNumber
                        value={thongTinTruyen.giagoc}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, giagoc: e.value })} // Cập nhật state khi thay đổi giá trị giá gốc
                        min={0}
                        className="mb-3 mt-3"
                    />

                    {/* Trường phần trăm giảm giá (InputNumber) */}
                    <label className="mb-2">Phần trăm giảm giá</label>
                    <InputNumber
                        value={thongTinTruyen.phantramgiamgia}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, phantramgiamgia: e.value })} // Cập nhật state khi thay đổi phần trăm giảm giá
                        min={0}
                        max={100} // Giá trị tối đa là 100%
                        suffix="%" // Hiển thị dấu phần trăm sau giá trị
                        className="mb-3 mt-3"
                    />

                    {/* Trường quảng cáo (Dropdown) */}
                    <label className="mb-2">Quảng cáo</label>
                    <Dropdown
                        value={thongTinTruyen.maquangcao}
                        options={danhSachQuangCao} // Danh sách các tùy chọn quảng cáo
                        onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, maquangcao: e.value })} // Cập nhật state khi chọn quảng cáo
                        optionLabel="tenquangcao" // Thuộc tính để hiển thị tên quảng cáo
                        optionValue="id" // Thuộc tính làm giá trị quảng cáo
                        placeholder="Chọn quảng cáo"
                        className="mb-3 mt-3"
                    />
                </div>
                {/* Nút lưu thông tin truyện */}
                <Button label="Lưu" onClick={luuThongTinTruyen} className="mt-3" />
            </Dialog>

            {/* Hộp thoại xác nhận xóa truyện */}
            <Dialog visible={hienThiXoaHopThoai} header="Xác nhận" style={{ minWidth: '300px' }} onHide={() => setHienThiXoaHopThoai(false)}>
                <p>Bạn có chắc muốn xóa?</p>
                {/* Nút xóa truyện */}
                <Button label="Xóa" className="p-button-danger" onClick={xoaTruyen} />
            </Dialog>
        </div>
    );
}

export default QuanLyTruyen;
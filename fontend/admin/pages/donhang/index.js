import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { format, parseISO } from 'date-fns';

const API_URL_DONHANG = 'http://localhost:3001/donhangs';
const API_URL_CHITIETDONHANG = 'http://localhost:3001/chitietdonhangs';
const API_URL_NHANVIEN = 'http://localhost:3001/nhanviens';
const API_URL_KHACHHANG = 'http://localhost:3001/khachhangs';
const API_URL_TRUYEN = 'http://localhost:3001/truyens';

function QuanLyDonHang() {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [danhSachDonHangDisplay, setDanhSachDonHangDisplay] = useState([]);
    const [hienThiChiTietDialog, setHienThiChiTietDialog] = useState(false);
    const [chiTietDonHang, setChiTietDonHang] = useState([]);
    const [donHangChiTiet, setDonHangChiTiet] = useState(null);
    const [hienThiSuaDialog, setHienThiSuaDialog] = useState(false);
    const [donHangDangChon, setDonHangDangChon] = useState({});
    const [danhSachNhanVien, setDanhSachNhanVien] = useState([]);
    const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
    const [cacTrangThaiDonHang] = useState(['Chờ xử lý', 'Đang giao', 'Đã giao', 'Đã hủy']);
    const toastRef = useRef(null);
    const [txtTimKiem, setTxtTimKiem] = useState('');
    const [locDonHangChoXuLy, setLocDonHangChoXuLy] = useState(false); // Thêm state bộ lọc

    useEffect(() => {
        Promise.all([getDSDonHang(), getDSNhanVien(), getDSKhachHang()])
    }, []);

    useEffect(() => {
        filterDonHang(); // Gọi filter khi trạng thái lọc hoặc danh sách đơn hàng thay đổi
    }, [locDonHangChoXuLy, danhSachDonHang]); // Theo dõi cả trạng thái lọc

    const getDSDonHang = async () => {
        try {
            const res = await axios.get(`${API_URL_DONHANG}`);
            setDanhSachDonHang(res.data || []);
            setDanhSachDonHangDisplay(res.data || []);
        } catch (error) {
            toastRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách đơn hàng!' });
        }
    };

    const getCTDonHang = async (maDonHang) => {
        try {
            const resDonHang = await axios.get(`${API_URL_DONHANG}/${maDonHang}?`);
            setDonHangChiTiet(resDonHang.data);
            const resChiTiet = await axios.get(`${API_URL_CHITIETDONHANG}/donhang/${maDonHang}`);
            const chiTietDaThemThongTinTruyen = await Promise.all(
                resChiTiet.data.map(async (item) => {
                    try {
                        const resTruyen = await axios.get(`${API_URL_TRUYEN}/${item.matruyen}`);
                        return { ...item, truyen: resTruyen.data };
                    } catch (error) {
                        console.error(`Lỗi khi tải thông tin truyện cho mã ${item.matruyen}:`, error);
                        return { ...item, truyen: [] };
                    }
                })
            );
            setChiTietDonHang(chiTietDaThemThongTinTruyen || []);
            setHienThiChiTietDialog(true);
        } catch (error) {
            console.error('Lỗi khi tải chi tiết đơn hàng:', error);
            toastRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải chi tiết đơn hàng!' });
        }
    };

    const getDSNhanVien = async () => {
        try {
            const res = await axios.get(API_URL_NHANVIEN);
            setDanhSachNhanVien(res.data || []);
        } catch (error) {
            toastRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách nhân viên!' });
        }
    };

    const getDSKhachHang = async () => {
        try {
            const res = await axios.get(API_URL_KHACHHANG);
            setDanhSachKhachHang(res.data || []);
        } catch (error) {
            toastRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách khách hàng!' });
        }
    };

    const xemChiTiet = (donHang) => {
        getCTDonHang(donHang.id);
        setDonHangDangChon({ ...donHang });
    };

    const openDialogUpdate = (donHang) => {
        setDonHangDangChon({ ...donHang });
        setHienThiSuaDialog(true);
    };

    const updateDonHang = async () => {
        try {
            await axios.put(`${API_URL_DONHANG}/${donHangDangChon.id}`,
                {
                    manhanvienxulydonhang: donHangDangChon.manhanvienxulydonhang || null,
                    trangthai: donHangDangChon.trangthai
                });
            getDSDonHang();
            setHienThiSuaDialog(false);
            toastRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật đơn hàng thành công!' });
        } catch (error) {
            toastRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể cập nhật đơn hàng!' });
        }
    };

    const hienThiTenNhanVien = (rowData) => {
        const nhanVien = danhSachNhanVien.find(nv => nv.id === rowData.manhanvienxulydonhang);
        return nhanVien?.tennhanvien || 'Chưa phân công';
    };

    const hienThiTenKhachHang = (rowData) => {
        const khachHang = danhSachKhachHang.find(kh => kh.id === rowData.makhachhangdathang);
        return khachHang?.tenkhachhang || 'Khách lẻ';
    };

    const dinhDangNgayISO = (isoString) => {
        if (!isoString) return "";
        try {
            const date = parseISO(isoString);
            return format(date, "dd/MM/yyyy");
        } catch (error) {
            console.error("Lỗi khi chuyển đổi định dạng ngày:", isoString, error);
            return "Ngày không hợp lệ";
        }
    };

    const dinhDangTien = (tien) => {
        return (tien === null || tien === undefined) ? '0 đ' : tien.toLocaleString('vi-VN') + 'đ';
    };

    const getThaoTac = (rowData) => (
        <>
            <Button icon="pi pi-eye" className="mr-2" onClick={() => xemChiTiet(rowData)} tooltip="Xem chi tiết" />
            <Button icon="pi pi-pencil" className="p-button-warning mr-2" onClick={() => openDialogUpdate(rowData)} tooltip="Sửa" />
        </>
    );

    const getDonHangTimKiem = (event) => {
        const value = event.target.value.toLowerCase();
        setTxtTimKiem(value);
        const kq = danhSachDonHang.filter(donHang => {
            const tenKhachHang = hienThiTenKhachHang(donHang)?.toLowerCase() || '';
            const tenNhanVien = hienThiTenNhanVien(donHang)?.toLowerCase() || '';
            return tenKhachHang.includes(value) || tenNhanVien.includes(value);
        });
        setDanhSachDonHangDisplay(kq);
    };

    const toggleLocDonHangChoXuLy = () => {
        setLocDonHangChoXuLy(!locDonHangChoXuLy);
    };

    const filterDonHang = () => {
        if (locDonHangChoXuLy) {
            const donHangChoXuLy = danhSachDonHang.filter(donHang => donHang.trangthai === 'Chờ xử lý');
            setDanhSachDonHangDisplay(donHangChoXuLy);
        } else {
            setDanhSachDonHangDisplay([...danhSachDonHang]);
        }
    };

    const renderHeader = () => (
        <div className="flex justify-content-between" style={{ marginBottom: '10px' }}>
            <Button
                label={locDonHangChoXuLy ? "Bỏ lọc Chờ xử lý" : "Xem đơn hàng Chờ xử lý"}
                icon={locDonHangChoXuLy ? "pi pi-times-circle" : "pi pi-filter"}
                className={locDonHangChoXuLy ? "p-button-danger mr-2" : "p-button-info mr-2"}
                onClick={toggleLocDonHangChoXuLy}
            />
            <InputText
                value={txtTimKiem}
                onChange={getDonHangTimKiem}
                placeholder="Tìm kiếm"
            />
        </div>
    );

    const header = renderHeader();

    const dialogChiTiet = (
        <Dialog
            header={`Chi tiết đơn hàng: ${donHangDangChon?.id}`}
            visible={hienThiChiTietDialog}
            style={{ width: '70vw', minHeight: '60vh' }}
            modal
            onHide={() => setHienThiChiTietDialog(false)}
        >
            <div>
                {donHangChiTiet && (
                    <div className="mb-3">
                        <p><strong>Phương thức thanh toán:</strong> {donHangChiTiet[0]?.phuongthucthanhtoan}</p>
                        <p><strong>Mã giảm giá:</strong> {donHangChiTiet[0]?.magiamgia || 'Không có'}</p>
                    </div>
                )}
                {chiTietDonHang.length > 0 ? (
                    <div className="grid">
                        {chiTietDonHang.map((item) => (
                            <div key={item.id} className="col-12 md:col-6 lg:col-4">
                                <div className="p-3 shadow-2 border-round">
                                    <div className="flex flex-column align-items-center">
                                        {item.truyen?.[0]?.anhtruyen ? (
                                            <img
                                                src={item.truyen[0].anhtruyen}
                                                alt={item.truyen[0]?.tentruyen}
                                                width="100"
                                                height="140"
                                                className="mb-3"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="border-1 border-dashed surface-border border-round flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '140px' }}>
                                                Không có ảnh
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <div className="font-bold text-xl mb-1">{item.truyen?.[0]?.tentruyen || 'Không có tên'}</div>
                                            <small className="text-secondary">Số lượng: {item.soluong}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có sản phẩm nào trong đơn hàng này.</p>
                )}
            </div>
        </Dialog>
    );

    const dialogSuaDonHang = (
        <Dialog header={`Sửa đơn hàng: ${donHangDangChon?.id}`} visible={hienThiSuaDialog} style={{ width: '50vw' }} modal onHide={() => setHienThiSuaDialog(false)} footer={
            <>
                <Button label="Hủy" icon="pi pi-times" onClick={() => setHienThiSuaDialog(false)} className="p-button-secondary" />
                <Button label="Lưu" icon="pi pi-check" onClick={updateDonHang} />
            </>
        }>
            <div className="p-fluid">
                <div className="field">
                    <label htmlFor="manhanvienxulydonhang">Nhân viên xử lý</label>
                    <Dropdown
                        inputId="manhanvienxulydonhang"
                        value={donHangDangChon.manhanvienxulydonhang}
                        options={danhSachNhanVien}
                        optionLabel="tennhanvien"
                        optionValue="id"
                        placeholder="Chọn nhân viên"
                        onChange={(e) => setDonHangDangChon({ ...donHangDangChon, manhanvienxulydonhang: e.value })}
                    />
                </div>
                <div className="field">
                    <label htmlFor="trangthai">Trạng thái đơn hàng</label>
                    <Dropdown
                        inputId="trangthai"
                        value={donHangDangChon.trangthai}
                        options={cacTrangThaiDonHang}
                        placeholder="Chọn trạng thái"
                        onChange={(e) => setDonHangDangChon({ ...donHangDangChon, trangthai: e.value })}
                    />
                </div>
            </div>
        </Dialog>
    );

    return (
        <div>
            <Toast ref={toastRef} />
            {header}
            <DataTable
                value={danhSachDonHangDisplay}
                paginator
                rows={5}
                emptyMessage="Không có đơn hàng nào."
            >
                <Column field="khachhang" header="Tên khách hàng" body={hienThiTenKhachHang} sortable />
                <Column field="ngaydathang" header="Ngày đặt hàng" sortable body={(rowData) => dinhDangNgayISO(rowData.ngaydathang)} />
                <Column field="diachigiaohang" header="Địa chỉ giao hàng" />
                <Column header="Nhân viên xử lý" body={hienThiTenNhanVien} sortable field="manhanvienxulydonhang" />
                <Column field="trangthai" header="Trạng thái" sortable />
                <Column field="tongtien" header="Tổng tiền" sortable body={(rowData) => dinhDangTien(rowData.tongtien)} />
                <Column body={getThaoTac} header="Hành động" style={{ width: '150px' }} />
            </DataTable>
            {dialogChiTiet}
            {dialogSuaDonHang}
        </div>
    );
}

export default QuanLyDonHang;
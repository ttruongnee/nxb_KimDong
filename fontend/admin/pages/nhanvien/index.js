import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const API_URL_NHANVIEN = 'http://localhost:3001/nhanviens';
const API_URL_TAIKHOAN = 'http://localhost:3001/taikhoans';
const GioiTinh = ['Nam', 'Nữ'];

function QuanLyNhanvien() {
    const [danhSach, setDanhSach] = useState([]);
    const [nhanVien, setNhanVien] = useState({ id: '', tennhanvien: '', gioitinh: '', quequan: '', sodienthoai: '', email: '', taikhoan: '' });
    const [hienThiDialog, setHienThiDialog] = useState(false);
    const [hienThiXoa, setHienThiXoa] = useState(false);
    const [tuKhoa, setTuKhoa] = useState('');
    const thongBao = useRef(null);
    const [danhSachTaiKhoanNV, setDanhSachTaiKhoanNV] = useState([]); // Danh sách tài khoản NV và Admin

    useEffect(() => {
        Promise.all([loadNhanviens(), loadTaiKhoanNhanVienAdmin()]);
    }, []);

    async function loadNhanviens() {
        try {
            const response = await axios.get(API_URL_NHANVIEN);
            setDanhSach(response.data || []);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách nhân viên!' });
        }
    }

    async function loadTaiKhoanNhanVienAdmin() {
        try {
            const response = await axios.get(API_URL_TAIKHOAN);
            const taiKhoanNVAdmin = response.data ? response.data.filter(tk => tk.quyen === 'Nhân viên' || tk.quyen === 'Admin') : [];
            setDanhSachTaiKhoanNV(taiKhoanNVAdmin);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách tài khoản!' });
        }
    }

    function taoID() {
        let now = Date.now().toString(36).slice(-5);
        let random = Math.random().toString(36).slice(-3);
        return now + random;
    }

    function moThemMoi() {
        setNhanVien({ id: taoID(), tennhanvien: '', gioitinh: GioiTinh[0], quequan: '', sodienthoai: '', email: '', taikhoan: '' }); // Mặc định là Nam
        setHienThiDialog(true);
    }

    function moChinhSua(item) {
        setNhanVien(item);
        setHienThiDialog(true);
    }

    function convertSDT(str) {
        if (!str) {
            return false;
        }
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            if (charCode < 48 || charCode > 57) {
                return false;
            }
        }
        return true;
    }

    async function luuNhanvien() {
        if (nhanVien.tennhanvien.trim() === '' || nhanVien.sodienthoai.trim() === '' || nhanVien.email.trim() === '') {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return;
        }

        if (nhanVien.taikhoan.trim() === '') {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Vui lòng chọn tài khoản!' });
            return;
        }

        // if (!GioiTinh.includes(nhanVien.gioitinh)) {
        //     thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Giới tính không hợp lệ!' });
        //     return;
        // }


        if (!convertSDT(nhanVien.sodienthoai)) {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Số điện thoại không hợp lệ. Vui lòng chỉ nhập số!' });
            return;
        }

        if (!nhanVien.email.includes('@') || !nhanVien.email.includes('.')) {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Email không đúng định dạng!' });
            return;
        }

        try {
            if (danhSach.some(item => item.id === nhanVien.id)) {
                await axios.put(`${API_URL_NHANVIEN}/${nhanVien.id}`, nhanVien);
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
            } else {
                await axios.post(API_URL_NHANVIEN, nhanVien);
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
            }
            loadNhanviens();
            setHienThiDialog(false);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Lưu thất bại!' });
        }
    }

    function moXoa(item) {
        setNhanVien(item);
        setHienThiXoa(true);
    }

    async function xoaNhanvien() {
        try {
            await axios.delete(`${API_URL_NHANVIEN}/${nhanVien.id}`);
            loadNhanviens();
            thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
            setHienThiXoa(false);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' });
        }
    }

    function danhSachLoc() {
        return danhSach.filter(item => tuKhoa === '' || item.tennhanvien.toLowerCase().includes(tuKhoa.toLowerCase()));
    }

    const onInputChange = (e, name) => {
        const val = e.target.value;
        if (name === 'sodienthoai' && !/^\d*$/.test(val)) {
            return; // Không cập nhật state nếu có ký tự không phải số
        }
        setNhanVien({ ...nhanVien, [name]: val });
    }

    return (
        <div>
            <Toast ref={thongBao} />

            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoa} onChange={e => setTuKhoa(e.target.value)} className="ml-auto w-1/3" />
            </div>

            <DataTable value={danhSachLoc()} paginator rows={5} emptyMessage="Không có dữ liệu">
                {/* <Column field="id" header="ID" sortable /> */}
                <Column field="tennhanvien" header="Tên nhân viên" sortable />
                <Column field="gioitinh" header="Giới tính" sortable />
                <Column field="quequan" header="Quê quán" sortable />
                <Column field="sodienthoai" header="Số điện thoại" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="taikhoan" header="Tài khoản" sortable />
                <Column body={rowData => (
                    <>
                        <Button icon="pi pi-pencil" className="mr-2" onClick={() => moChinhSua(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moXoa(rowData)} />
                    </>
                )} />
            </DataTable>

            <Dialog visible={hienThiDialog} header="Thông tin nhân viên" style={{ maxWidth: '600px' }} onHide={() => setHienThiDialog(false)}>
                <div className="p-fluid">
                    <label className="mb-2">ID</label>
                    <InputText value={nhanVien.id} disabled className="mb-3 mt-3" />

                    <label className="mb-2">Tên nhân viên</label>
                    <InputText value={nhanVien.tennhanvien} onChange={e => onInputChange(e, 'tennhanvien')} className="mb-3 mt-3" />

                    <label className="mb-2">Giới tính</label>
                    <Dropdown
                        value={nhanVien.gioitinh}
                        options={GioiTinh}
                        onChange={e => onInputChange(e, 'gioitinh')}
                        placeholder="Chọn giới tính"
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Quê quán</label>
                    <InputText value={nhanVien.quequan} onChange={e => onInputChange(e, 'quequan')} className="mb-3 mt-3" />

                    <label className="mb-2">Số điện thoại</label>
                    <InputText value={nhanVien.sodienthoai} onChange={e => onInputChange(e, 'sodienthoai')} className="mb-3 mt-3" />

                    <label className="mb-2">Email</label>
                    <InputText value={nhanVien.email} onChange={e => onInputChange(e, 'email')} className="mb-3 mt-3" />

                    <label className="mb-2">Tài khoản</label>
                    <Dropdown
                        value={nhanVien.taikhoan}
                        options={danhSachTaiKhoanNV}
                        optionLabel="id"
                        optionValue="id"
                        placeholder="Chọn tài khoản"
                        onChange={e => onInputChange(e, 'taikhoan')}
                        className="mb-3 mt-3"
                    />
                </div>
                <Button label="Lưu" onClick={luuNhanvien} className="mt-3" />
            </Dialog>

            <Dialog visible={hienThiXoa} header="Xác nhận" style={{ minWidth: '300px' }} onHide={() => setHienThiXoa(false)}>
                <p>Bạn có chắc muốn xóa nhân viên này?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaNhanvien} />
            </Dialog>
        </div>
    );
}

export default QuanLyNhanvien;
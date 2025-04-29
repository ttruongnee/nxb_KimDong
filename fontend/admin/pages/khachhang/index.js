import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const API_URL_KHACHHANG = 'http://localhost:3001/khachhangs';
const API_URL_TAIKHOAN = 'http://localhost:3001/taikhoans';
const GioiTinh = ['Nam', 'Nữ'];

function QuanLyKhachhang() {
    const [danhSach, setDanhSach] = useState([]);
    const [khachHang, setKhachHang] = useState({ id: '', tenkhachhang: '', gioitinh: '', sodienthoai: '', email: '', taikhoan: '' });
    const [hienThiDialog, setHienThiDialog] = useState(false);
    const [hienThiXoa, setHienThiXoa] = useState(false);
    const [tuKhoa, setTuKhoa] = useState('');
    const thongBao = useRef(null);
    const [danhSachTaiKhoanKH, setDanhSachTaiKhoanKH] = useState([]); // Danh sách tài khoản Khách hàng

    useEffect(() => {
        Promise.all([loadKhachhangs(), loadTaiKhoanKhachHang()]);
    }, []);

    async function loadKhachhangs() {
        try {
            const response = await axios.get(API_URL_KHACHHANG);
            setDanhSach(response.data || []);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách khách hàng!' });
        }
    }

    async function loadTaiKhoanKhachHang() {
        try {
            const response = await axios.get(API_URL_TAIKHOAN);
            const taiKhoanKH = response.data ? response.data.filter(tk => tk.quyen === 'Khách hàng') : [];
            setDanhSachTaiKhoanKH(taiKhoanKH);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách tài khoản khách hàng!' });
        }
    }

    function taoID() {
        let now = Date.now().toString(36).slice(-5);
        let random = Math.random().toString(36).slice(-3);
        return now + random;
    }

    function moThemMoi() {
        setKhachHang({ id: taoID(), tenkhachhang: '', gioitinh: GioiTinh[0], sodienthoai: '', email: '', taikhoan: '' }); // Mặc định là Nam
        setHienThiDialog(true);
    }

    function moChinhSua(item) {
        setKhachHang(item);
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

    async function luuKhachhang() {
        if (khachHang.tenkhachhang.trim() === '' || khachHang.sodienthoai.trim() === '' || khachHang.email.trim() === '') {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return;
        }

        if (khachHang.taikhoan.trim() === '') {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Vui lòng chọn tài khoản!' });
            return;
        }

        // if (!GioiTinh.includes(khachHang.gioitinh)) {
        //     thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Giới tính không hợp lệ!' });
        //     return;
        // }

        if (!convertSDT(khachHang.sodienthoai)) {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Số điện thoại không hợp lệ. Vui lòng chỉ nhập số!' });
            return;
        }

        if (!khachHang.email.includes('@') || !khachHang.email.includes('.')) {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Email không đúng định dạng!' });
            return;
        }

        try {
            if (danhSach.some(item => item.id === khachHang.id)) {
                await axios.put(`${API_URL_KHACHHANG}/${khachHang.id}`, khachHang);
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
            } else {
                await axios.post(API_URL_KHACHHANG, khachHang);
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
            }
            loadKhachhangs();
            setHienThiDialog(false);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Lưu thất bại!' });
        }
    }

    function moXoa(item) {
        setKhachHang(item);
        setHienThiXoa(true);
    }

    async function xoaKhachhang() {
        try {
            await axios.delete(`${API_URL_KHACHHANG}/${khachHang.id}`);
            loadKhachhangs();
            thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
            setHienThiXoa(false);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' });
        }
    }

    function danhSachLoc() {
        return danhSach.filter(item => tuKhoa === '' || item.tenkhachhang.toLowerCase().includes(tuKhoa.toLowerCase()));
    }

    const onInputChange = (e, name) => {
        const val = e.target.value;
        if (name === 'sodienthoai' && !/^\d*$/.test(val)) {
            return; // Không cập nhật state nếu có ký tự không phải số
        }
        setKhachHang({ ...khachHang, [name]: val });
    }

    return (
        <div>
            <Toast ref={thongBao} />

            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoa} onChange={e => setTuKhoa(e.target.value)} className="ml-auto w-1/3" />
            </div>

            <DataTable value={danhSachLoc()} paginator rows={5} emptyMessage="Không có dữ liệu">
                {/* <Column field="id" header="id" sortable /> */}
                <Column field="tenkhachhang" header="Tên khách hàng" sortable />
                <Column field="gioitinh" header="Giới tính" sortable />
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

            <Dialog visible={hienThiDialog} header="Thông tin khách hàng" style={{ maxWidth: '600px' }} onHide={() => setHienThiDialog(false)}>
                <div className="p-fluid">
                    <label className="mb-2">ID</label>
                    <InputText value={khachHang.id} disabled className="mb-3 mt-3" />

                    <label className="mb-2">Tên khách hàng</label>
                    <InputText value={khachHang.tenkhachhang} onChange={e => setKhachHang({ ...khachHang, tenkhachhang: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">Giới tính</label>
                    <Dropdown
                        value={khachHang.gioitinh}
                        options={GioiTinh}
                        onChange={e => setKhachHang({ ...khachHang, gioitinh: e.value })}
                        placeholder="Chọn giới tính"
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Số điện thoại</label>
                    <InputText value={khachHang.sodienthoai} onChange={e => onInputChange(e, 'sodienthoai')} className="mb-3 mt-3" />

                    <label className="mb-2">Email</label>
                    <InputText value={khachHang.email} onChange={e => setKhachHang({ ...khachHang, email: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">Tài khoản</label>
                    <Dropdown
                        value={khachHang.taikhoan}
                        options={danhSachTaiKhoanKH}
                        optionLabel="id"
                        optionValue="id"
                        placeholder="Chọn tài khoản"
                        onChange={e => setKhachHang({ ...khachHang, taikhoan: e.value })}
                        className="mb-3 mt-3"
                    />
                </div>
                <Button label="Lưu" onClick={luuKhachhang} className="mt-3" />
            </Dialog>

            <Dialog visible={hienThiXoa} header="Xác nhận" style={{ minWidth: '300px' }} onHide={() => setHienThiXoa(false)}>
                <p>Bạn có chắc muốn xóa khách hàng này?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaKhachhang} />
            </Dialog>
        </div>
    );
}

export default QuanLyKhachhang;
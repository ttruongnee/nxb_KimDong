import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const API_URL = 'http://localhost:3001/taikhoans';
const CAC_QUYEN = ['Admin', 'Nhân viên', 'Khách hàng'];

function QuanLyTaikhoan() {
    const [danhSach, setDanhSach] = useState([]);
    const [taikhoan, setTaikhoan] = useState({ id: '', matkhau: '', quyen: '' });
    const [hienThiDialog, setHienThiDialog] = useState(false);
    const [hienThiXoa, setHienThiXoa] = useState(false);
    const [tuKhoa, setTuKhoa] = useState('');
    const thongBao = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadTaikhoans();
    }, []);

    function loadTaikhoans() {
        axios.get(API_URL)
            .then(response => setDanhSach(response.data || []))
            .catch(() => thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' }));
    }

    function moThemMoi() {
        setTaikhoan({ id: '', matkhau: '', quyen: CAC_QUYEN[2] }); // Mặc định quyền Khách hàng khi thêm mới
        setIsEditing(false);
        setHienThiDialog(true);
    }

    function moChinhSua(item) {
        setTaikhoan(item);
        setIsEditing(true);
        setHienThiDialog(true);
    }

    function luuTaikhoan() {
        if (taikhoan.id.trim() === '' || taikhoan.matkhau.trim() === '' || taikhoan.quyen.trim() === '') {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return;
        }

        if (!CAC_QUYEN.includes(taikhoan.quyen)) {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Quyền không hợp lệ!' });
            return;
        }

        if (isEditing) {
            axios.put(`${API_URL}/${taikhoan.id}`, taikhoan)
                .then(() => {
                    loadTaikhoans();
                    thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
                })
                .catch(() => thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật thất bại!' }));
        } else {
            axios.post(API_URL, taikhoan)
                .then(() => {
                    loadTaikhoans();
                    thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
                })
                .catch(() => thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Thêm thất bại!' }));
        }
        setHienThiDialog(false);
    }

    function moXoa(item) {
        setTaikhoan(item);
        setHienThiXoa(true);
    }

    function xoaTaikhoan() {
        axios.delete(`${API_URL}/${taikhoan.id}`)
            .then(() => {
                loadTaikhoans();
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
            })
            .catch(() => thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' }));
        setHienThiXoa(false);
    }

    function danhSachLoc() {
        return danhSach.filter(item => tuKhoa === '' || item.id.toLowerCase().includes(tuKhoa.toLowerCase()));
    }

    // function renderMatKhau(rowData) {
    //     return '*'.repeat(rowData.matkhau.length);
    // }

    return (
        <div>
            <Toast ref={thongBao} />

            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoa} onChange={e => setTuKhoa(e.target.value)} className="ml-auto w-1/3" />
            </div>

            <DataTable value={danhSachLoc()} paginator rows={5} emptyMessage="Không có dữ liệu">
                {/* <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} /> */}
                <Column field="id" header="Tài khoản" sortable />
                {/* <Column field="matkhau" header="Mật khẩu" body={renderMatKhau} sortable /> */}
                <Column field="quyen" header="Quyền" sortable />
                <Column body={rowData => (
                    <>
                        <Button icon="pi pi-pencil" className="mr-2" onClick={() => moChinhSua(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moXoa(rowData)} />
                    </>
                )} />
            </DataTable>

            <Dialog visible={hienThiDialog} header="Thông tin tài khoản" style={{ maxWidth: '600px' }} onHide={() => setHienThiDialog(false)}>
                <div className="p-fluid">
                    <label className="mb-2">Tài khoản</label>
                    <InputText
                        value={taikhoan.id}
                        onChange={e => setTaikhoan({ ...taikhoan, id: e.target.value })}
                        className="mb-3 mt-3"
                        disabled={isEditing}
                    />

                    {/* <label className="mb-2">Mật khẩu</label>
                    <InputText value={taikhoan.matkhau} onChange={e => setTaikhoan({ ...taikhoan, matkhau: e.target.value })} className="mb-3 mt-3" /> */}

                    <label className="mb-2">Quyền</label>
                    <Dropdown
                        value={taikhoan.quyen}
                        options={CAC_QUYEN}
                        onChange={e => setTaikhoan({ ...taikhoan, quyen: e.value })}
                        placeholder="Chọn quyền"
                        className="mb-3 mt-3"
                    />
                </div>
                <Button label="Lưu" onClick={luuTaikhoan} className="mt-3" />
            </Dialog>

            <Dialog visible={hienThiXoa} header="Xác nhận" style={{ minWidth: '300px' }} onHide={() => setHienThiXoa(false)}>
                <p>Bạn có chắc muốn xóa tài khoản này?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaTaikhoan} />
            </Dialog>
        </div>
    );
}

export default QuanLyTaikhoan;
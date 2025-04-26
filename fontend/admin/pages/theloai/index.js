import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const API_URL = 'http://localhost:3001/theloais';

function QuanLyTheloai() {
    const [danhSachTheLoai, setDanhSachTheLoai] = useState([]);
    const [thongTinTheLoai, setThongTinTheLoai] = useState({ id: '', tentheloai: '', mota: '' });
    const [hienThiHopThoai, setHienThiHopThoai] = useState(false);
    const [hienThiHopThoaiXoa, setHienThiHopThoaiXoa] = useState(false);
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const thongBaoRef = useRef(null);

    useEffect(() => {
        taiDanhSachTheLoai();
    }, []);

    function taiDanhSachTheLoai() {
        axios.get(API_URL)
            .then(function (response) {
                setDanhSachTheLoai(response.data || []);
            })
            .catch(function () {
                thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' });
            });
    }

    function taoID() {
        let phanThoiGian = Date.now().toString(36).slice(-5);
        let phanNgauNhien = Math.random().toString(36).slice(-3);
        return phanThoiGian + phanNgauNhien;
    }

    function moHopThoaiThemMoi() {
        setThongTinTheLoai({ id: taoID(), tentheloai: '', mota: '' });
        setHienThiHopThoai(true);
    }

    function moHopThoaiChinhSua(theLoai) {
        setThongTinTheLoai(theLoai);
        setHienThiHopThoai(true);
    }

    function luuThongTinTheLoai() {
        if (thongTinTheLoai.tentheloai.trim() === '') {
            thongBaoRef.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Tên thể loại không được để trống!' });
            return;
        }

        if (danhSachTheLoai.some(function (item) { return item.id === thongTinTheLoai.id; })) {
            axios.put(API_URL + '/' + thongTinTheLoai.id, thongTinTheLoai)
                .then(function () {
                    taiDanhSachTheLoai();
                    thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
                })
                .catch(function () {
                    thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật thất bại!' });
                });
        } else {
            axios.post(API_URL, thongTinTheLoai)
                .then(function () {
                    taiDanhSachTheLoai();
                    thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
                })
                .catch(function () {
                    thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Thêm thất bại!' });
                });
        }
        setHienThiHopThoai(false);
    }

    function moHopThoaiXoa(theLoai) {
        setThongTinTheLoai(theLoai);
        setHienThiHopThoaiXoa(true);
    }

    function xoaTheLoai() {
        axios.delete(API_URL + '/' + thongTinTheLoai.id)
            .then(function () {
                taiDanhSachTheLoai();
                thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
            })
            .catch(function () {
                thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' });
            });
        setHienThiHopThoaiXoa(false);
    }

    function locDanhSachTheLoai() {
        return danhSachTheLoai.filter(function (theLoai) {
            return tuKhoaTimKiem === '' || theLoai.tentheloai.toLowerCase().includes(tuKhoaTimKiem.toLowerCase());
        });
    }

    return (
        <div>
            <Toast ref={thongBaoRef} />

            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moHopThoaiThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoaTimKiem} onChange={(e) => setTuKhoaTimKiem(e.target.value)} className="ml-auto w-1/3" />
            </div>

            <DataTable value={locDanhSachTheLoai()} paginator rows={5} emptyMessage="Không có dữ liệu">
                <Column field="tentheloai" header="Tên thể loại" sortable style={{ width: '15%' }} />
                <Column field="mota" header="Mô tả" sortable />
                <Column
                    body={(rowData) => (
                        <div className="flex gap-2">
                            <Button icon="pi pi-pencil" className="p-button-primary" onClick={() => moHopThoaiChinhSua(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moHopThoaiXoa(rowData)} />
                        </div>
                    )}
                    style={{ width: '12%' }} />
            </DataTable>

            <Dialog visible={hienThiHopThoai} header="Thông tin thể loại" style={{ maxWidth: '600px' }} onHide={() => setHienThiHopThoai(false)}>
                <div className="p-fluid">
                    <label className="mb-2">ID</label>
                    <InputText value={thongTinTheLoai.id} disabled className="mb-3 mt-3" />

                    <label className="mb-2">Tên thể loại</label>
                    <InputText value={thongTinTheLoai.tentheloai} onChange={(e) => setThongTinTheLoai({ ...thongTinTheLoai, tentheloai: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">Mô tả</label>
                    <InputText value={thongTinTheLoai.mota} onChange={(e) => setThongTinTheLoai({ ...thongTinTheLoai, mota: e.target.value })} className="mb-3 mt-3" />

                </div>
                <Button label="Lưu" onClick={luuThongTinTheLoai} className="mt-3" />
            </Dialog>

            <Dialog visible={hienThiHopThoaiXoa} header="Xác nhận xóa" style={{ minWidth: '300px' }} onHide={() => setHienThiHopThoaiXoa(false)}>
                <p>Bạn có chắc muốn xóa thể loại này?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaTheLoai} />
            </Dialog>
        </div>
    );
}

export default QuanLyTheloai;
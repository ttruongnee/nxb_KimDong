import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const API_URL = 'http://localhost:3001/quangcaos';

function QuanLyQuangcao() {
    const [danhSach, setDanhSach] = useState([]);
    const [Quangcao, setQuangcao] = useState({ id: '', tenquangcao: '' });
    const [hienThiDialog, setHienThiDialog] = useState(false);
    const [hienThiXoa, setHienThiXoa] = useState(false);
    const [tuKhoa, setTuKhoa] = useState('');
    const thongBao = useRef(null);

    useEffect(function () {
        loadQuangcaos();
    }, []);

    function loadQuangcaos() {
        axios.get(API_URL)
            .then(function (response) {
                setDanhSach(response.data || []);
            })
            .catch(function () {
                thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' });
            });
    }

    function taoID() {
        let now = Date.now().toString(36).slice(-5);
        let random = Math.random().toString(36).slice(-3);
        return now + random;
    }


    function moThemMoi() {
        setQuangcao({ id: taoID(), tenquangcao: '' });
        setHienThiDialog(true);
    }

    function moChinhSua(item) {
        setQuangcao(item);
        setHienThiDialog(true);
    }

    function luuQuangcao() {
        if (Quangcao.tenquangcao.trim() === '') {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return;
        }

        if (danhSach.some(function (item) { return item.id === Quangcao.id; })) {
            axios.put(API_URL + '/' + Quangcao.id, Quangcao)
                .then(function () {
                    loadQuangcaos();
                    thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
                })
                .catch(function () {
                    thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật thất bại!' });
                });
        } else {
            axios.post(API_URL, Quangcao)
                .then(function () {
                    loadQuangcaos();
                    thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
                })
                .catch(function () {
                    thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Thêm thất bại!' });
                });
        }
        setHienThiDialog(false);
    }

    function moXoa(item) {
        setQuangcao(item);
        setHienThiXoa(true);
    }

    function xoaQuangcao() {
        axios.delete(API_URL + '/' + Quangcao.id)
            .then(function () {
                loadQuangcaos();
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
            })
            .catch(function () {
                thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' });
            });
        setHienThiXoa(false);
    }

    function danhSachLoc() {
        return danhSach.filter(function (item) {
            return tuKhoa === '' || item.tenquangcao.toLowerCase().includes(tuKhoa.toLowerCase());
        });
    }

    return (
        <div>
            <Toast ref={thongBao} />

            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoa} onChange={function (e) { setTuKhoa(e.target.value); }} className="ml-auto w-1/3" />
            </div>

            <DataTable value={danhSachLoc()} paginator rows={5} emptyMessage="Không có dữ liệu">
                <Column field="tenquangcao" header="Tên quảng cáo" sortable />
                <Column body={function (rowData) {
                    return (
                        <>
                            <Button icon="pi pi-pencil" className="mr-2" onClick={function () { moChinhSua(rowData); }} />
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={function () { moXoa(rowData); }} />
                        </>
                    );
                }} />
            </DataTable>

            <Dialog visible={hienThiDialog} header="Thông tin" style={{ maxWidth: '600px' }} onHide={function () { setHienThiDialog(false); }}>
                <div className="p-fluid">
                    {/* <label className="mb-2">ID</label>
                    <InputText value={Quangcao.id} disabled className="mb-3 mt-3" /> */}

                    <label className="mb-2">Tên quảng cáo</label>
                    <InputText value={Quangcao.tenquangcao} onChange={function (e) { setQuangcao({ ...Quangcao, tenquangcao: e.target.value }); }} className="mb-3 mt-3" />

                </div>
                <Button label="Lưu" onClick={luuQuangcao} className="mt-3" />
            </Dialog>
            <Dialog visible={hienThiXoa} header="Xác nhận" style={{ minWidth: '300px' }} onHide={function () { setHienThiXoa(false); }}>
                <p>Bạn có chắc muốn xóa?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaQuangcao} />
            </Dialog>
        </div>
    );
}

export default QuanLyQuangcao;

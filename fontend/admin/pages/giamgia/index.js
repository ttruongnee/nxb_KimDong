import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const API_URL = 'http://localhost:3001/giamgias';

function QuanLyGiamgia() {
    const [danhSach, setDanhSach] = useState([]);
    const [Giamgia, setGiamgia] = useState({ id: '', ngaybatdau: '', ngayketthuc: '', phantramgiamgia: '' });
    const [hienThiDialog, setHienThiDialog] = useState(false);
    const [hienThiXoa, setHienThiXoa] = useState(false);
    const [tuKhoa, setTuKhoa] = useState('');
    const [cheDoChinhSua, setCheDoChinhSua] = useState(false);
    const thongBao = useRef(null);

    useEffect(() => {
        loadGiamgias();
    }, []);

    const loadGiamgias = async () => {
        try {
            const response = await axios.get(API_URL);
            setDanhSach(response.data || []);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' });
        }
    };

    const moThemMoi = () => {
        setGiamgia({ id: '', ngaybatdau: '', ngayketthuc: '', phantramgiamgia: '' });
        setCheDoChinhSua(false);
        setHienThiDialog(true);
    };

    const moChinhSua = (item) => {
        setGiamgia({
            id: item.id,
            ngaybatdau: item.ngaybatdau ? item.ngaybatdau.split("T")[0] : '',
            ngayketthuc: item.ngayketthuc ? item.ngayketthuc.split("T")[0] : '',
            phantramgiamgia: item.phantramgiamgia
        });
        setCheDoChinhSua(true);
        setHienThiDialog(true);
    };

    const luuGiamgia = async () => {
        if (!Giamgia.id || !Giamgia.ngaybatdau || !Giamgia.ngayketthuc || !Giamgia.phantramgiamgia) {
            thongBao.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return;
        }

        try {
            if (cheDoChinhSua) {
                await axios.put(`${API_URL}/${Giamgia.id}`, Giamgia);
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
            } else {
                await axios.post(API_URL, Giamgia);
                thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công!' });
            }
            loadGiamgias();
            setHienThiDialog(false);
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Lưu dữ liệu thất bại!' });
        }
    };

    const moXoa = (item) => {
        setGiamgia(item);
        setHienThiXoa(true);
    };

    const xoaGiamgia = async () => {
        try {
            await axios.delete(`${API_URL}/${Giamgia.id}`);
            loadGiamgias();
            thongBao.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
        } catch (error) {
            thongBao.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại!' });
        }
        setHienThiXoa(false);
    };

    const danhSachLoc = () => {
        return danhSach.filter(item => tuKhoa === '' || item.id.toLowerCase().includes(tuKhoa.toLowerCase()));
    };

    const dinhDangNgay = (ngay) => {
        return ngay ? format(parseISO(ngay), "dd/MM/yyyy") : "";
    };

    return (
        <div>
            <Toast ref={thongBao} />

            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoa} onChange={(e) => setTuKhoa(e.target.value)} className="ml-auto w-1/3" />
            </div>

            <DataTable value={danhSachLoc()} paginator rows={5} emptyMessage="Không có dữ liệu">
                <Column field="id" header="Mã giảm giá" sortable />
                <Column field="ngaybatdau" header="Ngày bắt đầu" sortable body={(rowData) => dinhDangNgay(rowData.ngaybatdau)} />
                <Column field="ngayketthuc" header="Ngày kết thúc" sortable body={(rowData) => dinhDangNgay(rowData.ngayketthuc)} />
                <Column field="phantramgiamgia" header="Phần trăm giảm giá" sortable body={(rowData) => rowData.phantramgiamgia + '%'} />
                <Column body={(rowData) => (
                    <>
                        <Button icon="pi pi-pencil" className="mr-2" onClick={() => moChinhSua(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moXoa(rowData)} />
                    </>
                )} />
            </DataTable>

            <Dialog visible={hienThiDialog} header="Thông tin" style={{ maxWidth: '600px' }} onHide={() => setHienThiDialog(false)}>
                <div className="p-fluid">
                    <label className="mb-2">Mã giảm giá</label>
                    <InputText
                        value={Giamgia.id}
                        onChange={(e) => setGiamgia({ ...Giamgia, id: e.target.value })}
                        disabled={cheDoChinhSua}
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Ngày bắt đầu</label>
                    <InputText
                        type="date"
                        value={Giamgia.ngaybatdau}
                        onChange={(e) => setGiamgia({ ...Giamgia, ngaybatdau: e.target.value })}
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Ngày kết thúc</label>
                    <InputText
                        type="date"
                        value={Giamgia.ngayketthuc}
                        onChange={(e) => setGiamgia({ ...Giamgia, ngayketthuc: e.target.value })}
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Phần trăm giảm giá</label>
                    <InputText type='number' value={Giamgia.phantramgiamgia} onChange={(e) => setGiamgia({ ...Giamgia, phantramgiamgia: e.target.value })} className="mb-3 mt-3" />
                </div>
                <Button label="Lưu" onClick={luuGiamgia} className="mt-3" />
            </Dialog>


            <Dialog visible={hienThiXoa} header="Xác nhận" style={{ minWidth: '300px' }} onHide={() => setHienThiXoa(false)}>
                <p>Bạn có chắc muốn xóa?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaGiamgia} />
            </Dialog>
        </div>
    );
}

export default QuanLyGiamgia;

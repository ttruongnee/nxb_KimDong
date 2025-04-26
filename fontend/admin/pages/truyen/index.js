import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const API_URL = 'http://localhost:3001/truyens';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dz7086zgw/image/upload';
//preset name trên Cloudinary để cấu hình tải lên ảnh
const UPLOAD_PRESET = 'upload_nxbKimDong';

const danhSachDoiTuong = [
    { label: 'Nhà trẻ - mẫu giáo (0 - 6)', value: 'Nhà trẻ - mẫu giáo (0 - 6)' },
    { label: 'Nhi đồng (6 – 11)', value: 'Nhi đồng (6 – 11)' },
    { label: 'Thiếu niên (11 – 15)', value: 'Thiếu niên (11 – 15)' },
    { label: 'Tuổi mới lớn (15 – 18)', value: 'Tuổi mới lớn (15 – 18)' },
    { label: 'Tuổi trưởng thành (trên 18 tuổi)', value: 'Tuổi trưởng thành (trên 18 tuổi)' },
];


function QuanLyTruyen() {
    const [danhSachTruyen, setDanhSachTruyen] = useState([]);
    const [danhSachTheLoai, setDanhSachTheLoai] = useState([]);
    const [danhSachQuangCao, setDanhSachQuangCao] = useState([]);
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
    const [hienThiHopThoai, setHienThiHopThoai] = useState(false);
    const [hienThiXoaHopThoai, setHienThiXoaHopThoai] = useState(false);
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const thongBaoRef = useRef(null);

    useEffect(() => {
        taiDanhSachTruyen();
        axios.get('http://localhost:3001/theloais')
            .then(res => setDanhSachTheLoai(res.data || []))
            .catch(() => thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải thể loại!' }));

        axios.get('http://localhost:3001/quangcaos')
            .then(res => setDanhSachQuangCao(res.data || []))
            .catch(() => thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải quảng cáo!' }));
    }, []);

    function taiDanhSachTruyen() {
        axios.get(API_URL)
            .then(res => setDanhSachTruyen(res.data || []))
            .catch(() => thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải dữ liệu!' }));
    }

    function taoID() {
        return Date.now().toString(36).slice(-5) + Math.random().toString(36).slice(-3);
    }

    function moHopThoaiThemMoi() {
        setThongTinTruyen({ id: taoID(), anhtruyen: '', tentruyen: '', isbn: '', tacgia: '', doituong: '', sotrang: '', dinhdang: '', trongluong: '', matheloai: '', maquangcao: null, soluong: 0, giagoc: 0, phantramgiamgia: 0, giaban: '' });
        setHienThiHopThoai(true);
    }

    function moHopThoaiChinhSua(truyen) {
        setThongTinTruyen(truyen);
        setHienThiHopThoai(true);
    }

    function taiAnh(event) {
        const file = event.target.files[0]; //lấy file ảnh từ input
        if (!file) return;

        const formData = new FormData(); //tạo đối tượng FormData để gửi dữ liệu file
        formData.append("file", file); //thêm file vào formData với key là "file"
        formData.append("upload_preset", UPLOAD_PRESET); //thêm upload preset vào formData

        axios.post(CLOUDINARY_URL, formData)
            .then(res => {
                const url = res.data.secure_url;
                setThongTinTruyen(prev => ({ ...prev, anhtruyen: url })); // Cập nhật state thongTinTruyen với URL ảnh mới
                thongBaoRef.current?.show({ severity: 'success', summary: 'Tải ảnh thành công' });
            })
            .catch(() => {
                thongBaoRef.current?.show({ severity: 'error', summary: 'Tải ảnh thất bại' });
            });
    }

    function luuThongTinTruyen() {
        const { giaban, ...duLieuGui } = thongTinTruyen;
        const kiemTraRong = (value) => typeof value === 'string' ? value.trim() === '' : value == null;

        if (kiemTraRong(thongTinTruyen.tentruyen) || kiemTraRong(thongTinTruyen.isbn) || kiemTraRong(thongTinTruyen.tacgia) || kiemTraRong(thongTinTruyen.doituong)
            || kiemTraRong(thongTinTruyen.sotrang) || kiemTraRong(thongTinTruyen.dinhdang) || kiemTraRong(thongTinTruyen.trongluong)
            || thongTinTruyen.soluong == null || thongTinTruyen.giagoc == null || thongTinTruyen.phantramgiamgia == null) {
            thongBaoRef.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail: 'Các trường thông tin không được để trống!' });
            return;
        }

        const request = danhSachTruyen.some(item => item.id === thongTinTruyen.id)
            ? axios.put(API_URL + '/' + thongTinTruyen.id, duLieuGui)
            : axios.post(API_URL, duLieuGui);

        request.then(() => {
            taiDanhSachTruyen();
            thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: danhSachTruyen.some(i => i.id === thongTinTruyen.id) ? 'Cập nhật thành công!' : 'Thêm thành công!' });
            setHienThiHopThoai(false);
        }).catch(() => {
            thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Thao tác thất bại!' });
        });
    }

    function moHopThoaiXoa(truyen) {
        setThongTinTruyen(truyen);
        setHienThiXoaHopThoai(true);
    }

    function xoaTruyen() {
        axios.delete(API_URL + '/' + thongTinTruyen.id)
            .then(() => {
                taiDanhSachTruyen();
                thongBaoRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
                setHienThiXoaHopThoai(false);
            })
            .catch(() => {
                thongBaoRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xoá thất bại!' });
            });
    }

    function locDanhSachTruyen() {
        return danhSachTruyen.filter(truyen =>
            tuKhoaTimKiem === '' || truyen.tentruyen.toLowerCase().includes(tuKhoaTimKiem.toLowerCase())
        );
    }

    function hinhAnhCot(rowData) {
        return <img src={rowData.anhtruyen} alt="Ảnh" style={{ width: '80px', objectFit: 'cover' }} />;
    }

    const dinhDangTienTe = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
    };

    const dinhDangSo = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    return (
        <div>
            <Toast ref={thongBaoRef} />
            <div className="mb-3 flex items-center">
                <Button label="Thêm" icon="pi pi-plus" onClick={moHopThoaiThemMoi} />
                <InputText placeholder="Tìm kiếm..." value={tuKhoaTimKiem} onChange={(e) => setTuKhoaTimKiem(e.target.value)} className="ml-auto w-1/3" />
            </div>

            <DataTable value={locDanhSachTruyen()} paginator rows={5} emptyMessage="Không có dữ liệu">
                <Column header="Ảnh truyện" body={hinhAnhCot} style={{ width: '12%' }} />
                <Column field="tentruyen" header="Tên truyện" sortable style={{ width: '20%' }} />
                <Column
                    field="soluong"
                    header="Số lượng"
                    sortable
                    style={{ width: '12%' }}
                    body={(rowData) => dinhDangSo(rowData.soluong) + ' quyển'}
                />
                <Column
                    field="giagoc"
                    header="Giá gốc"
                    sortable
                    style={{ width: '10%' }}
                    body={(rowData) => dinhDangTienTe(rowData.giagoc)}
                />
                <Column
                    field="phantramgiamgia"
                    header="Giảm giá"
                    sortable
                    style={{ width: '10%' }}
                    body={(rowData) => rowData.phantramgiamgia + '%'} />
                <Column
                    field="giaban"
                    header="Giá bán"
                    sortable
                    style={{ width: '10%' }}
                    body={(rowData) => dinhDangTienTe(rowData.giaban)}
                />
                <Column body={(rowData) => (
                    <>
                        <Button icon="pi pi-pencil" className="mr-2" onClick={() => moHopThoaiChinhSua(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => moHopThoaiXoa(rowData)} />
                    </>
                )} style={{ width: '10%' }} />
            </DataTable>

            <Dialog visible={hienThiHopThoai} header="Thông tin" style={{ maxWidth: '600px' }} onHide={() => setHienThiHopThoai(false)}>
                <div className="p-fluid">
                    <label className="mb-2">ID</label>
                    <InputText value={thongTinTruyen.id} disabled className="mb-3 mt-3" />
                    <label className="mb-2">Ảnh truyện</label> <br />
                    <input type="file" accept="image/*" onChange={taiAnh} className="mb-2 mt-2" style={{ textAlign: 'center' }} />
                    <br />
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        {thongTinTruyen.anhtruyen && <img src={thongTinTruyen.anhtruyen} alt="Xem trước" style={{ width: '150px' }} />}
                    </div>
                    <br />
                    <label className="mb-2">Tên truyện</label>
                    <InputText value={thongTinTruyen.tentruyen} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, tentruyen: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">ISBN</label>
                    <InputText value={thongTinTruyen.isbn} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, isbn: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">Tác giả</label>
                    <InputText value={thongTinTruyen.tacgia} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, tacgia: e.target.value })} className="mb-3 mt-3" />

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

                    <label className="mb-2">Số trang</label>
                    <InputNumber
                        value={thongTinTruyen.sotrang}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, sotrang: e.value })}
                        min={0}
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Định dạng</label>
                    <InputText value={thongTinTruyen.dinhdang} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, dinhdang: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">Trọng lượng</label>
                    <InputText value={thongTinTruyen.trongluong} onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, trongluong: e.target.value })} className="mb-3 mt-3" />

                    <label className="mb-2">Thể loại</label>
                    <Dropdown
                        value={thongTinTruyen.matheloai}
                        options={danhSachTheLoai}
                        onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, matheloai: e.value })}
                        optionLabel="tentheloai"
                        optionValue="id"
                        placeholder="Chọn thể loại"
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Số lượng</label>
                    <InputNumber
                        value={thongTinTruyen.soluong}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, soluong: e.value })}
                        min={0}
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Giá gốc</label>
                    <InputNumber
                        value={thongTinTruyen.giagoc}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, giagoc: e.value })}
                        min={0}
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Phần trăm giảm giá</label>
                    <InputNumber
                        value={thongTinTruyen.phantramgiamgia}
                        onValueChange={(e) => setThongTinTruyen({ ...thongTinTruyen, phantramgiamgia: e.value })}
                        min={0}
                        max={100}
                        suffix="%"
                        className="mb-3 mt-3"
                    />

                    <label className="mb-2">Quảng cáo</label>
                    <Dropdown
                        value={thongTinTruyen.maquangcao}
                        options={danhSachQuangCao}
                        onChange={(e) => setThongTinTruyen({ ...thongTinTruyen, maquangcao: e.value })}
                        optionLabel="tenquangcao"
                        optionValue="id"
                        placeholder="Chọn quảng cáo"
                        className="mb-3 mt-3"
                    />
                </div>
                <Button label="Lưu" onClick={luuThongTinTruyen} className="mt-3" />
            </Dialog>

            <Dialog visible={hienThiXoaHopThoai} header="Xác nhận" style={{ minWidth: '300px' }} onHide={() => setHienThiXoaHopThoai(false)}>
                <p>Bạn có chắc muốn xóa?</p>
                <Button label="Xóa" className="p-button-danger" onClick={xoaTruyen} />
            </Dialog>
        </div>
    );
}

export default QuanLyTruyen;
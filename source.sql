create database nxbkimdong;
use nxbkimdong;

create table taikhoan (
    id varchar(50) primary key,
    matkhau varchar(30) not null,
    quyen varchar(50) not null
);

create table nhanvien (
    id varchar(50) primary key,
    tennhanvien varchar(50) not null,
	gioitinh varchar(5),
    quequan varchar(150),
    sodienthoai CHAR(10) not null,
    email varchar(50) not null,
	taikhoan varchar(50) not null,
	foreign key (taikhoan) references taikhoan(id) on delete cascade
);

create table khachhang (
    id varchar(50) primary key,
    tenkhachhang varchar(50) not null,
	gioitinh varchar(5),
    sodienthoai CHAR(10) not null,
    email varchar(50) not null,
    diachinhanhang text null,
	taikhoan varchar(50) not null,
	foreign key (taikhoan) references taikhoan(id) on delete cascade
);

create table theloai (
    id varchar(50) primary key,
    tentheloai varchar(50) not null,
    mota text
);

create table quangcao (
    id varchar(50) primary key,
    tenquangcao varchar(100) not null
);

create table truyen (
    id varchar(50) primary key,
    anhtruyen varchar(200),
    tentruyen varchar(100) not null,
	isbn varchar(20) not null,
    tacgia varchar(50) not null,
	doituong varchar(100) not null,
	sotrang int not null,
	dinhdang varchar(50) not null,
	trongluong varchar(20) not null,
    matheloai varchar(50),
    soluong int not null,
    giagoc float not null,
    phantramgiamgia float not null default 0 CHECK (phantramgiamgia >= 0 AND phantramgiamgia <= 100),
    giaban float generated always as (giagoc * ((100 - phantramgiamgia) / 100)) virtual,
    maquangcao varchar(50) null,
    foreign key (matheloai) references theloai(id) on delete set null,
	foreign key (maquangcao) references quangcao(id) on delete set null
);

create table giamgia (
    id varchar(15) primary key,
    ngaybatdau date not null,
    ngayketthuc date not null,
    phantramgiamgia int not null
);

create table donhang (
    id varchar(50) primary key,
    makhachhangdathang varchar(50),
    manhanvienxulydonhang varchar(50),
    ngaydathang date not null,
    diachigiaohang text not null,
    trangthai varchar(100) not null,
    phuongthucthanhtoan varchar(100) not null,
    magiamgia varchar(15),
    tongtien float,
    foreign key (makhachhangdathang) references khachhang(id) on delete set null,
    foreign key (manhanvienxulydonhang) references nhanvien(id) on delete set null,
    foreign key (magiamgia) references giamgia(id) on delete set null
);

create table chitietdonhang (
    id varchar(50) primary key,
    madonhang varchar(50) not null,
    matruyen varchar(50),
    soluong int not null,
    foreign key (madonhang) references donhang(id) on delete cascade,
    foreign key (matruyen) references truyen(id) on delete set null
);

create table giohang (
    id varchar(50) primary key,
    makhachhang varchar(50) not null unique,
    tongtien float not null,
    foreign key (makhachhang) references khachhang(id) on delete cascade
);

create table chitietgiohang (
    id varchar(50) primary key,
    magiohang varchar(50) not null,
    matruyen varchar(50),
    soluong int not null,
    foreign key (magiohang) references giohang(id) on delete cascade,
    foreign key (matruyen) references truyen(id) on delete cascade
);

-- Bảng taikhoan
INSERT INTO taikhoan (id, matkhau, quyen) VALUES
('TK001', '123456', 'admin'),
('TK002', 'abcdef', 'nhanvien'),
('TK003', 'khach123', 'khachhang');

-- Bảng nhanvien
INSERT INTO nhanvien (id, tennhanvien, gioitinh, quequan, sodienthoai, email, taikhoan) VALUES
('NV001', 'Nguyễn Văn A', 'Nam', 'Hà Nội', '0912345678', 'a@gmail.com', 'TK002'),
('NV002', 'Trần Thị B', 'Nữ', 'Hồ Chí Minh', '0987654321', 'b@gmail.com', 'TK002'),
('NV003', 'Lê Văn C', 'Nam', 'Đà Nẵng', '0977777777', 'c@gmail.com', 'TK002');

-- Bảng khachhang
INSERT INTO khachhang (id, tenkhachhang, gioitinh, sodienthoai, email, diachinhanhang, taikhoan) VALUES
('KH001', 'Phạm Văn D', 'Nam', '0966666666', 'd@gmail.com', 'Hà Nội', 'TK003'),
('KH002', 'Hoàng Thị E', 'Nữ', '0955555555', 'e@gmail.com', 'Hải Phòng', 'TK003'),
('KH003', 'Đặng Văn F', 'Nam', '0944444444', 'f@gmail.com', 'Cần Thơ', 'TK003');

-- Bảng theloai
INSERT INTO theloai (id, tentheloai, mota) VALUES
('TL001', 'Truyện tranh', 'Truyện có hình minh họa'),
('TL002', 'Tiểu thuyết', 'Truyện văn học dài tập'),
('TL003', 'Truyện thiếu nhi', 'Dành cho trẻ em');

-- Bảng quangcao
INSERT INTO quangcao (id, tenquangcao) VALUES
('QC001', 'Khuyến mãi hè 2025'),
('QC002', 'Ưu đãi thành viên VIP'),
('QC003', 'Giảm giá sách mới');

-- Bảng truyen
INSERT INTO truyen (id, anhtruyen, tentruyen, isbn, tacgia, doituong, sotrang, dinhdang, trongluong, matheloai, soluong, giagoc, phantramgiamgia) VALUES
('TR001', 'truyen1.jpg', 'Doraemon', '9786042100203', 'Fujiko F. Fujio', 'Thiếu nhi', 200, 'Bìa mềm', '300g', 'TL001', 50, 50000, 10),
('TR002', 'truyen2.jpg', 'One Piece', '9786042100304', 'Eiichiro Oda', 'Thanh thiếu niên', 300, 'Bìa cứng', '500g', 'TL001', 30, 70000, 5),
('TR003', 'truyen3.jpg', 'Harry Potter', '9786042100405', 'J.K. Rowling', 'Mọi lứa tuổi', 400, 'Bìa cứng', '600g', 'TL002', 20, 120000, 15);

-- Bảng giamgia
INSERT INTO giamgia (id, ngaybatdau, ngayketthuc, phantramgiamgia) VALUES
('GG001', '2025-06-01', '2025-06-30', 10),
('GG002', '2025-07-01', '2025-07-15', 15),
('GG003', '2025-08-01', '2025-08-31', 20);

-- Bảng donhang
INSERT INTO donhang (id, makhachhangdathang, manhanvienxulydonhang, ngaydathang, diachigiaohang, trangthai, phuongthucthanhtoan, magiamgia, tongtien) VALUES
('DH001', 'KH001', 'NV001', '2sys_configdonhangdonhang025-03-01', 'Hà Nội', 'Đã giao', 'Tiền mặt', 'GG001', 45000);

-- Bảng chitietdonhang
INSERT INTO chitietdonhang (id, madonhang, matruyen, soluong) VALUES
('CTDH001', 'DH001', 'TR001', 1),
('CTDH002', 'DH002', 'TR002', 1),
('CTDH003', 'DH003', 'TR003', 1);

-- Bảng giohang
INSERT INTO giohang (id, makhachhang, tongtien) VALUES
('GH001', 'KH001', 45000),
('GH002', 'KH002', 59500),
('GH003', 'KH003', 120000);

-- Bảng chitietgiohang
INSERT INTO chitietgiohang (id, magiohang, matruyen, soluong) VALUES
('CTGH001', 'GH001', 'TR001', 1),
('CTGH002', 'GH002', 'TR002', 1),
('CTGH003', 'GH003', 'TR003', 1);

select * from donhang;
select * from chitietdonhang;

DELIMITER //
CREATE PROCEDURE sp_LoginUser (
    IN p_taikhoan VARCHAR(50),
    IN p_matkhau VARCHAR(30)
)
BEGIN
    -- Kiểm tra tài khoản và mật khẩu của khách hàng và trả về thông tin
    SELECT tk.id AS user_id, kh.id AS ma_nguoi_dung, kh.tenkhachhang AS ten_nguoi_dung, tk.quyen AS quyen_nguoi_dung
    FROM taikhoan tk
    INNER JOIN khachhang kh ON tk.id = kh.taikhoan
    WHERE tk.id = p_taikhoan
      AND tk.matkhau = p_matkhau
      AND tk.quyen = 'Khách hàng';
END //
DELIMITER ;
call sp_LoginUser('tk003', '123456');


DELIMITER //
CREATE PROCEDURE sp_LoginAdmin (
    IN p_taikhoan VARCHAR(50),
    IN p_matkhau VARCHAR(30)
)
BEGIN
    -- Kiểm tra tài khoản và mật khẩu của nhân viên hoặc admin và trả về thông tin
    SELECT tk.id AS user_id, nv.id AS ma_nguoi_dung, nv.tennhanvien AS ten_nguoi_dung, tk.quyen AS quyen_nguoi_dung
    FROM taikhoan tk
    INNER JOIN nhanvien nv ON tk.id = nv.taikhoan
    WHERE tk.id = p_taikhoan
      AND tk.matkhau = p_matkhau
      AND (tk.quyen = 'Nhân viên' OR tk.quyen = 'Admin');
END //
DELIMITER ;

call sp_LoginAdmin('tk001', '123456');

use nxbKimDong;
select * from donhang;
select * from chitietdonhang;
select * from taikhoan;
select * from nhanvien;
select * from khachhang;


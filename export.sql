CREATE DATABASE  IF NOT EXISTS `nxbkimdong` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nxbkimdong`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: nxbkimdong
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `id` varchar(50) NOT NULL,
  `madonhang` varchar(50) NOT NULL,
  `matruyen` varchar(50) DEFAULT NULL,
  `soluong` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `madonhang` (`madonhang`),
  KEY `matruyen` (`matruyen`),
  CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`madonhang`) REFERENCES `donhang` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`matruyen`) REFERENCES `truyen` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES ('bxlvkuv7','bxlvktoh','s37sm996',1),('j83wt3pr','j83wt9vi','s37sm996',3),('j83wtlic','j83wt9vi','nhd6tv9p',1),('jk1lw0tf','jk1lwfsy','4qnn05ej',1),('jk1lwedu','jk1lwfsy','4op1nhah',1),('jm9ghazs','jm9ghfec','42juar7a',2),('jm9ghpgh','jm9ghfec','3lrir3tk',1),('jm9ghyra','jm9ghfec','3v3duw7t',2),('jnl4amfl','jnl4aph6','he0ki6vi',1),('jnl4aoqe','jnl4aph6','rg3bf85b',1),('jnl4aufp','jnl4aph6','hp996kif',2),('jpb4d7ki','jpb4ddcv','i8q4lbtv',1),('jpb4d9kv','jpb4ddcv','i10t6dux',1),('jpb4dxlh','jpb4ddcv','hvu3jl7q',1),('jqzjj2i8','jqzjjux5','3op2xocj',1),('jqzjjkhq','jqzjjux5','3r04wj79',1),('jqzjjmfs','jqzjjux5','3se3tgve',1),('jrrc93cj','jrrc9b5m','i2ryyc5x',2),('jt2lbaas','jt2lbd4g','icbm6wih',1),('jt2lbfwa','jt2lbd4g','ilg0swqv',1),('jt2lbru5','jt2lbd4g','io8dxh2m',1),('jtosk7ep','jtosknwe','3v3duw7t',1),('jubt1o2d','jubt19ne','4tlvf69q',1),('l65cld6l','l65cl99k','3se3tgve',3),('l65clshl','l65cl99k','4cauavea',1),('sgegld3c','sgeglg8d','nhd6tv9p',2),('sgegle8d','sgeglg8d','r8bamqcn',1),('sgeglzj8','sgeglg8d','xsn4t1j4',2),('sicykttd','sicykg45','ncq1qt1e',3),('sicyl0zk','sicykg45',NULL,2),('sicyl1ur','sicykg45','nverxvs4',2),('sjmactpm','sjmac159','rwxuedrg',4),('vwcrb0x5','vwcrbqrt','s37sm996',4),('vwcrb3op','vwcrbqrt','nhd6tv9p',3);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietgiohang`
--

DROP TABLE IF EXISTS `chitietgiohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietgiohang` (
  `id` varchar(50) NOT NULL,
  `magiohang` varchar(50) NOT NULL,
  `matruyen` varchar(50) DEFAULT NULL,
  `soluong` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `magiohang` (`magiohang`),
  KEY `matruyen` (`matruyen`),
  CONSTRAINT `chitietgiohang_ibfk_1` FOREIGN KEY (`magiohang`) REFERENCES `giohang` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chitietgiohang_ibfk_2` FOREIGN KEY (`matruyen`) REFERENCES `truyen` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietgiohang`
--

LOCK TABLES `chitietgiohang` WRITE;
/*!40000 ALTER TABLE `chitietgiohang` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietgiohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `id` varchar(50) NOT NULL,
  `makhachhangdathang` varchar(50) DEFAULT NULL,
  `manhanvienxulydonhang` varchar(50) DEFAULT NULL,
  `ngaydathang` date NOT NULL,
  `diachigiaohang` text NOT NULL,
  `trangthai` varchar(100) NOT NULL,
  `phuongthucthanhtoan` varchar(100) NOT NULL,
  `magiamgia` varchar(15) DEFAULT NULL,
  `tongtien` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `makhachhangdathang` (`makhachhangdathang`),
  KEY `manhanvienxulydonhang` (`manhanvienxulydonhang`),
  KEY `magiamgia` (`magiamgia`),
  CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`makhachhangdathang`) REFERENCES `khachhang` (`id`) ON DELETE SET NULL,
  CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`manhanvienxulydonhang`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL,
  CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`magiamgia`) REFERENCES `giamgia` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES ('bxlvktoh','KH001','j3od7jt3','2025-04-20','fake, Phường Quỳnh Lâm, Thành phố Hòa Bình, Tỉnh Hoà Bình','Đã hủy','Thanh toán khi nhận hàng','GG001',178200),('j83wt9vi','KH001','j30ktguw','2025-04-20','fake, Xã Mai Pha, Thành phố Lạng Sơn, Tỉnh Lạng Sơn','Đã giao','Chuyển khoản ngân hàng','GG001',647100),('jk1lwfsy','itok41ln','wl1oy7m5','2025-04-21','số nhà 07 đường ABC, Phường Quang Trung, Thành phố Hà Giang, Tỉnh Hà Giang','Đang giao','Thanh toán khi nhận hàng',NULL,56000),('jm9ghfec','iv4epbrq','j3od7jt3','2025-04-21','số nhà 28 đường ABC, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội','Đang giao','Chuyển khoản ngân hàng','DONTHANG5',199920),('jnl4aph6','ivv6tu7l',NULL,'2025-04-21','số nhà 09 đường ABC, Phường Tích Sơn, Thành phố Vĩnh Yên, Tỉnh Vĩnh Phúc','Đã giao','Thanh toán khi nhận hàng','CHAOHE2025',1388880),('jpb4ddcv','iwvxc3nn',NULL,'2025-04-21','số nhà 38 đường ABC, Phường Quán Toan, Quận Hồng Bàng, Thành phố Hải Phòng','Chờ xử lý','Thanh toán khi nhận hàng','CHAOHE2025',108000),('jqzjjux5','ixw8eu26',NULL,'2025-04-21','số nhà 19 đường ABC, Xã Quang Khải, Huyện Tứ Kỳ, Tỉnh Hải Dương','Chờ xử lý','Thanh toán khi nhận hàng',NULL,88500),('jrrc9b5m','iyqjl5kw',NULL,'2025-04-21','số nhà 08 đường ABC, Thị trấn Cô Tô, Huyện Cô Tô, Tỉnh Quảng Ninh','Chờ xử lý','Thanh toán khi nhận hàng',NULL,64800),('jt2lbd4g','izgpc5z2',NULL,'2025-04-21','số nhà 26 đường ABC, Phường 5, Thành phố Vĩnh Long, Tỉnh Vĩnh Long','Chờ xử lý','Chuyển khoản ngân hàng','DONTHANG5',409275),('jtosknwe','j0ozzzzw','j3od7jt3','2025-04-21','số nhà 14 đường ABC, Phường Hoàng Văn Thụ, Thành phố Lạng Sơn, Tỉnh Lạng Sơn','Đang giao','Thanh toán khi nhận hàng',NULL,56000),('jubt19ne',NULL,NULL,'2025-04-21','số nhà 25 đường ABC, Phường An Bình, Thị xã An Khê, Tỉnh Gia Lai','Chờ xử lý','Chuyển khoản ngân hàng',NULL,31500),('l65cl99k','ivv6tu7l',NULL,'2025-04-21','chùa Hạ, đội 8, An Chiểu 1, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang','Chờ xử lý','Thanh toán khi nhận hàng','DONTHANG5',102425),('sgeglg8d','KH001','wl1oy7m5','2025-04-20','fake, Phường Vĩnh Phúc, Quận Ba Đình, Thành phố Hà Nội','Đang giao','Thanh toán khi nhận hàng','GG001',318960),('sicykg45','KH001','j3od7jt3','2025-04-20','chùa Hạ, đội 8, An Chiểu 1, Xã Liên Phương, Thành phố Hưng Yên, Tỉnh Hưng Yên','Đang giao','Chuyển khoản ngân hàng',NULL,685500),('sjmac159',NULL,NULL,'2025-04-20','fake, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội','Chờ xử lý','Thanh toán khi nhận hàng','GG001',123120),('vwcrbqrt','kh123','j30ktguw','2025-04-20','chùa Hạ, đội 8, An Chiểu 1, Xã Liên Phương, Thành phố Hưng Yên, Tỉnh Hưng Yên','Đang giao','Chuyển khoản ngân hàng','GG001',1050300);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giamgia`
--

DROP TABLE IF EXISTS `giamgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giamgia` (
  `id` varchar(15) NOT NULL,
  `ngaybatdau` date NOT NULL,
  `ngayketthuc` date NOT NULL,
  `phantramgiamgia` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giamgia`
--

LOCK TABLES `giamgia` WRITE;
/*!40000 ALTER TABLE `giamgia` DISABLE KEYS */;
INSERT INTO `giamgia` VALUES ('4THANG4','2025-04-04','2025-04-04',30),('5THANG5','2025-05-05','2025-05-05',30),('CHAOHE2025','2025-04-15','2025-04-30',20),('DONTHANG5','2025-04-20','2025-05-01',15),('GG001','2025-04-21','2025-06-22',10),('GG002','2025-07-01','2025-07-15',15),('GG003','2025-08-01','2025-08-31',20),('SALENGAYSINH','2025-04-21','2025-04-21',20);
/*!40000 ALTER TABLE `giamgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohang` (
  `id` varchar(50) NOT NULL,
  `makhachhang` varchar(50) NOT NULL,
  `tongtien` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `makhachhang` (`makhachhang`),
  CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`makhachhang`) REFERENCES `khachhang` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
INSERT INTO `giohang` VALUES ('GH001','KH001',45000);
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `id` varchar(50) NOT NULL,
  `tenkhachhang` varchar(50) NOT NULL,
  `gioitinh` varchar(5) DEFAULT NULL,
  `sodienthoai` char(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `diachinhanhang` text,
  `taikhoan` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `taikhoan` (`taikhoan`),
  CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`taikhoan`) REFERENCES `taikhoan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES ('itok41ln','Đào Anh Quân','Nam','0911111111','quananhdao@gmail.com',NULL,'khach1'),('iv4epbrq','Nguyễn Ngọc Mai','Nữ','0999999999','mai99@gmail.com',NULL,'khach2'),('ivv6tu7l','Bùi Anh Tuấn','Nam','0384551111','tuan123@gmail.com',NULL,'khach3'),('iwvxc3nn','Ngô Đức Nam','Nam','0988123399','nam123@gmail.com',NULL,'khach4'),('ixw8eu26','Đỗ Ngọc Trâm','Nữ','0899123348','tramngoc@gmail.com',NULL,'khach5'),('iyqjl5kw','Mai Ngọc Ánh','Nữ','0383789999','anhngoc99@gmail.com',NULL,'khach6'),('izgpc5z2','Bùi Quang Tùng','Nam','0936123123','qtung123@gmail.com',NULL,'khach7'),('j0ozzzzw','Vũ Ngọc Châu','Nữ','0373678678','ngocchauk4@gmail.com',NULL,'khach8'),('KH001','Phạm Văn Đạt','Nam','0966666666','d9@gmail.com','Hà Nội','TK003'),('kh123','Đinh Thiên Trường','Nam','0819511666','ttruong@gmail.com','Hưng Yên','ttruongnee'),('wnc0pp08','Mai Thảo Trang','Nữ','0899215789','thaotrang04@gmail.com',NULL,'khachhang');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `id` varchar(50) NOT NULL,
  `tennhanvien` varchar(50) NOT NULL,
  `gioitinh` varchar(5) DEFAULT NULL,
  `quequan` varchar(150) DEFAULT NULL,
  `sodienthoai` char(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `taikhoan` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `taikhoan` (`taikhoan`),
  CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`taikhoan`) REFERENCES `taikhoan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES ('j30ktguw','Trần Ngọc Báu','Nam','Hưng Yên','0383757991','ngocbau@gmail.com','nhanvienabc'),('j3od7jt3','Trần Quỳnh Hương','Nữ','Hải Dương','0979123456','qhuong@gmail.com','nhanvienxyz'),('NV001','Nguyễn Văn Admin','Nam','Hà Nội','0912345678','admin@gmail.com','admin'),('wl1oy7m5','Đặng Ngọc Tuấn','Nam','Hưng Yên','0976111222','tuandang@gmail.com','nhanvien');
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quangcao`
--

DROP TABLE IF EXISTS `quangcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quangcao` (
  `id` varchar(50) NOT NULL,
  `tenquangcao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quangcao`
--

LOCK TABLES `quangcao` WRITE;
/*!40000 ALTER TABLE `quangcao` DISABLE KEYS */;
INSERT INTO `quangcao` VALUES ('lb7ssmtf','Combo'),('lbmcb1jd','Manga - Comic'),('lbwst2lr','Doraemon'),('lc4ymoui','Wingsbooks'),('lcf1sre5','Combo siêu ưu đãi'),('lcr3g6f2','Comic nhập khẩu'),('QC001','Ưu đãi ngày kép'),('QC002','Sách mới'),('QC003','Sách bán chạy');
/*!40000 ALTER TABLE `quangcao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan` (
  `id` varchar(50) NOT NULL,
  `matkhau` varchar(30) NOT NULL,
  `quyen` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES ('admin','123','Admin'),('khach1','123','Khách hàng'),('khach2','123','Khách hàng'),('khach3','123','Khách hàng'),('khach4','123','Khách hàng'),('khach5','123','Khách hàng'),('khach6','123','Khách hàng'),('khach7','123','Khách hàng'),('khach8','123','Khách hàng'),('khachhang','123','Khách hàng'),('nhanvien','123','Nhân viên'),('nhanvienabc','123','Nhân viên'),('nhanvienxyz','123','Nhân viên'),('TK001','123','Admin'),('TK003','123','Khách hàng'),('ttruongnee','123','Khách hàng');
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theloai`
--

DROP TABLE IF EXISTS `theloai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theloai` (
  `id` varchar(50) NOT NULL,
  `tentheloai` varchar(50) NOT NULL,
  `mota` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theloai`
--

LOCK TABLES `theloai` WRITE;
/*!40000 ALTER TABLE `theloai` DISABLE KEYS */;
INSERT INTO `theloai` VALUES ('2xmxl1bu','Thiếu niên','Thường kể về những chàng trai trẻ tuổi đầy nhiệt huyết, mang trong mình những ước mơ lớn lao và không ngừng nỗ lực để đạt được mục tiêu. Tình bạn, sự trưởng thành và những trận chiến nảy lửa là những yếu tố không thể thiếu.'),('2zg7dpuv','Trinh thám','Lôi cuốn người đọc vào những vụ án bí ẩn, những manh mối phức tạp và cuộc đấu trí căng thẳng giữa thám tử và tội phạm. Sự logic, khả năng quan sát và suy luận sắc bén là chìa khóa để giải mã sự thật.'),('2zv2ho9d','Hài hước','Mang đến những tràng cười sảng khoái với những tình huống oái oăm, những nhân vật ngộ nghĩnh và những màn đối thoại dí dỏm. Đây là liều thuốc tinh thần hiệu quả sau những giờ phút căng thẳng.'),('305fdmof','Đời thường','Phản ánh chân thực những khía cạnh bình dị của cuộc sống, những mối quan hệ gia đình, bạn bè, đồng nghiệp và những khoảnh khắc đáng trân trọng trong cuộc sống hàng ngày.'),('31gpcq0f','Lịch sử truyền thống','Thể loại này thường tái hiện những sự kiện lịch sử quan trọng của Việt Nam, đặc biệt là giai đoạn kháng chiến chống Pháp và chống Mỹ. Các tác phẩm tập trung khắc họa hình ảnh những người anh hùng, tinh thần chiến đấu bất khuất, lòng yêu nước sâu sắc và những hy sinh cao cả của quân và dân ta trong cuộc đấu tranh giành độc lập và thống nhất đất nước. Bên cạnh đó, thể loại này cũng có thể đề cập đến những câu chuyện quân sự, những chiến dịch lịch sử và những nhân vật có đóng góp to lớn cho sự nghiệp cách mạng.'),('37xz6boo','Cổ tích Việt Nam','Thể loại này chuyển thể những câu chuyện cổ tích quen thuộc như Tấm Cám, Thạch Sanh, Cây Tre Trăm Đốt... thành hình thức truyện tranh sinh động và hấp dẫn. Những câu chuyện này thường mang đậm giá trị nhân văn, truyền tải những bài học đạo đức sâu sắc về lòng tốt, sự công bằng, tình yêu thương và tinh thần lạc quan. Hình ảnh trong truyện tranh cổ tích thường được vẽ một cách tươi sáng, gần gũi với văn hóa truyền thống Việt Nam.'),('3aeis5gr','Văn học','Văn học là thể loại truyện tranh chuyển thể hoặc lấy cảm hứng từ các tác phẩm văn học. Chúng giữ lại tinh thần và nội dung cốt lõi của nguyên tác, kết hợp ngôn ngữ và hình ảnh để kể chuyện một cách hấp dẫn. Thể loại này giúp độc giả trẻ tiếp cận văn học dễ dàng hơn.'),('ifxzz2dz','Tình bạn','Thể loại này tập trung vào mối quan hệ giữa những người bạn, khắc họa những khoảnh khắc vui buồn, những thử thách và sự gắn kết mà các nhân vật trải qua cùng nhau. Truyện thường đề cao những giá trị tốt đẹp của tình bạn như sự tin tưởng, sẻ chia, giúp đỡ lẫn nhau và cùng nhau vượt qua khó khăn. Đôi khi, tình bạn còn là nền tảng để xây dựng những câu chuyện phiêu lưu, hài hước hoặc cảm động.'),('TL002','Phưu lưu','Mở ra những hành trình khám phá những vùng đất mới lạ, những bí ẩn chưa được giải đáp và những cuộc gặp gỡ bất ngờ. Tính tò mò và khát khao chinh phục là động lực chính của nhân vật.');
/*!40000 ALTER TABLE `theloai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truyen`
--

DROP TABLE IF EXISTS `truyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truyen` (
  `id` varchar(50) NOT NULL,
  `anhtruyen` varchar(200) DEFAULT NULL,
  `tentruyen` varchar(100) NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `tacgia` varchar(50) NOT NULL,
  `doituong` varchar(100) NOT NULL,
  `sotrang` int NOT NULL,
  `dinhdang` varchar(50) NOT NULL,
  `trongluong` varchar(20) NOT NULL,
  `matheloai` varchar(50) DEFAULT NULL,
  `soluong` int NOT NULL,
  `giagoc` float NOT NULL,
  `phantramgiamgia` float NOT NULL DEFAULT '0',
  `giaban` float GENERATED ALWAYS AS ((`giagoc` * ((100 - `phantramgiamgia`) / 100))) VIRTUAL,
  `maquangcao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matheloai` (`matheloai`),
  KEY `maquangcao` (`maquangcao`),
  CONSTRAINT `truyen_ibfk_1` FOREIGN KEY (`matheloai`) REFERENCES `theloai` (`id`) ON DELETE SET NULL,
  CONSTRAINT `truyen_ibfk_2` FOREIGN KEY (`maquangcao`) REFERENCES `quangcao` (`id`) ON DELETE SET NULL,
  CONSTRAINT `truyen_chk_1` CHECK (((`phantramgiamgia` >= 0) and (`phantramgiamgia` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truyen`
--

LOCK TABLES `truyen` WRITE;
/*!40000 ALTER TABLE `truyen` DISABLE KEYS */;
INSERT INTO `truyen` (`id`, `anhtruyen`, `tentruyen`, `isbn`, `tacgia`, `doituong`, `sotrang`, `dinhdang`, `trongluong`, `matheloai`, `soluong`, `giagoc`, `phantramgiamgia`, `maquangcao`) VALUES ('2tdzuihj','https://res.cloudinary.com/dz7086zgw/image/upload/v1745179510/pqwz9ildydnhb8gbh7cm.jpg','Những anh hùng trẻ tuổi - Tô Vĩnh Diện (2024)','978-604-2-37151-3','Lê Minh Hải','Thiếu niên (11 – 15)',32,'bìa mềm','150 gram','31gpcq0f',281,50000,30,'QC002'),('3hjnmslf','https://res.cloudinary.com/dz7086zgw/image/upload/v1745180681/dl7txymqrjw37sqs24w8.jpg','Ngàn năm sử Việt - Nhà Nguyễn - Chiến tướng Tôn Thất Thuyết','978-604-2-24500-5','Lê Minh Quốc','Thiếu niên (11 – 15)',228,'bìa mềm','245 gram','31gpcq0f',291,60000,30,'QC002'),('3lrir3tk','https://res.cloudinary.com/dz7086zgw/image/upload/v1745180831/i4myg1ojvbuamsspc64h.jpg','Ngàn năm sử Việt - Nhà Lê Trung Hưng - Quận He khởi nghĩa','978-604-2-24439-8','Hà Ân','Thiếu niên (11 – 15)',340,'bìa mềm','355 gram','31gpcq0f',209,80000,30,'QC003'),('3op2xocj','https://res.cloudinary.com/dz7086zgw/image/upload/v1745180966/pozrmy9hpqygbqjijqga.jpg','Chị Út Tịch','978-604-2-25009-2','Vương Trọng','Nhi đồng (6-11 tuổi)',24,'bìa mềm','120 gram','31gpcq0f',280,35000,30,'QC003'),('3r04wj79','https://res.cloudinary.com/dz7086zgw/image/upload/v1745181074/uxykmwdlxtdhxldtrm23.jpg','Thư Tết của Bác Hồ','978-604-2-25005-4','Hồ Chí Minh','Nhi đồng (6-11 tuổi)',92,'bìa mềm','155 gram','31gpcq0f',318,40000,20,'QC003'),('3se3tgve','https://res.cloudinary.com/dz7086zgw/image/upload/v1745181154/iqfrwpbs2lkpiwxkjxpq.jpg','Thư Bác Hồ gửi thiếu nhi','978-604-2-25004-7','Hồ Chí Minh','Nhi đồng (6 – 11)',88,'bìa mềm','145 gram','31gpcq0f',823,40000,20,'QC003'),('3v3duw7t','https://res.cloudinary.com/dz7086zgw/image/upload/v1745181264/kfgafy7os6kqtdjwerux.jpg','Ngàn năm sử Việt – Thời Bắc thuộc – Vua Đen','978-604-2-24548-7','Hoàng Công Khanh','Thiếu niên (11 – 15)',320,'bìa mềm','335 gram','31gpcq0f',312,80000,30,'QC002'),('3xh2ad0w','https://res.cloudinary.com/dz7086zgw/image/upload/v1745181389/njyriusfbbeuk7yfxupz.jpg','Ngàn năm sử Việt - Nhà Thục - Chuyện nỏ thần','978-604-2-24435-0','Tô Hoài','Thiếu niên (11 – 15)',320,'bìa mềm','340 gram','31gpcq0f',390,80000,30,'QC001'),('40d4z52j','https://res.cloudinary.com/dz7086zgw/image/upload/v1745181513/iu7nxphkfrqmt5hyhgjk.jpg','Ngàn năm sử Việt - Thời Bắc thuộc - Nữ tướng thời Trưng Vương','978-604-2-24499-2','Nguyễn Khắc Xương','Thiếu niên (11 – 15)',304,'bìa mềm','325 gram','31gpcq0f',832,75000,30,'QC002'),('42juar7a','https://res.cloudinary.com/dz7086zgw/image/upload/v1745181612/mk6o0mcmpxgsrwfb4qqy.jpg','Ngàn năm sử Việt - Thời Hồng Bàng - Nhà Chử','978-604-2-24433-6','Tô Hoài','Thiếu niên (11 – 15)',175,'bìa mềm','195 gram','31gpcq0f',829,48000,30,'QC002'),('4cauavea','https://res.cloudinary.com/dz7086zgw/image/upload/v1745182069/ylunfvmvz2ye2znvpslj.jpg','Những anh hùng trẻ tuổi - Nguyễn Bá Ngọc','978-604-2-25010-8','Hiếu Minh','Nhi đồng (6 – 11)',24,'bìa mềm','120 gram','31gpcq0f',380,35000,30,'QC001'),('4f3694nb','https://res.cloudinary.com/dz7086zgw/image/upload/v1745182197/zt49q1navbv19kaezhya.jpg','Ngàn năm sử Việt – Nhà Nguyễn – Đất mặn đất ngọt','978-604-2-24542-5','Nghiêm Đa Văn','Thiếu niên (11 – 15)',180,'bìa mềm','200 gram','31gpcq0f',726,50000,30,'QC003'),('4op1nhah','https://res.cloudinary.com/dz7086zgw/image/upload/v1745182647/pp53wo0qsnnkdhwewmmu.jpg','Hồi kí về Bác Hồ - Gần bên Bác và học ở Bác','978-604-2-38204-5','Nhiều tác giả','Tuổi mới lớn (15 – 18)',168,'bìa mềm','160 gram','31gpcq0f',998,40000,30,'QC001'),('4qnn05ej','https://res.cloudinary.com/dz7086zgw/image/upload/v1745182748/uuo7r81zfduboyzlqh1h.jpg','Hồi kí về Bác Hồ - Mãi nhớ ơn Người','978-604-2-38205-2','Nhiều tác giả','Tuổi mới lớn (15 – 18)',168,'bìa mềm','160 gram','31gpcq0f',998,40000,30,'QC001'),('4tlvf69q','https://res.cloudinary.com/dz7086zgw/image/upload/v1745182890/jdhc4mhcucguejtpt2uy.jpg','Ngàn năm sử Việt - Nhà Tây Sơn - Lưỡi gươm nhân ái','978-604-2-34093-9','Hà Ân','Thiếu niên (11 – 15)',244,'bìa mềm','260 gram','31gpcq0f',470,45000,30,'QC001'),('hbd15iyb','https://res.cloudinary.com/dz7086zgw/image/upload/v1745203863/cr8rdwz601mizjwqa9kh.jpg','Combo Niềm vui mỗi ngày (4 Cuốn)','không có','Maria Gianola','Nhà trẻ - mẫu giáo (0 - 6)',31,'bìa mềm','440 gram','2zv2ho9d',327,160000,20,'lb7ssmtf'),('he0ki6vi','https://res.cloudinary.com/dz7086zgw/image/upload/v1745204004/txdruvqevp2c3wtcbmkv.jpg','Combo Itto - Cơn lốc sân cỏ tập 1 - 47','không có','Motoki Monma','Tuổi mới lớn (15 – 18)',196,'bìa mềm','6545 gram','2xmxl1bu',161,1175000,10,'lb7ssmtf'),('hgk8vyvo','https://res.cloudinary.com/dz7086zgw/image/upload/v1745204136/mgynybc5b03rzoaetlm1.jpg','Combo Trò chơi nhập vai (4 quyển)','không có','Coralie Saudo','Nhi đồng (6 – 11)',36,'bìa mềm','500 gram','305fdmof',138,180000,20,'lb7ssmtf'),('hp996kif','https://res.cloudinary.com/dz7086zgw/image/upload/v1745204539/qbrkccx7jmlrdm40hpv8.jpg','Combo Oddtaxi (5 tập) (Tặng Lót Ly 2 Mặt)','không có','Kazuya Konomoto','Tuổi mới lớn (15 – 18)',200,'bìa mềm','1200 gram','2zv2ho9d',241,225000,10,'lb7ssmtf'),('hvu3jl7q','https://res.cloudinary.com/dz7086zgw/image/upload/v1745204830/uwzrvyqkpcoiqdlvwp2v.jpg','Official Fanbook Thanh gươm diệt quỷ - Sổ tay Đội Diệt quỷ','978-604-2-24710-8','Koyoharu Gotouge','Tuổi mới lớn (15 – 18)',216,'bìa mềm','195 gram','TL002',830,50000,10,'lbmcb1jd'),('hyw102lo','https://res.cloudinary.com/dz7086zgw/image/upload/v1745204959/li1zabfgyeh7tjss2q9b.jpg','Vị thần lang thang - Tập 27 (Tặng kèm Postcard)','978-604-2-24108-3','Adachitoka','Tuổi mới lớn (15 – 18)',276,'bìa mềm','175 gram','TL002',817,30000,10,'lbmcb1jd'),('i10t6dux','https://res.cloudinary.com/dz7086zgw/image/upload/v1745205060/h94n1scopt0pfuds8svh.jpg','Thám tử Xeno và 7 căn phòng kín - Tập 1','978-604-2-25073-3','Teppei SUGIYAMA','Tuổi mới lớn (15 – 18)',192,'bìa mềm','140 gram','2zg7dpuv',380,30000,10,'lbmcb1jd'),('i2ryyc5x','https://res.cloudinary.com/dz7086zgw/image/upload/v1745205198/egytuky9mbr5zahnaobj.jpg','Blue Box - Tập 3 (Tặng kèm Bìa áo 2 mặt)','978-604-2-24553-1','Kouji Miura','Tuổi mới lớn (15 – 18)',192,'bìa mềm','175 gram','2xmxl1bu',279,36000,10,'lbmcb1jd'),('i8q4lbtv','https://res.cloudinary.com/dz7086zgw/image/upload/v1745205430/nwszcjrbuhm4gvh2l6bm.jpg','Phong thần diễn nghĩa - Tập 12','978-604-2-24118-2','Ryu Fujisaki','Tuổi mới lớn (15 – 18)',244,'bìa mềm','279 gram','TL002',127,70000,10,'lbmcb1jd'),('icbm6wih','https://res.cloudinary.com/dz7086zgw/image/upload/v1745205603/knyt9vq0il8xczebrkaj.jpg','Doraemon #1','không có','Fujiko F Fujio','Nhi đồng (6 – 11)',264,'bìa mềm','240 gram','ifxzz2dz',388,250000,10,'lbwst2lr'),('ii7dyhsp','https://res.cloudinary.com/dz7086zgw/image/upload/v1745205871/w3ozrjqahmm9sussb0le.jpg','Doraemon #3','không có','Fujiko F Fujio','Nhi đồng (6 – 11)',248,'bìa mềm','225 gram','ifxzz2dz',212,250000,10,'lbwst2lr'),('ilg0swqv','https://res.cloudinary.com/dz7086zgw/image/upload/v1745206010/o32jxlgmtxjr24qtvtsk.jpg','Doraemon #4','không có','Fujiko F Fujio','Nhi đồng (6 – 11)',248,'bìa mềm','230 gram','ifxzz2dz',282,250000,10,'lbwst2lr'),('io8dxh2m','https://res.cloudinary.com/dz7086zgw/image/upload/v1745206141/okrlyl0m8f87lawxiogl.jpg',' Doraemon - Tuyển tập theo chủ đề - Tập 7 - Điểm 0 & Bỏ nhà đ','978-604-2-34663-4','Fujiko F Fujio','Nhi đồng (6 – 11)',280,'bìa mềm','140 gram','ifxzz2dz',377,35000,10,'lbwst2lr'),('kl46jcfe','https://res.cloudinary.com/dz7086zgw/image/upload/v1745209424/pvtpriuobakyaadezfbj.jpg','Cẩm nang về tâm tình và mối quan hệ cho mọi người','978-604-2-24498-5','Alex Norris','Tuổi trưởng thành (trên 18 tuổi)',224,'bìa mềm','224','ifxzz2dz',238,112000,20,'lc4ymoui'),('koxjzike','https://res.cloudinary.com/dz7086zgw/image/upload/v1745209554/ivxgc9csp1irx0gxxl4g.jpg','Trường ca Achilles','978-604-2-18233-1','Madeline Miller','Tuổi trưởng thành (trên 18 tuổi)',444,'bìa mềm','515 gram','3aeis5gr',284,156000,20,'lc4ymoui'),('kqeg3w7a','https://res.cloudinary.com/dz7086zgw/image/upload/v1745209633/jrqrwy8b3w4euenfpibv.jpg','Vươn mình như những đoá hoa','978-604-2-38387-5','Liz Marvin','Tuổi mới lớn (15 – 18)',128,'bìa mềm','180 gram','3aeis5gr',238,70000,20,'lc4ymoui'),('ksligyye','https://res.cloudinary.com/dz7086zgw/image/upload/v1745209711/yyygl2g1o5akwuryu2wl.jpg','Phố cổ Hà Nội – Kí họa & hồi ức (Hanoi\'s old quarter – Sketches and memories)','978-604-2-38770-5','Nhiều tác giả','Tuổi mới lớn (15 – 18)',234,'bìa cứng','1.085 gram','3aeis5gr',236,350000,20,'lc4ymoui'),('kuva46vl','https://res.cloudinary.com/dz7086zgw/image/upload/v1745209818/lhbnw5wr1fpofodwdow8.jpg','Gosick - Tập 8+9','không có','Kazuki Sakuraba','Tuổi mới lớn (15 – 18)',172,'bìa mềm','615 gram','TL002',28,160000,20,'lcf1sre5'),('ncq1qt1e','https://res.cloudinary.com/dz7086zgw/image/upload/v1744004679/vuftjugnncs6xb6huace.jpg','Thiện và ác và cổ tích','978-604-2-13866-6',' Thủy Nguyên','Nhi đồng (6 – 11)',144,'bìa cứng','950 gram','37xz6boo',76,299000,50,'QC001'),('nhd6tv9p','https://res.cloudinary.com/dz7086zgw/image/upload/v1744004894/yi7frmvqr6ywbrym3n6g.jpg','365 ngày kể chuyện','978-604-2-23076-6','Dolores Lanzas','Nhà trẻ - mẫu giáo (0 - 6)',192,'bìa cứng','800 gram','305fdmof',19,250000,50,'QC001'),('noo7i14k','https://res.cloudinary.com/dz7086zgw/image/upload/v1744005260/euitmydh1ukzyij5seau.jpg','Truyện Kiều tự kể (Kỉ niệm 65 năm NXB Kim Đồng)','978-604-2-27138-7','Cao Nguyệt Nguyên','Tuổi trưởng thành (trên 18 tuổi)',144,'bìa cứng','570 gram','3aeis5gr',129,190000,50,'QC001'),('nskj16jj','https://res.cloudinary.com/dz7086zgw/image/upload/v1744005416/l8l2abvepnynlolqmtzi.jpg','Võ Quảng - Một đời thơ văn','978-604-2-18361-1','Châu Tấn','Tuổi mới lớn (15 – 18)',424,'bìa cứng','775 gram','305fdmof',84,180000,70,'QC001'),('nverxvs4','https://res.cloudinary.com/dz7086zgw/image/upload/v1744005562/oafw03vawecznlp9bptl.jpg','Truyện cổ tích Kazakhstan - Tập 1','978-604-2-23456-6','V. M. SI-ĐEN-NI-KỐP','Thiếu niên (11 – 15)',380,'bìa mềm','420 gram','2zv2ho9d',37,165000,50,'QC001'),('nyaa5jml','https://res.cloudinary.com/dz7086zgw/image/upload/v1744005682/gbragnfffq2tlcu15bza.jpg','Chuyện lạ Thảo Cầm Viên (2019)','978-604-2-15403-1','Phan Việt Lâm','Thiếu niên (11 – 15)',272,'bìa mềm','435 gram','305fdmof',219,150000,70,'QC001'),('o0yhtmqf','https://res.cloudinary.com/dz7086zgw/image/upload/v1744005831/pfmemc6bgvltdedfi77z.jpg','Chinh phục Everest','978-604-2-18654-4','Sangma Francis','Thiếu niên (11 – 15)',76,'bìa mềm','500 gram','TL002',83,136000,50,'QC001'),('r4pw7edt','https://res.cloudinary.com/dz7086zgw/image/upload/v1744011037/ugtww2oh9ql1tb2m04om.jpg','Đại gia đình cá voi đêm bão','978-604-2-19457-0','Benji Davies','Nhi đồng (6 – 11)',32,'bìa mềm','165 gram','3aeis5gr',80,52000,10,'QC002'),('r8bamqcn','https://res.cloudinary.com/dz7086zgw/image/upload/v1744011188/obsiqwayutk3pg2enwx6.jpg','Búp sen xanh','978-604-2-35343-4','Sơn Tùng','Thiếu niên (11 – 15)',364,'bìa mềm','360 gram','31gpcq0f',314,72000,10,'QC003'),('rg3bf85b','https://res.cloudinary.com/dz7086zgw/image/upload/v1744011554/n421wa7hzqz3jak8kizb.jpg','Bé thông minh - Bộ 2 (9 cuốn)','không có','Quyên Gavoye','Nhà trẻ - mẫu giáo (0 - 6)',20,'bìa cứng','990 gram','2zv2ho9d',90,342000,20,'lb7ssmtf'),('rwxuedrg','https://res.cloudinary.com/dz7086zgw/image/upload/v1744012337/wuw0kfm5euuvrvwforab.jpg','Đàn chị hay xấu hổ - Tập 1','978-604-2-24249-3','Makoto Kudo',' Tuổi trưởng thành (trên 18 tuổi)',144,'bìa mềm','170 gram','2xmxl1bu',63,38000,10,'lc4ymoui'),('s0be6qob','https://res.cloudinary.com/dz7086zgw/image/upload/v1744012496/u4cxsvzekzlikjwwogsm.jpg','Combo Cung hoàng đạo Cổ đại (3 cuốn)','không có','Trần Huyền Trang','Tuổi mới lớn (15 – 18)',47,'bìa mềm','300 gram','2xmxl1bu',88,90000,83,'lcf1sre5'),('s37sm996','https://res.cloudinary.com/dz7086zgw/image/upload/v1744012645/nqrfwnsukawfh7lbnnvj.jpg','DT Conan Kaito Kid #1','không có','Gosho Aoyama','Thiếu niên (11 – 15)',152,'bìa mềm','200 gram','2zg7dpuv',87,220000,10,'lcr3g6f2'),('xsn4t1j4','https://res.cloudinary.com/dz7086zgw/image/upload/v1743961752/cebcgqjirzwdj8gixslc.jpg','Doraemon tập 12','978-604-2-34523-1','Fujiko F Fujio','Nhi đồng (6 – 11)',192,'bìa mềm','140 gram','ifxzz2dz',97,22000,10,'lbwst2lr');
/*!40000 ALTER TABLE `truyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nxbkimdong'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_LoginAdmin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LoginAdmin`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_LoginUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LoginUser`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22  9:18:43

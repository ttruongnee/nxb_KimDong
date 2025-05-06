import React, { useEffect } from "react";
import '../../component/grid.css';
import homeStyles from '../home/home.module.css';
import '../../component/style.css';
import updateCartCount from '../updateCartCount';
import TruyenTheoQuangCao from "../truyentheoquangcao";

const Home = () => {
    const banner_home_1 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290549/banner_home_1_wjdxse.jpg';
    const banner_home_2 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290550/banner_home_2_cnzi9r.jpg';
    const banner_home_3 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290550/banner_home_3_xbkdpg.jpg';
    const banner_home_4 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290551/banner_home_4_fcipmr.jpg';

    //render
    useEffect(() => {
        updateCartCount();
    }, []);

    return (
        <>
            <TruyenTheoQuangCao maquangcao="QC001" />
            <TruyenTheoQuangCao maquangcao="QC002" />
            <TruyenTheoQuangCao maquangcao="QC003" />
            <img className={homeStyles['img-title']} src={banner_home_1} />
            <TruyenTheoQuangCao maquangcao="lb7ssmtf" />
            <img className={homeStyles['img-title']} src={banner_home_2} />
            <TruyenTheoQuangCao maquangcao="lbmcb1jd" />
            <img className={homeStyles['img-title']} src={banner_home_3} />
            <TruyenTheoQuangCao maquangcao="lbwst2lr" />
            <img className={homeStyles['img-title']} src={banner_home_4} />
            <TruyenTheoQuangCao maquangcao="lc4ymoui" />
            <TruyenTheoQuangCao maquangcao="lcf1sre5" />
            <TruyenTheoQuangCao maquangcao="lcr3g6f2" />

        </>
    )
}

export default Home;
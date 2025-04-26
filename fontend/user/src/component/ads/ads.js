import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../component/grid.css';
import '../../component/style.css';
import '../home/home.module.css';
import TruyenTheoQuangCao from "../truyentheoquangcao";
import updateCartCount from '../updateCartCount';

const Ads = () => {
    useEffect(() => {
        updateCartCount();
    });

    const { id_quangcao } = useParams();



    return (
        <div className="grid wide list-product" style={{ marginTop: 25 }}>
            <TruyenTheoQuangCao maquangcao={id_quangcao} on_xemthem={false} on_phantrang={true} />
        </div>
    );
}

export default Ads;
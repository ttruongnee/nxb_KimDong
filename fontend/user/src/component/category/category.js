import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../component/grid.css';
import '../../component/style.css';
import '../home/home.module.css';
import TruyenTheoTheLoai from "../truyentheotheloai";
import updateCartCount from '../updateCartCount';

const Category = () => {
    useEffect(() => {
        updateCartCount();
    });

    const { id_theloai } = useParams();


    return (
        <div className="grid wide list-product" style={{ marginTop: 25 }}>

            <TruyenTheoTheLoai matheloai={id_theloai} on_xemthem={false} on_phantrang={true} />
        </div>
    );
}

export default Category;
function updateCartCount(cartCountRefPC, cartCountRefMobile) {
    const gioHang = JSON.parse(localStorage.getItem('GioHang')) || {};
    const arrGioHang = Object.values(gioHang);

    let sl = 0;
    for (let i = 0; i < arrGioHang.length; i++) {
        const soluong = arrGioHang[i].SoLuongTruyen;
        sl += soluong;
    }

    const displayCount = sl < 10 ? sl : '9+';

    function updateRefTextContent(cartCountRef, text) {
        if (cartCountRef && cartCountRef.current) {
            cartCountRef.current.textContent = text;
        }
    }

    updateRefTextContent(cartCountRefPC, displayCount);
    updateRefTextContent(cartCountRefMobile, displayCount);
}

export default updateCartCount;


//done 
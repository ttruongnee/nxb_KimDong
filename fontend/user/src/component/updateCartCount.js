function updateCartCount(cartCountRefPC, cartCountRefMobile) {
    const gioHang = JSON.parse(localStorage.getItem('GioHang')) || {};
    const arrGioHang = Object.values(gioHang);

    let soluong = 0;
    for (let i = 0; i < arrGioHang.length; i++) {
        const sl = arrGioHang[i].SoLuongTruyen;
        soluong += sl;
    }

    const displayCount = soluong < 10 ? soluong : '9+';

    function updateRefTextContent(ref, text) {
        if (ref && ref.current) {
            ref.current.textContent = text;
        }
    }

    updateRefTextContent(cartCountRefPC, displayCount);
    updateRefTextContent(cartCountRefMobile, displayCount);
}

export default updateCartCount;
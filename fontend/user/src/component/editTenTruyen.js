export const editTenTruyen = (tenTruyen, maxLength = 40) => {
    if (!tenTruyen) {
        return "";
    }
    if (tenTruyen.length <= maxLength) {
        return tenTruyen;
    }
    return tenTruyen.slice(0, maxLength).trim() + "...";
};
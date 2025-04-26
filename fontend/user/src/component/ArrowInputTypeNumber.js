import React, { useEffect, useState } from 'react';
import './ArrowInputTypeNumber.css';


function ArrowInputTypeNumber({ value, onChange }) {
    const [inputValue, setInputValue] = useState(value);

    // Đồng bộ giá trị truyền từ ngoài vào state khi giỏ hàng cập nhật lại
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleDecrease = () => {
        const newValue = Math.max(1, inputValue - 1);
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleIncrease = () => {
        const newValue = inputValue + 1;
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            setInputValue(val === '' ? '' : parseInt(val));
        }
    };

    const handleBlur = () => {
        const validValue = parseInt(inputValue) || 1;
        setInputValue(validValue);
        onChange(validValue);
    };

    return (
        <div className="ArrowInputTypeNumber">
            <button className="button-down flex-center" onClick={handleDecrease}>
                <i className="fas fa-chevron-down" />
            </button>
            <input
                type="text"
                className="input-soluong"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            <button className="button-up flex-center" onClick={handleIncrease}>
                <i className="fas fa-chevron-up" />
            </button>
        </div>
    );
}

export default ArrowInputTypeNumber;

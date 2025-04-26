// src/hooks/useCheckScreenSize.js
import { useEffect } from 'react';

const CheckScreenSize = (elementsRef) => {
    const checkScreen = () => {
        if (elementsRef.current) {
            elementsRef.current.forEach(element => {
                if (element) {
                    if (window.innerWidth > 520) {
                        element.classList.remove('c-6');
                        element.classList.add('c-4');
                    } else {
                        element.classList.remove('c-4');
                        element.classList.add('c-6');
                    }
                }
            });
        }
    };

    useEffect(() => {
        // Gọi checkScreen sau khi component đã mount và có thể ref đã được gán
        const timeoutId = setTimeout(() => {
            checkScreen();
        }, 50); // Độ trễ nhỏ (điều chỉnh nếu cần)

        const handleResize = () => {
            checkScreen();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [elementsRef]);
};

export default CheckScreenSize;
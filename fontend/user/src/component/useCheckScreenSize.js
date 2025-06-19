import { useEffect } from 'react';

const useCheckScreenSize = (elementsRef) => {
    useEffect(() => {
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

        const timeoutId = setTimeout(checkScreen, 50);
        window.addEventListener('resize', checkScreen);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkScreen);
        };
    }, [elementsRef]);
};

export default useCheckScreenSize;

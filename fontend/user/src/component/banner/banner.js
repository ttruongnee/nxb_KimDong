import React, { useEffect, useRef, useState } from "react";
import '../../component/grid.css';
import styles from './banner.module.css';
import '../../component/style.css';

const Banner = () => {
    const banner1 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290551/banner_img1_qdgrrs.jpg';
    const banner2 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290551/banner_img2_uz8whp.jpg';
    const banner3 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290551/banner_img3_xji2ro.jpg';
    const banner4 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290553/banner_img4_glj94j.jpg';
    const banner5 = 'https://res.cloudinary.com/dz7086zgw/image/upload/v1745290554/banner_img5_vxa0j0.jpg';


    const listImgRef = useRef(null);
    const imgsRef = useRef([]);
    const btnLeftRef = useRef(null);
    const btnRightRef = useRef(null);
    const dotsRef = useRef([]);
    const autoChangeIntervalRef = useRef(null);

    //ảnh hiện tại
    const [current, setCurrent] = useState(0);


    useEffect(() => {
        const listImg = listImgRef.current;
        const imgs = imgsRef.current;
        const dots = dotsRef.current;

        if (!listImg || !imgs || !dots) return;

        const updateSlider = () => {
            const width = imgs[0]?.offsetWidth || 0;  //lấy chiều rộng của ảnh 1
            listImg.style.transform = `translateX(${-width * current}px)`;

            //chạy foreach toàn bộ ds dots, xoá hết active, nếu index ở vị trí ảnh hiện tại -> gán active
            dots.forEach((dot, index) => {
                dot.classList.remove(styles.active);
                if (index === current) {
                    dot.classList.add(styles.active);
                }
            });
        };


        function toRight() {
            setCurrent(function (prev) {
                if (prev === imgs.length - 1) {
                    return 0;
                } else {
                    return prev + 1;
                }
            });
        }


        function toLeft() {
            setCurrent(function (prev) {
                if (prev === 0) {
                    return imgs.length - 1;
                } else {
                    return prev - 1;
                }
            });
        }


        // const dotClick = (index) => {
        //     setCurrent(index);
        // };

        updateSlider();

        autoChangeIntervalRef.current = setInterval(function () {
            toRight();
        }, 4000);

        const btnRight = btnRightRef.current;
        const btnLeft = btnLeftRef.current;

        const handleRightClick = () => {
            clearInterval(autoChangeIntervalRef.current);  //xoá interval đang chạy hiện tại
            toRight();  //chuyển ảnh
            autoChangeIntervalRef.current = setInterval(function () {  //gán lại interval
                toRight();
            }, 4000);
        };

        const handleLeftClick = () => {
            clearInterval(autoChangeIntervalRef.current);
            toLeft();
            autoChangeIntervalRef.current = setInterval(function () {
                toRight();
            }, 4000);
        };

        if (btnRight) {
            btnRight.addEventListener('click', handleRightClick);
        }
        if (btnLeft) {
            btnLeft.addEventListener('click', handleLeftClick);
        }

        dots.forEach((dot, index) => {
            dot?.addEventListener('click', function () {
                setCurrent(index);
            });
        });


        return () => {
            clearInterval(autoChangeIntervalRef.current);
            if (btnRight) {
                btnRight.removeEventListener('click', handleRightClick);
            }
            if (btnLeft) {
                btnLeft.removeEventListener('click', handleLeftClick);
            }
            dots.forEach(dot => {
                dot?.removeEventListener('click', () => { });
            });
        };
    }, []);

    useEffect(() => {
        const listImg = listImgRef.current;
        const imgs = imgsRef.current;
        const dots = dotsRef.current;

        if (!listImg || !imgs || !dots) return;

        const updateSlider = () => {
            const width = imgs[0]?.offsetWidth || 0;  //lấy chiều rộng của ảnh 1
            listImg.style.transform = `translateX(${-width * current}px)`;

            //chạy foreach toàn bộ ds dots, xoá hết active, nếu index ở vị trí ảnh hiện tại -> gán active
            dots.forEach((dot, index) => {
                dot.classList.remove(styles.active);
                if (index === current) {
                    dot.classList.add(styles.active);
                }
            });
        };

        updateSlider();
    }, [current]);

    function renderDots() {
        const dots = [];
        for (let i = 0; i < 5; i++) {
            dots.push(
                <div
                    key={i}
                    className={styles.dot}
                    ref={(el) => {
                        if (!dotsRef.current) {
                            dotsRef.current = [];
                        }
                        dotsRef.current[i] = el;
                    }}
                />
            );
        }
        return dots;
    }


    return (
        <div className={`${styles.banner}`}>
            <div className={styles['slide-show']}>
                <div id="img-banners" className="displayflex" ref={listImgRef} style={{ transition: 'transform 0.9s ease-in-out' }}>
                    {[banner1, banner2, banner3, banner4, banner5].map((banner, index) => (
                        <img
                            key={index}
                            className={styles['img-banner']}
                            src={banner}
                            ref={(el) => (imgsRef.current[index] = el)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles['btns-banner']}>
                <div className={`${styles['btn-banner']} icon-white ${styles['btn-left']}`} ref={btnLeftRef}>
                    <i className="fas fa-chevron-left" />
                </div>
                <div className={`${styles['btn-banner']} icon-white ${styles['btn-right']}`} ref={btnRightRef}>
                    <i className="fas fa-chevron-right" />
                </div>
            </div>
            <div className={styles.dots}>
                {renderDots()}
            </div>
        </div>
    );
};

export default Banner;


//done
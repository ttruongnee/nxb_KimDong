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
    const [current, setCurrent] = useState(0);
    const autoChangeIntervalRef = useRef(null);

    useEffect(() => {
        const listImg = listImgRef.current;
        const imgs = imgsRef.current;
        const dots = dotsRef.current;

        if (!listImg || !imgs || !dots) return;

        const updateSlider = () => {
            const width = imgs[0]?.offsetWidth || 0;
            listImg.style.transform = `translateX(${-width * current}px)`;
            dots.forEach((dot, index) => {
                dot.classList.remove(styles.active);
                if (index === current) {
                    dot.classList.add(styles.active);
                }
            });
        };

        const toRight = () => {
            setCurrent((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
        };

        const toLeft = () => {
            setCurrent((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
        };

        const dotClick = (index) => {
            setCurrent(index);
        };

        updateSlider();

        autoChangeIntervalRef.current = setInterval(toRight, 4000);

        const btnRight = btnRightRef.current;
        const btnLeft = btnLeftRef.current;

        const handleRightClick = () => {
            clearInterval(autoChangeIntervalRef.current);
            toRight();
            autoChangeIntervalRef.current = setInterval(toRight, 4000);
        };

        const handleLeftClick = () => {
            clearInterval(autoChangeIntervalRef.current);
            toLeft();
            autoChangeIntervalRef.current = setInterval(toRight, 4000);
        };

        if (btnRight) {
            btnRight.addEventListener('click', handleRightClick);
        }
        if (btnLeft) {
            btnLeft.addEventListener('click', handleLeftClick);
        }

        dots.forEach((dot, index) => {
            dot?.addEventListener('click', () => dotClick(index));
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
            const width = imgs[0]?.offsetWidth || 0;
            listImg.style.transform = `translateX(${-width * current}px)`;
            dots.forEach((dot, index) => {
                dot.classList.remove(styles.active);
                if (index === current) {
                    dot.classList.add(styles.active);
                }
            });
        };

        updateSlider();
    }, [current]);

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
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className={styles.dot}
                        ref={(el) => {
                            if (!dotsRef.current) dotsRef.current = [];
                            dotsRef.current[index] = el;
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/truyen" className="layout-topbar-logo">
                <img src={`https://res.cloudinary.com/dz7086zgw/image/upload/v1745290376/logo_eoetrx.png`} width="40px" height={'40px'} widt={'true'} alt="logo" />
                <span>NXB Kim Đồng</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>

                <button type="button" className="p-link layout-topbar-button" style={{ width: '100%', marginRight: '20px' }}>
                    <i className="pi pi-user"></i>
                    <p style={{ marginLeft: '10px' }}>Đinh Thiên Trường</p>
                </button>
                <Link href="/auth/login" className="p-link layout-topbar-button" style={{ marginRight: '30px' }} >
                    <i className="pi pi-fw pi-sign-in"></i>
                    <p style={{ marginLeft: '10px' }}> Logout</p>
                </Link>
                {/* <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link> */}
            </div>
        </div >
    );
});

export default AppTopbar;

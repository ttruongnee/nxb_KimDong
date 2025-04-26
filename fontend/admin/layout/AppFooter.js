import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import logo from './images/logo.png';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <span className="font-medium ml-2 mt-3">COPYRIGHTS © 2021 BY NXB KIM ĐỒNG</span>
        </div>
    );
};

export default AppFooter;

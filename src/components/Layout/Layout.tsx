import React, { useState } from 'react';
import { Layout as AntLayout } from 'antd';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content';
import SideMenu from './SideMenu/SideMenu';

type Props = {
    isAuthenticated: boolean;
    children: React.ReactNode
}

const Layout = ({ isAuthenticated, children }: Props) => {
    const [ showSideMenu, setShowSideMenu ] = useState(false);

    return (
        <AntLayout>
            <Header isAuthenticated={isAuthenticated} showSideMenu={() => setShowSideMenu(true)} />
            <Content>
                {children}
            </Content>
            <Footer />

            <SideMenu 
                visible={showSideMenu}
                isAuthenticated={isAuthenticated}
                onClose={() => setShowSideMenu(false)}
            />
        </AntLayout>
    );
}

export default Layout;

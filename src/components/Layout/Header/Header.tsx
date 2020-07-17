import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import './Header.scss';
import NavigationItems from '../../NavigationItems/NavigationItems';

type Props = {
    isAuthenticated: boolean;
    showSideMenu: () => void;
};

const Header = ({ isAuthenticated, showSideMenu }: Props) => {
    return (
        <Layout.Header className="header">
            <Row align="middle" >
                <Col flex="0 1 auto" style={{ color: 'white' }}>
                    TODO App
                </Col>
                <Col flex="auto">
                    <Row
                        align="middle" 
                        justify="end"
                    >
                        {isAuthenticated && <NavigationItems />}
                        <Button className="header__side-menu-button" onClick={showSideMenu}>
                            <MenuOutlined />
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Layout.Header>
    );
}

export default Header;

import React from 'react';
import { Drawer, Button, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import './SideMenu.scss';
import NavigationItems from '../../NavigationItems/NavigationItems';

type Props = {
    visible: boolean;
    isAuthenticated: boolean;
    onClose: () => void;
};

const SideMenu = ({ visible, isAuthenticated, onClose }: Props) => {
    return (
        <Drawer
            className="side-menu"
            title="Menu"
            placement="right"
            closable={true}
            visible={visible}
            onClose={onClose}
            bodyStyle={{ padding: '10px' }}
            footer={[
                <Row key="0">
                    <Button type="link" href="https://gorilo.pl/blog/polityka-cookies/"><MailOutlined /> Contact</Button>
                </Row>,
            ]}
        >  
            {isAuthenticated && <NavigationItems />}
        </Drawer>
    );
}

export default SideMenu;
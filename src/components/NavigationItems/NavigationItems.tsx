import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const NavigationItems = () => {
    return (
        <div className="navigation-items">
            <NavLink type="link" to='/'>
                <Button type="link">
                    <HomeOutlined /> Home
                </Button>
            </NavLink>
            <NavLink type="link" to='/tasks'>
                <Button type="link">
                    <UnorderedListOutlined /> Tasks
                </Button>
            </NavLink>
            <NavLink type="link" to='/account'>
                <Button type="link">
                    <UserOutlined />Account
                </Button>
            </NavLink>
            <NavLink type="link" to='/sign-out'>
                <Button type="link">
                    <LogoutOutlined /> Sign Out
                </Button>
            </NavLink>
        </div>
    );
}

export default NavigationItems;

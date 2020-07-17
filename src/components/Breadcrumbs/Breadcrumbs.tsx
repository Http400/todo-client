import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

type BreadcrumbDef = {
    path: string;
    breadcrumbName: string;
    icon?: any;
};

export const routesDef: BreadcrumbDef[] = [
    {
        path: '/',
        breadcrumbName: 'home',
        icon: <HomeOutlined />
    },
    {
        path: '/tasks',
        breadcrumbName: 'Tasks',
        icon: <UnorderedListOutlined />
    },
    {
        path: '/account',
        breadcrumbName: 'Account',
        icon: <UserOutlined />
    }
];

type Props = {
    customBreadcrumb?: BreadcrumbDef;
};

const Breadcrumbs = ({ customBreadcrumb }: Props) => {
    const location = useLocation();

    const breadcrumbs = useMemo(() => {
        let routesTmp = [ ...routesDef ];
        if (customBreadcrumb) routesTmp.push(customBreadcrumb);
        let filteredRoutes = routesTmp.filter((route: BreadcrumbDef) => location.pathname.indexOf(route.path) !== -1);

        const arr = [];
        for (let i = 0; i < filteredRoutes.length; i++) {
            if (i !== filteredRoutes.length) {
                arr.push(
                    <AntBreadcrumb.Item key={i}>
                        <NavLink type="link" to={filteredRoutes[i].path}>
                            {filteredRoutes[i].icon} {filteredRoutes[i].breadcrumbName}
                        </NavLink>
                    </AntBreadcrumb.Item>
                );
            }
        }

        return <>
            <AntBreadcrumb>
                {arr}
            </AntBreadcrumb>
        </>;
    }, [location, customBreadcrumb]);

    return breadcrumbs;
}

export default Breadcrumbs

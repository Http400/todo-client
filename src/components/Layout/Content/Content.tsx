import React from 'react';
import { Layout } from 'antd';

import './Content.scss';

type Props = {
    children: React.ReactNode
}

const Content = ({ children }: Props) => {
    return (
        <Layout.Content className="content">
            {children}
        </Layout.Content>
    );
}

export default Content;

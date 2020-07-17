import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const { Title } = Typography;

const Home = () => {
    return <>
        <Breadcrumbs />
        <Title>
            Welcome
        </Title>
        <p>
            Start managing Your 
            <Link to='/tasks'>
                <Button type="link" style={{ paddingLeft: 5, paddingRight: 0 }}>Tasks</Button>
            </Link>
        </p>
    </>;
}

export default Home;
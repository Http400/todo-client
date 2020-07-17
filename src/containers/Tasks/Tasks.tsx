import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Space, Card, Pagination, Button, Select } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import './Tasks.scss';
import { RootState } from '../../store';
import * as taskActions from '../../store/task/actions';
import Task, { Status, Priority  } from '../../common/models/Task';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const SORTING_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Highest priority', value: 'highestPriority' },
    { label: 'Lowest priority', value: 'lowestPriority' },
];

const PAGE_SIZE_OPTIONS = [ 3, 5, 10 ];

const PRIORITY_CLASS_NAMES = [ 'tasks__task-card--priority-low', 'tasks__task-card--priority-medium', 'tasks__task-card--priority-high', 'tasks__task-card--priority-very-high' ];

export const STATUS_NAMES = Object.keys(Status).slice( Object.keys(Status).length / 2 );
export const PRIORITY_NAMES = Object.keys(Priority).slice( Object.keys(Priority).length / 2 );

const mapState = (state: RootState) => ({
    tasks: state.task.tasks,
    pagination: state.task.pagination
});

const mapDispatch = {
    getTasks: (page?: number, pageSize?: number, sortBy?: string) => taskActions.getTasks(page, pageSize, sortBy)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Tasks = ({ tasks, pagination, getTasks }: Props) => {
    const history = useHistory();
    const location = useLocation();
    const [ currentPageValue, setCurrentPageValue ] = useState<number>(1);
    const [ pageSizeValue, setPageSizeValue ] = useState<number>(PAGE_SIZE_OPTIONS[1]);
    const [ sortByValue, setSortByValue ] = useState<string>(SORTING_OPTIONS[0].value);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const currentPageParam = urlSearchParams.get('page');
        const pageSizeParam = urlSearchParams.get('pageSize');
        const sortByParam = urlSearchParams.get('sortBy');

        const currentPage = currentPageParam ? parseInt( currentPageParam ) : currentPageValue;
        const pageSize = pageSizeParam ? parseInt( pageSizeParam ) : pageSizeValue;
        const sortBy = sortByParam || sortByValue;

        if (currentPageValue !== currentPage) setCurrentPageValue(currentPage);
        if (pageSizeValue !== pageSize) setPageSizeValue(pageSize);
        if (sortByValue !== sortBy) setSortByValue(sortBy);
        
        getTasks(currentPage, pageSize, sortBy);
    }, [location.search, getTasks]); // eslint-disable-line react-hooks/exhaustive-deps

    const changeParam = useCallback( (page: number, pageSize: number, sortBy: string) => {
        history.push({
            pathname: '/tasks',
            search: `?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`
        });
    }, [history]);

    const paginationElement = useMemo(() => {
        if (!pagination || pagination.totalPages === 1) return null;

        return <Pagination 
            current={currentPageValue} 
            pageSize={pagination.pageSize} 
            total={pagination.totalItems} 
            onChange={(value: number) => changeParam(value, pageSizeValue, sortByValue)} />;
    }, [currentPageValue, pagination, pageSizeValue, sortByValue, changeParam]);

    return <>
        <Breadcrumbs />
        <div className="tasks">
            <Row middle='xs'>
                <Col xs={24} md>
                    <Row center='xs' start='md'>
                        <NavLink
                            to='/tasks/new' >
                            <Button type="primary" shape="round"><PlusOutlined /> New task</Button>
                        </NavLink>
                    </Row>
                </Col>
                <Col xs={24} md>
                    <Row end="xs" className='tasks__tasks-table-settings'>
                        <Col>
                            <Space>
                                <span>Sort:</span>
                                <Select 
                                    size='small' 
                                    options={SORTING_OPTIONS} 
                                    defaultValue={sortByValue} 
                                    onChange={(value: string) => changeParam(currentPageValue, pageSizeValue, value)} 
                                    style={{ width: '142px', textAlign: 'left' }} />
                            </Space>
                        </Col>
                        <Col>
                            <Space>
                                <span>Page size:</span>
                                <Select 
                                    size='small' 
                                    options={PAGE_SIZE_OPTIONS.map(o => ({ label: o, value: o }))} 
                                    defaultValue={pageSizeValue} 
                                    onChange={(value: number) => changeParam(currentPageValue, value, sortByValue)} />  
                            </Space>
                        </Col>  
                    </Row>
                </Col>
            </Row>
            
            <Space direction="vertical" style={{ width: '100%' }}>
                {tasks.map((task: Task) => (
                    <Card 
                        key={task._id} 
                        className={'tasks__task-card ' + (task.priority !== undefined ? PRIORITY_CLASS_NAMES[task.priority] : '')} 
                        title={task.title} 
                        extra={
                            <Link to={`/tasks/${task._id}`}>
                                <EditOutlined /> Edit
                            </Link>
                        }
                    >
                        <Row between="xs">
                            <Col xs={12} sm={10}>
                                <p>{task.description}</p>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Row end="xs">
                                    <Space direction='vertical'>
                                        {task.priority !== undefined ? `priority: ${PRIORITY_NAMES[task.priority]}` : null}
                                        {task.status !== undefined ? `status: ${STATUS_NAMES[task.status]}` : null}
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Space>
            <Row center="xs" className="tasks__pagination">
                <Col>
                    {paginationElement}
                </Col>
            </Row>
        </div>
    </>;
}

export default connector(Tasks);

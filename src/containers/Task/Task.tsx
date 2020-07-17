import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Form as AntDForm } from 'antd';

import './Task.scss';
import { RootState } from '../../store';
import * as taskActions from '../../store/task/actions';
import TaskModel, { Status, Priority } from '../../common/models/Task';
import Form, { inputDef } from '../../components/Form/Form';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const inputs: inputDef[] = [
    {
        type: 'input',
        label: 'Title',
        name: 'title',
        rules: [
            { required: true, message: 'Title is required' }
        ]
    },
    {
        type: 'textarea',
        label: 'Description',
        name: 'description',
        rules: [
            { required: true, message: 'Description is required' }
        ]
    },
    {
        type: 'select',
        label: 'Status',
        name: 'status',
        rules: [],
        options: Object.entries(Status).filter(e => !isNaN(e[0]as any)).map(e => ({ label: e[1], value: parseInt(e[0]) }))
    },
    // {
    //     type: 'radio',
    //     label: 'Priority',
    //     name: 'priority',
    //     rules: [],
    //     options: Object.entries(Priority).filter(e => !isNaN(e[0]as any)).map(e => ({ label: e[1], value: parseInt(e[0]) }))
    // },
    {
        type: 'rate',
        label: 'Priority',
        name: 'priority',
        count: Object.keys(Priority).length / 2
    }
]; 

const mapState = (state: RootState) => ({
    task: state.task.editTask,
    tasks: state.task.tasks
});

const mapDispatch = {
    getTask: (id: string, tasks: TaskModel[]) => taskActions.getTask(id, tasks),
    initNewTask: () => taskActions.initNewTask(),
    updateTask: (task: TaskModel, id?: string) => taskActions.updateTask(task, id)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Task = ({ task, tasks, getTask, initNewTask, updateTask }: Props) => {
    const history = useHistory();
    const { id } = useParams();
    const [ submitted, setSubmitted ] = useState<boolean>(false);

    useEffect(() => {
        if (id === 'new') {
            initNewTask();
        } else if (id !== task?._id) {
            getTask(id, tasks);
        }
    }, [id, initNewTask, getTask]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (id === 'new' && submitted && task?._id) {
            history.push('/tasks/' + task?._id);
            setSubmitted(false);
        }
    }, [submitted, task]);

    const handleSubmit = useCallback((values: TaskModel) => {
        if (values.priority) values.priority--;
        updateTask(values, id !== 'new' ? id : undefined);
        setSubmitted(true);
    }, [updateTask]);

    const form = useMemo(() => {
        if (!task) return <p>Loading...</p>;

        const initialValues: { [key: string]: any } = {};
        for (let input of inputs) {
            initialValues[input.name] = (task as { [key: string]: any })[input.name];
        }

        initialValues['priority']++; 
        
        const createdAt = task.createdAt ? (
            <AntDForm.Item label="Create date" labelCol={{ flex: '100px' }} wrapperCol={{ flex:'auto' }}>
                <span className="ant-form-text">{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : null}</span>
            </AntDForm.Item>
        ) : null;
        
        const updatedAt = task.updatedAt ? (
            <AntDForm.Item label="Update date" labelCol={{ flex: '100px' }} wrapperCol={{ flex:'auto' }}>
                <span className="ant-form-text">{task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : null}</span>
            </AntDForm.Item>
        ) : null;

        return <>
            {createdAt}
            {updatedAt}
            <Form
                name='task'
                inputs={inputs}
                initialValues={initialValues}
                onSubmit={handleSubmit} />
        </>;
    }, [task, handleSubmit]);

    const breadcrumbs = useMemo(() => {
        return <Breadcrumbs customBreadcrumb={{
            path: '/' + id,
            breadcrumbName: (task && task.title) ? task.title : 'New task',
        }} />;
    }, [id, task]);

    return <>
        {breadcrumbs}
        <div className="task">
            {form}
        </div>
    </>;
}

export default connector(Task);

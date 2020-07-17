import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from '../../utils/axiosSetup';
import { requestStart, requestSuccess, requestFail } from '../api/actions';
import { TaskActionTypes, GET_TASKS, GET_TASK, INIT_NEW_TASK, UPDATE_TASK_SUCCESS } from './types';
import { RootState } from '../index';
import PaginatedResults from '../../common/models/PaginatedResults';
import Task from '../../common/models/Task';

const getTasksSuccess = (data: PaginatedResults<Task>): TaskActionTypes => {
    return {
        type: GET_TASKS,
        tasks: data.items,
        pagination: {
            totalItems: data.totalItems,
            currentPage: data.currentPage,
            pageSize: data.pageSize,
            totalPages: data.totalPages
        }
    };
}

export const getTasks = (page: number = 1, pageSize: number = 3, sortBy?: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    dispatch( requestStart() );
    axios.get<null, PaginatedResults<Task>>(`/tasks?page=${page}&pageSize=${pageSize}${sortBy ? '&sortBy=' + sortBy : ''}`) 
        .then(response => {
            console.log(response);
            dispatch( requestSuccess() );
            dispatch( getTasksSuccess(response) );
        }).catch((error: Error) => {
            console.log(error);
            dispatch( requestFail(error) );
        });
}

const getTaskSuccess = (task: Task): TaskActionTypes => {
    return {
        type: GET_TASK,
        task: task
    };
}

export const getTask = (id: string, tasks?: Task[]): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    const task = tasks?.find(t => t._id === id);
    if (task) {
        dispatch( getTaskSuccess(task) );
        return;
    } 
    dispatch( requestStart() );
    axios.get<null, Task>(`/tasks/${id}`)
        .then(response => {
            console.log(response);
            dispatch( requestSuccess() );
            dispatch( getTaskSuccess(response) );
        }).catch((error: Error) => {
            console.log(error);
            dispatch( requestFail(error) );
        });
}

export const initNewTask = (): TaskActionTypes => {
    return {
        type: INIT_NEW_TASK
    };
}

const updateTaskSuccess = (task: Task): TaskActionTypes => {
    return {
        type: UPDATE_TASK_SUCCESS,
        task
    }
}

export const updateTask = (task: Task, id?: string): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async dispatch => {
    dispatch( requestStart() );
    if (id) {
        return axios.put<Task, Task>('/tasks/' + id, task)
            .then(response => {
                dispatch( updateTaskSuccess(response) );
                Promise.resolve();
            }).catch(error => {
                dispatch( requestFail(error) );
                Promise.reject();
            });
    } else {
        return axios.post<Task, Task>('/tasks', task)
            .then(response => {
                dispatch( updateTaskSuccess(response) );
                Promise.resolve();
            }).catch(error => {
                dispatch( requestFail(error) );
                Promise.reject();
            });
    }
}
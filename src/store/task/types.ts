import Task from '../../common/models/Task';

export interface TaskState {
    tasks: Task[];
    pagination: {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    } | null;
    editTask: Task | null;
}

export const GET_TASKS = 'GET_TASKS';

interface GetTasksSuccess {
    type: typeof GET_TASKS;
    tasks: Task[],
    pagination: {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    }
}

export const GET_TASK = 'GET_TASK';

interface GetTaskSuccess {
    type: typeof GET_TASK,
    task: Task
}

export const INIT_NEW_TASK = 'INIT_NEW_TASK';

interface InitNewTask {
    type: typeof INIT_NEW_TASK
}

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';

interface UpdateTask {
    type: typeof UPDATE_TASK_SUCCESS;
    task: Task;
}

export type TaskActionTypes = GetTasksSuccess | GetTaskSuccess | InitNewTask | UpdateTask;
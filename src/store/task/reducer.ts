import { TaskState, TaskActionTypes, GET_TASKS, GET_TASK, INIT_NEW_TASK, UPDATE_TASK_SUCCESS } from './types';

const inititalState: TaskState = {
    tasks: [],
    pagination: null,
    editTask: null
};

export const reducer = (state = inititalState, action: TaskActionTypes): TaskState => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.tasks,
                pagination: action.pagination
            };
        case GET_TASK:
            return {
                ...state,
                editTask: action.task
            };
        case INIT_NEW_TASK:
            return {
                ...state,
                editTask: {
                    title: '',
                    description: '',
                    status: 0,
                    priority: 0
                }
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                editTask: action.task,
                tasks: []
            };
        default:
            return state;
    }
}
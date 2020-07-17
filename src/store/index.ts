import { combineReducers } from 'redux';
import { reducer as apiReducer } from './api/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as taskReducer } from './task/reducer';

export const rootReducer = combineReducers({
    api: apiReducer,
    user: userReducer,
    task: taskReducer
});

export type RootState = ReturnType<typeof rootReducer>;
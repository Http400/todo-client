import { ApiActionTypes, REQUEST_START, REQUEST_SUCCESS, REQUEST_FAIL } from './types';
import Error from '../../common/models/Error';

export const requestStart = (): ApiActionTypes => {
    return {
        type: REQUEST_START
    };
}

export const requestSuccess = (): ApiActionTypes => {
    return {
        type: REQUEST_SUCCESS
    };
}

export const requestFail = (error: Error): ApiActionTypes => {
    return {
        type: REQUEST_FAIL,
        error
    };
}
import { ApiState, ApiActionTypes, REQUEST_START, REQUEST_FAIL, REQUEST_SUCCESS } from './types';

const initialState: ApiState = {
    processingRequests: 0,
    loading: false,
    error: null
};

export const reducer = (state = initialState, action: ApiActionTypes): ApiState => {
    switch (action.type) {
        case REQUEST_START:
            return {
                ...state,
                processingRequests: state.processingRequests + 1,
                loading: true,
                error: null
            };
        case REQUEST_SUCCESS:
            return {
                ...state,
                processingRequests: state.processingRequests - 1,
                loading: false,
                error: null,
            };
        case REQUEST_FAIL:
            return {
                ...state,
                processingRequests: state.processingRequests - 1,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}
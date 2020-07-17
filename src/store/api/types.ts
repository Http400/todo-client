import Error from '../../common/models/Error';

export interface ApiState {
    processingRequests: number;
    loading: boolean;
    error: Error | null;
}

export const REQUEST_START = 'REQUEST_START';

interface RequestStart {
    type: typeof REQUEST_START;
}

export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

interface RequestSuccess {
    type: typeof REQUEST_SUCCESS;
}

export const REQUEST_FAIL = 'REQUEST_FAIL';

interface RequestFail {
    type: typeof REQUEST_FAIL;
    error: Error;
}

export type ApiActionTypes = RequestStart | RequestSuccess | RequestFail;
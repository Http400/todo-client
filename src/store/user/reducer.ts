import { UserState, UserActionTypes, SIGN_IN, SIGN_OUT } from './types';

const initialState: UserState = {
    username: null,
    authToken: null,
    refreshToken: null
};

export const reducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                username: action.username,
                authToken: action.authToken,
                refreshToken: action.refreshToken
            };
        case SIGN_OUT:
            return {
                ...state,
                username: null,
                authToken: null,
                refreshToken: null
            };
        default:
            return state;
    }
}
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from '../../utils/axiosSetup';
import { UserActionTypes, SIGN_IN, SIGN_OUT } from './types';
import { RootState } from '../index';
import { requestStart, requestSuccess, requestFail } from '../api/actions';
import Error from '../../common/models/Error';
import { SignInRequest, SignInResponse } from '../../common/models/SignIn';
import { SignUpRequest, SignUpResponse } from '../../common/models/SignUp';
import { ChangePasswordRequest, ChangePasswordResponse } from '../../common/models/ChangePassword';

const signInSuccess = (username: string, authToken: string, refreshToken: string): UserActionTypes => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    return {
        type: SIGN_IN,
        username,
        authToken,
        refreshToken
    };
}

export const signIn = (username: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    dispatch( requestStart() );
    const data: SignInRequest = { username, password };
    axios.post<SignInRequest, SignInResponse>('/auth/login', data)
        .then(response => {
            console.log(response);
            dispatch( requestSuccess() );
            const jwtData = response.authToken.split('.')[1];
            const decodedJwtData = JSON.parse(window.atob(jwtData));
            console.log(decodedJwtData);
            const userData = {
                id: decodedJwtData.id,
                username: decodedJwtData.username,
                authToken: response.authToken,
                refreshToken: response.refreshToken,
                expiresIn: decodedJwtData.exp,
                issuedAt: decodedJwtData.iat
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            dispatch( signInSuccess(decodedJwtData.username, response.authToken, response.refreshToken) );
        }).catch((error: Error) => {
            console.log(error);
            dispatch( requestFail(error) );
        });
}

export const signOut = () => {
    localStorage.removeItem('userData');
    axios.defaults.headers.common['Authorization'] = null;

    return {
        type: SIGN_OUT
    };
}

export const checkSignInState = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    const storedUser = localStorage.getItem('userData');
    if (!storedUser) {
        dispatch( signOut() );
    } else {
        const userData = JSON.parse(storedUser);
        dispatch( signInSuccess(userData.username, userData.authToken, userData.refreshToken));
    }
}

export const changePassword = (currentPassword: string, newPassword: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    dispatch( requestStart() );
    const data: ChangePasswordRequest = { currentPassword, newPassword };
    axios.patch<ChangePasswordRequest, ChangePasswordResponse>('/auth/change-password', data)
        .then(response => {
            console.log(response);
            dispatch( requestSuccess() );
        }).catch((error: Error) => {
            console.log(error);
            dispatch( requestFail(error) );
        });
}

export const signUp = (username: string, password: string): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async dispatch => {
    dispatch( requestStart() );
    const data: SignUpRequest = { username, password };
    return axios.post<SignUpRequest, SignUpResponse>('/auth/register', data)
        .then(response => {
            dispatch( requestSuccess() );
            Promise.resolve();
        }).catch((error: Error) => {
            dispatch( requestFail(error) );
            Promise.reject();
        });
}
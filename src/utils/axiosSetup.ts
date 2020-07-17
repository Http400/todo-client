import axios from 'axios';
import { RefreshTokenRequest, RefreshTokenResponse } from '../common/models/RefreshToken';

const instance = axios.create({
    baseURL: '/api'
});

instance.interceptors.response.use(
    response => Promise.resolve(response.data),
    error => {
        console.log('Error Interceptor');
        console.log(error.response);
        console.log(error.config);
        const originalRequest = error.config;

        // if (error.config && error.response && error.response.status === 401 && error.response.data.message === 'Authentication token expired') {
        if (error.response.status === 401 && !originalRequest._retry) {
            const storedUser = localStorage.getItem('userData');

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                const data: RefreshTokenRequest = { userId: userData.id, refreshToken: userData.refreshToken };
                return instance.post<RefreshTokenRequest, RefreshTokenResponse>('/auth/refresh-token', data)
                    .then(response => {
                        console.log(response);
                        const authToken = response.token;
                        userData.authToken = authToken;
                        localStorage.setItem('userData', JSON.stringify(userData));
                        instance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${authToken}`;
                        return instance.request(originalRequest);
                    });
            }
        }

        return Promise.reject(error.response.data);
    }
);

export default instance;
export interface UserState {
    username: string | null;
    authToken: string | null;
    refreshToken: string | null;
}

export const SIGN_IN = 'SIGN_IN';

interface SignInSuccess {
    type: typeof SIGN_IN;
    username: string;
    authToken: string;
    refreshToken: string;
}

export const SIGN_OUT = 'SIGN_OUT';

interface SignOut {
    type: typeof SIGN_OUT;
}

export type UserActionTypes = SignInSuccess | SignOut;
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import './Auth.scss';
import { RootState } from '../../store';
import * as userActions from '../../store/user/actions';
import Form, { inputDef } from '../../components/Form/Form';

const signInInputs: inputDef[] = [
    {
        type: 'input',
        label: 'Username',
        name: 'username',
        rules: [
            { required: true, message: 'Username is required' }
        ]
    },
    {
        type: 'password',
        label: 'Password',
        name: 'password',
        rules: [
            { required: true, message: 'Password is required' },
            { min: 3, message: 'Password must contain at least 6 characters' }
        ]
    }
];

const signUpInputs: inputDef[] = [
    {
        type: 'input',
        label: 'Username',
        name: 'username',
        rules: [
            { required: true, message: 'Username is required' }
        ]
    },
    // {
    //     type: 'input',
    //     label: 'E-mail',
    //     name: 'email',
    //     rules: [
    //         { required: true, message: 'E-mail is required' },
    //         { type: 'email', message: 'E-mail is not valid' }
    //     ]
    // },
    {
        type: 'password',
        label: 
            <span>
                Password&nbsp;
                <Tooltip title="Password must contain at least 6 characters">
                    <QuestionCircleOutlined />
                </Tooltip>
            </span>,
        name: 'password',
        rules: [
            { required: true, message: 'Password is required' },
            { min: 6, message: 'Password must contain at least 6 characters' }
        ]
    },
    {
        type: 'password',
        label: 'Repeat password',
        name: 'password_confirmation',
        rules: [
            { required: true, message: 'Repeat password' },
            ({ getFieldValue }: any) => ({
                validator(rule: any, value: any): Promise<any> {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                },
            })
        ]
    }
]; 

const mapState = (state: RootState) => ({
    error: state.api.error
});

const mapDispatch = {
    signIn: (username: string, passsword: string) => userActions.signIn(username, passsword),
    signUp: (username: string, password: string) => userActions.signUp(username, password)
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Auth = ({ error, signIn, signUp }: Props) => {
    const [ isSignInMode, setIsSignInMode ] = useState(true);

    const handleSignIn = ({ username, password }: any) => {
        signIn(username, password);
    }

    const handleSignUp = ({ username, password }: any) => {
        signUp(username, password)
            .then(() => {
                setIsSignInMode(true);
            });
    }

    const form = <Form 
        name="sign-in"
        inputs={isSignInMode ? signInInputs : signUpInputs} 
        err={error?.details}
        onSubmit={isSignInMode ? handleSignIn : handleSignUp}  />

    return (
        <div className="auth">
            <div>
                {form}
                <Button type="link" onClick={() => setIsSignInMode(!isSignInMode)}>
                    {isSignInMode ? 'Create an account' : 'I already have an account'}
                </Button>
            </div>
        </div>
    );
}

export default connector(Auth);
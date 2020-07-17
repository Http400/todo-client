import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as userActions from '../../store/user/actions';
import Form, { inputDef } from '../../components/Form/Form';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const inputs: inputDef[] = [
    {
        type: 'password',
        label: 'Current password',
        name: 'currentPassword',
        rules: [
            { required: true, message: 'Current password is required' }
        ]
    },
    {
        type: 'password',
        label: 'New password',
        name: 'newPassword',
        rules: [
            { required: true, message: 'New password is required' },
            { min: 6, message: 'Password must container at least 6 characters' }
        ]
    },
    {
        type: 'password',
        label: 'Repeat password',
        name: 'confirmPassword',
        rules: [
            { required: true, message: 'Repeat password' },
            ({ getFieldValue }: any) => ({
                validator(rule: any, value: any): Promise<any> {
                    if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                },
            })
        ]
    }
];

const layout = {
    labelCol: { flex: '140px' },
    wrapperCol: { flex: 'auto' }
};

const tailLayout = {
    style: {
        marginLeft: '140px'
    }
};

const mapState = (state: RootState) => ({
    error: state.api.error
});

const mapDispatch = {
    changePassword: (currentPassword: string, newPassword: string) => userActions.changePassword(currentPassword, newPassword)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Account = ({ error, changePassword }: Props) => {

    const handleChangePassword = ({ currentPassword, newPassword }: any) => {
        changePassword(currentPassword, newPassword);
    }

    const form = <Form 
    name="change-password" 
    inputs={inputs}
    onSubmit={handleChangePassword} 
    err={error?.details}
    layout={layout}
    tailLayout={tailLayout} />

    return <>
        <Breadcrumbs />
        <div>
            {form}
        </div>
    </>;
}

export default connector(Account);

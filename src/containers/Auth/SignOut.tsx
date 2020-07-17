import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import * as userActions from '../../store/user/actions';

const mapDispatch = {
    signOut: () => userActions.signOut()
}

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const SignOut = ({ signOut }: Props) => {

    useEffect(() => {
        signOut();
    }, [signOut]);

    return (
        <Redirect to='/' />
    );
}

export default connector(SignOut);

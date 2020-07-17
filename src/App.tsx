import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import './App.css';
import { RootState } from './store';
import * as userActions from './store/user/actions';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import SignOut from './containers/Auth/SignOut';
import Home from './containers/Home/Home';
import Tasks from './containers/Tasks/Tasks';
import Task from './containers/Task/Task';
import Account from './containers/Account/Account';

const mapState = (state: RootState) => ({
    isAuthenticated: !!state.user.authToken
});

const mapDispatch = {
    tryAutoSignIn: () => userActions.checkSignInState()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const App = ({ isAuthenticated, tryAutoSignIn }: Props) => {

	useEffect(() => {
        tryAutoSignIn();
	}, [tryAutoSignIn]);

	return (
		<Layout isAuthenticated={isAuthenticated}>
			{isAuthenticated ? (
				<>
					<Switch>
						<Route path='/tasks' exact component={Tasks} />
						<Route path='/tasks/:id' exact component={Task} />
						<Route path='/sign-out' exact component={SignOut} />
						<Route path='/account' exact component={Account} />
						<Route path='/' exact component={Home} />
						<Redirect to='/' />
					</Switch>
				</>
			) : (
				<Switch>
					<Route path='/auth' exact component={Auth} />
					<Redirect to='/auth' />
				</Switch>
			)}
		</Layout>
	);
}

export default connector(App);
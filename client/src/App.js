import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Home from './components/auth/protectedRoutes/Home';
import Forbidden from './components/layout/Forbidden';
import Logout from './components/auth/Logout';

const App = () => {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		let token = localStorage.getItem('token');
		if (token) {
			setIsAuth(true);
		}
	}, [isAuth]);

	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route
						exact
						path='/register'
						render={props => <Register {...props} isAuth={isAuth} />}
					/>
					<Route
						exact
						path='/home'
						render={props => <Home {...props} isAuth={isAuth} />}
					/>
					<Route
						exact
						path='/login'
						render={props => <Login {...props} isAuth={isAuth} />}
					/>
					<Route
						exact
						path='/logout'
						render={props => <Logout {...props} isAuth={isAuth} />}
					/>
					<Route exact path='/forbidden' component={Forbidden} />
				</Switch>
			</Router>
		</Fragment>
	);
};

export default App;

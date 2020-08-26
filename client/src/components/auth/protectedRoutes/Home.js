import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import AuthNavBar from '../../layout/AuthNavBar';

const Home = props => {
	const token = localStorage.getItem('token');
	if (!token) return <Redirect to='/forbidden' />;

	return (
		<Fragment>
			<AuthNavBar />
			<h2>This page will be accessed by registered users only! </h2>
		</Fragment>
	);
};

export default Home;

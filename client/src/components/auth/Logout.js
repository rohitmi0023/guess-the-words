import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ isAuth }) => {
	localStorage.removeItem('token');
	isAuth = false;
	return <Redirect to='/' />;
};

export default Logout;

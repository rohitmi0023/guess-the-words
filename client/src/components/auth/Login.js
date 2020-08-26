import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Button, Alert, Input, Col, Row } from 'reactstrap';
import axios from 'axios';
import NavBar from '../NavBar';

const Login = props => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [handleErrors, setHandleErrors] = useState({
		currentErrors: [],
	});

	const { email, password } = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async e => {
		e.preventDefault();
		console.log(props);
		const userCheck = {
			email,
			password,
		};
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(userCheck);
			const res = await axios.post('/api/auth', body, config);
			const token = localStorage.setItem('token', `${res.data.token}`);
			if (token) props.isAuth = true;
			props.history.push('/home');
		} catch (err) {
			console.log(err);
			if (err.response) {
				const errors = err.response.data.errors;
				if (errors) {
					const msgs = errors.map(e => e.msg);
					setHandleErrors({ ...handleErrors, currentErrors: msgs });
				}
			}
		}
	};

	return (
		<Fragment>
			<NavBar />
			<div className='container'>
				<br />
				<Alert color='danger'>
					{handleErrors.currentErrors.length > 0
						? handleErrors.currentErrors[0]
						: `Invalid credentials will be displayed here`}
				</Alert>
				<h3>Sign In</h3>
				<p> Sign Into Your Account</p>
				<Form onSubmit={e => handleSubmit(e)}>
					<Row form>
						<Col md={5}>
							<FormGroup>
								<Input
									type='email'
									placeholder='Email-address'
									name='email'
									onChange={e => onChange(e)}
									value={email}
								/>
							</FormGroup>
						</Col>
						<Col md={5}>
							<FormGroup>
								<Input
									type='password'
									placeholder='Password'
									name='password'
									onChange={e => onChange(e)}
									value={password}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Button>Login</Button>
				</Form>
				<p>
					<br />
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</Fragment>
	);
};

export default Login;

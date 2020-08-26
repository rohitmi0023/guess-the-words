import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthNavBar from '../../layout/AuthNavBar';
import Axios from 'axios';

const Home = props => {
	const [formInput, setFormInput] = useState();
	const [randomNumber, setRandomNumber] = useState();
	const [attempts, setAttempts] = useState(0);
	const [currentAttempt, setCurrentAttempt] = useState(0);
	const [number, setNumber] = useState();
	const [prevResults, setPrevResults] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) return <Redirect to='/forbidden' />;
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': token,
				},
			};
			Axios.get('/api/results', config).then(res => {
				console.log(res.data.slice(-5));
				setPrevResults(res.data.slice(-5));
			});
		} catch (err) {
			console.log(err.message);
		}
	}, []);

	const onChange = e => {
		setNumber(parseInt(e.target.value));
		setFormInput(e.target.value);
	};

	const handleSubmit = async e => {
		const token = localStorage.getItem('token');
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': `${token}`,
			},
		};
		if (attempts === 0) {
			alert('Please choose number of attempts first!');
		} else if (randomNumber === number) {
			setAttempts(0);
			setCurrentAttempt(0);
			setNumber(0);
			setRandomNumber();
			const results = {
				result: 'Correct',
			};
			const body = JSON.stringify(results);
			const res = await Axios.post('/api/results', body, config);
			setPrevResults(res.data.results.slice(-5));
			alert(`Congrats! You won in ${currentAttempt + 1} attempts`);
		} else if (currentAttempt + 1 === attempts) {
			setAttempts(0);
			setCurrentAttempt(0);
			setNumber(0);
			const results = {
				result: 'Incorrect',
			};
			const body = JSON.stringify(results);
			const res = await Axios.post('/api/results', body, config);
			setPrevResults(res.data.results.slice(-5));
			alert(`You lost! The correct number was ${randomNumber}.`);
		} else if (randomNumber > number) {
			setCurrentAttempt(currentAttempt + 1);
			alert(`${number} is too less!`);
		} else if (randomNumber < number) {
			setCurrentAttempt(currentAttempt + 1);
			alert(`${number} is too high!`);
		} else {
			setCurrentAttempt(currentAttempt + 1);
		}
		setFormInput('');
	};
	const onClickButton5 = e => {
		setAttempts(5);
		let min = 1;
		let max = 100;
		let random = Math.floor(min + Math.random() * (max - min));
		setRandomNumber(random);
	};

	const onClickButton10 = e => {
		setAttempts(10);
		let min = 1;
		let max = 100;
		let random = Math.floor(min + Math.random() * (max - min));
		setRandomNumber(random);
	};

	return (
		<Fragment>
			<AuthNavBar />
			<br />
			<form className='container' onSubmit={e => handleSubmit(e)}>
				<p style={{ textAlign: 'center' }}>Guess The Number</p>
				<div class='form-group' style={{ textAlign: 'center' }}>
					<input
						style={{ maxWidth: '230px', textAlign: 'center' }}
						type='number'
						value={formInput}
						placeholder='Enter number'
						onChange={e => onChange(e)}
					/>
				</div>
			</form>
			<button
				type='button'
				class='btn btn-danger'
				style={{ margin: '0px 10px' }}
				onClick={e => onClickButton5(e)}
			>
				5 attempts
			</button>
			<button
				type='button'
				class='btn btn-primary'
				style={{ margin: '0px 10px' }}
				onClick={e => onClickButton10(e)}
			>
				10 attempts
			</button>
			<br />
			<p style={{ margin: '20px 20px 10px 20px' }}>Your last 5 results: </p>
			{prevResults.length ? (
				prevResults.map(each => {
					return (
						<span style={{ display: 'inline-block', margin: '5px 25px' }}>{each}</span>
					);
				})
			) : (
				<p>Not played yet!</p>
			)}
		</Fragment>
	);
};

export default Home;

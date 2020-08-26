import React, { Fragment, useState } from 'react';
import NavBar from '../NavBar';

const Landing = () => {
	const [formInput, setFormInput] = useState();
	const [randomNumber, setRandomNumber] = useState();
	const [attempts, setAttempts] = useState(0);
	const [currentAttempt, setCurrentAttempt] = useState(0);
	const [number, setNumber] = useState();

	const onChange = e => {
		setNumber(parseInt(e.target.value));
		setFormInput(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (attempts === 0) {
			alert('Please choose number of attempts first!');
		} else if (randomNumber === number) {
			setAttempts(0);
			setCurrentAttempt(0);
			setNumber(0);
			setRandomNumber();
			alert(`Congrats! You won in ${currentAttempt + 1} attempts`);
		} else if (currentAttempt + 1 === attempts) {
			setAttempts(0);
			setCurrentAttempt(0);
			setNumber(0);
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
			<NavBar />
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
		</Fragment>
	);
};

export default Landing;

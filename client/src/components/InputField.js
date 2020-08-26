import React, { Fragment } from 'react';
import { useState } from 'react';

const InputField = props => {
	const [number, setNumber] = useState('');

	const onChange = e => {
		setNumber(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(number);
	};
	return (
		<Fragment>
			<form className='container' onSubmit={e => handleSubmit(e)}>
				<p style={{ textAlign: 'center' }}>Guess The Number</p>
				<div class='form-group' style={{ textAlign: 'center' }}>
					<input
						style={{ maxWidth: '230px', textAlign: 'center' }}
						type='number'
						value={number}
						placeholder='Enter number'
						onChange={e => onChange(e)}
					/>
				</div>
			</form>
		</Fragment>
	);
};

export default InputField;

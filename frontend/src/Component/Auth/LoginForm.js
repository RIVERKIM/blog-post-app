import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SignIn} from '../Auth/AuthSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import {Link} from 'react-router-dom';


export const LoginForm = () => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const onEmailChange = (e) => setEmail(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);
	
	const canSubmit = [email, password].every(Boolean) && addRequestStatus === 'idle';
	
	const onSubmit = async () => {
		try {
			setAddRequestStatus('pending');
			const result = await useDispatch(SignIn({email, password}));
			unwrapResult(result);
			setEmail('');
			setPassword('');
		} catch(err) {
			console.error(err);
		} finally {
			setAddRequestStatus('idle');
		} 
	}
	
	return (
		<div className="login-form">
			<h2>Sign to TempProject</h2>
			
			<form>
				<div>
					<label htmlFor="login-id">Username or Email</label>
					<input type="text" id="login-id" name="login-id" value={email} onChange={onEmailChange}/>
				</div>
				
				<div>
					<label htmlFor="login-password">Password</label>
					<input type="text" id="login-password" name="login-password" value={password} onChange={onPasswordChange}/>
				</div>
				
				<Link to="/">
					<button type="button" onClick={onSubmit} disabled={!canSubmit}>Sign in</button>
				</Link>
				
			</form>
			
			<div className="login-callout">
				<p>New to here? <Link class="blue">Create new account</Link></p>
			</div>
		</div>
	)
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/auth';
import { Redirect, Link } from 'react-router-dom';
import '../css/signup.css'

let emailDiv = "signup-input";
let passwordDiv = "signup-input";
let usernameDiv = "signup-input"

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [noInfo, setNoInfo] = useState('');
  const [noUsername, setNoUsername] = useState('');
  const [noEmail, setNoEmail] = useState('');
  const [noPassword, setNoPassword] = useState('');
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    emailDiv = "signup-input";
    passwordDiv = "signup-input";
    setNoEmail('');
    setNoPassword('');
    setNoInfo('');
    setNoUsername('');
    if (email && password && username) {
      if (password === confirmPassword) {
        dispatch(signup(username, email.toLocaleLowerCase(), password));
      } else {
        setNoPassword("Please make sure both passwords match.");
        passwordDiv = 'bad-input'
      }
    } else if (!email && password) {
      emailDiv = "bad-input";
      setNoEmail("Oi! We're gonna need that email of yours!")
    } else if (email && !password) {
      passwordDiv = "bad-input";
      setNoPassword("What's the password?");
    } else if (!username) {
      usernameDiv = "bad-input"
      setNoUsername("Please provide a unsername.")
    } else {
      emailDiv = "bad-input";
      passwordDiv = "bad-input";
      setNoInfo("You can't get in if you're not a member!")
    }
  }

  if (currentUserId) return <Redirect to='/' />

  return (
    <>
      <div className='login_logo_container'>
        <Link exact to='/' className='login_logo-image' />
      </div>
      <div className='signup_master'>
        <div className='signup_master-box'>
          <div className="signup-container">
            <div className='signup-redirect'>
              Have and account? <Link to='/login' style={{ textDecoration: 'none', color: '#0287EE', fontWeight: 'bold', backgroundColor: '#37404A' }} > Log in </Link>
            </div>
            <div className="signup-container-box">
              <form className='form_container' onSubmit={handleSubmit}>
                <div className='signup-label'>
                  Sign up
                </div>
                <div id='signup-input'>
                  <span id="bad-span" style={{ color: 'red' }}>{noUsername}</span>
                  <input type='text' className={usernameDiv} name='username' value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div id='signup-input'>
                  <span id="bad-span" style={{ color: 'red' }}>{noInfo}</span>
                  <input type='email' className={emailDiv} name='email' value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </div>
                <span id="bad-span" style={{ color: 'red' }}>{noEmail}</span>
                <div id='signup-input'>
                  <input type='password' className={passwordDiv} name='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
                </div>
                <span id="bad-span" style={{ color: 'red' }}>{noPassword}</span>
                <div id='signup-input'>
                  <input type='password' className={passwordDiv} name='password' value={confirmPassword} placeholder='Re-Enter Password' onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div id='signup-input'>
                  <button type='submit' className='signup-button'>Create account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

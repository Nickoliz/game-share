import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { Redirect, Link, useHistory } from 'react-router-dom';
import '../css/login.css'


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noEmail, setNoEmail] = useState('');
  const [noPassword, setNoPassword] = useState('');
  const currentUserId = useSelector(state => state.auth.id);
  const history = useHistory();

  const dispatch = useDispatch();
  let emailDiv = "form-input";
  let passwordDiv = "form-input";
  const handleSubmit = e => {
    e.preventDefault();
    setNoEmail('');
    setNoPassword('');
    if (email && password) {
      dispatch(login(email.toLocaleLowerCase(), password));
    } else if (!email && password) {
      emailDiv = "bad-input";
      setNoEmail("Oi! We're gonna need that email of yours!")
    } else if (email && !password) {
      passwordDiv = "bad-input";
      setNoPassword("What's the password?");
    }
  }

  const demo = e => {
    e.preventDefault();
    dispatch(login('demo@gameshare.com', 'password'))
  };
  const demo2 = e => {
    e.preventDefault();
    dispatch(login('demo2@gameshare.com', 'password'))
  };
  if (currentUserId) return <Redirect to={history.push('/')} />
  return (
    <>
      <div className='login_logo_container'>
        <Link exact="true" to='/' className='login_logo-image' />
      </div>
      <div className='loginWrapper'>
        <div className="loginContainer">
          <div id='loginLabel'>
            Log in
            </div>
          <form className='loginContainer__form' onSubmit={handleSubmit}>
            <div id='spacer-div'>
              <span style={{ color: 'red' }}>{noEmail}</span>
              <input type='email' className={emailDiv} name='email' value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div id='spacer-div'>
              <input type='password' className={passwordDiv} name='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
            </div>
            <span style={{ color: 'red' }}>{noPassword}</span>
            <div>
              <button type='submit' className='loginContainer__loginButton'>Log in</button>
            </div>
            <button className='loginContainer__loginButton' onClick={demo}>Demo Log in</button>
            <button className='loginContainer__loginButton' onClick={demo2}>Demo-2 Log in</button>
          </form>
          <div id='redirect'>
            Wanna roll some dice? <Link to="/signup" style={{ textDecoration: 'none', color: '#0287EE', fontWeight: 'bold', backgroundColor: '#37404A' }} > Sign up </Link>
          </div>
        </div>
      </div>
    </>
  )
}

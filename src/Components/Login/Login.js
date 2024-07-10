import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState(""); // General error state

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
        console.log('Logged in');
      })
      .catch((error) => {
        console.log("===="+error);
        setError("credential error ");
      });
  };

  return (
    <div className="loginParentDiv">
      <img className="logo" src={Logo} alt='Logo' />
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder='Enter your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder='Enter your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <p className="error-message">{error}</p>}
        <button type='submit'>Login</button>
      </form>
      <button className="signupButton" onClick={() => navigate('/signup')}>SignUp</button>
    </div>
  );
}

export default Login;

import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [error, setError] = useState(""); // General error state

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!username.trim() || !validateUsername(username)) {
      setError("Username should be at least 3 characters");
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!phone.match(/^\d{10}$/)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/)) {
      setError("Password should be 6 characters, include one digit, one symbol, and one uppercase letter");
      return;
    }

    // If all validations pass, proceed with signup
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username })
          .then(() => {
            return firebase.firestore().collection('users').add({
              id: result.user.uid,
              username: username,
              phone: phone
            });
          })
          .then(() => {
            console.log("User created and profile updated");
            alert("User created and profile updated");

            setPasswordError(""); // Clear the error message
            setError(""); // Clear any previous error
            navigate('/login');
          });
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          setPasswordError('Password should be at least 6 characters'); // Set error message
        } else {
          console.error("Error creating user:", error);
          alert(error.message)
        }
      });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    // Simple email regex validation
    return /\S+@\S+\.\S+/.test(email);
  };

  // Function to validate username format
  const validateUsername = (username) => {
    // Username should be at least 3 characters and only alphabets and spaces
    return /^[a-zA-Z\s]{3,}$/.test(username);
  };

  return (
    <div className="signupParentDiv">
      <img className="logo" alt='Logo' src={Logo} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Username</label>
        <br />
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="fname"
          name="name"
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          className="input"
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {passwordError && <p className="error">{passwordError}</p>} {/* Display password error message */}
        {error && <p className="error">{error}</p>} {/* Display general error message */}
        <button type="submit">Signup</button>
      </form>
      <button className="loginButton" onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}
